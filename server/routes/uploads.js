import express from "express";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
});

// auth is checked per-route (not at the app.use mount level) so this router
// can sit alongside public routes on the same "/api" prefix without
// accidentally gating requests that aren't even headed to it.
function requireAdmin(req, res, next) {
    if (req.session?.isAdmin) return next();
    return res.status(401).json({ error: "Unauthorized" });
}

const ALLOWED_MIME = new Map([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["image/gif", "gif"],
]);

// folders callers are allowed to upload into, mapped to the actual S3 key
// prefix used. Both prefixes below are the only ones the "lul-app-uploader"
// IAM policy (LULHeadshotsUploader) currently grants s3:PutObject on:
//   lul-headshot-bucket/headshots/*
//   lul-headshot-bucket/uploads/*
// "blog" is nested under the already-granted "uploads/" prefix on purpose,
// so this feature doesn't need any IAM policy change to work.
const FOLDER_PREFIXES = new Map([
    ["headshots", "headshots"],
    ["blog", "uploads/blog"],
]);
function normalizeFolder(folder = "") {
    const f = String(folder || "").trim().toLowerCase();
    return FOLDER_PREFIXES.get(f) || FOLDER_PREFIXES.get("headshots");
}
// make sure proper extension type, uses allowedMINE to decide whcih ones to use 
function normalizeExtension(filename = "", contentType = "") {
    const byType = ALLOWED_MIME.get(contentType);
    if (byType)
        {return byType;

        }
    const ext = path.extname(filename).replace(".", "").toLowerCase();
    return ALLOWED_MIME.has(`image/${ext}`) ? ext : "";
}

// cleans filename by trimming, all lowercase and replacing any characters with consistent variables
function normalizeFilename(filename = "") {
    const base = path.basename(filename, path.extname(filename));
    return base
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9_-]/g, "");
}

// same helper alumni.js uses to build public URLs from an S3 key, so callers
// never need their own copy of the S3 base.
function getPublicS3Base() {
    return String(process.env.PUBLIC_S3_BASE || "").replace(/\/+$/, "");
}
//this route handles post request sent to uplaods/sign 
router.post("/uploads/sign", requireAdmin, async (req, res) => {
    try {
        //reads from the .env file
    const bucket = String(process.env.S3_BUCKET || "").trim();
    if (!bucket) {
        return res.status(500).json({ error: "S3 bucket not configured." });
    }
    //then we get the filename and content type from the request body
    const filename = String(req.body?.filename || "");
    const contentType = String(req.body?.contentType || "").toLowerCase();
    const ext = normalizeExtension(filename, contentType);
    const safeName = normalizeFilename(filename);
    const folder = normalizeFolder(req.body?.folder);

    if (!ALLOWED_MIME.has(contentType) || !ext || !safeName) {
        return res.status(400).json({ error: "Unsupported file type." });
    }
    //this actually uploads the file to the s3
    const key = `${folder}/${safeName}.${ext}`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const base = getPublicS3Base();
    const publicUrl = base ? `${base}/${encodeURI(key)}` : "";
    return res.json({ uploadUrl, key, publicUrl, expiresIn: 300 });
    } catch (err) {
    return res.status(500).json({ error: "Failed to sign upload." });
    }
});

export default router;
