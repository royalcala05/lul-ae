import express from "express";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
});

const ALLOWED_MIME = new Map([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["image/gif", "gif"],
]);

function normalizeExtension(filename = "", contentType = "") {
    const byType = ALLOWED_MIME.get(contentType);
    if (byType)
        {return byType;

        }
    const ext = path.extname(filename).replace(".", "").toLowerCase();
    return ALLOWED_MIME.has(`image/${ext}`) ? ext : "";
}

function normalizeFilename(filename = "") {
    const base = path.basename(filename, path.extname(filename));
    return base
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9_-]/g, "");
}
//this route handles post request sent to uplaods/sign 
router.post("/uploads/sign", async (req, res) => {
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

    if (!ALLOWED_MIME.has(contentType) || !ext || !safeName) {
        return res.status(400).json({ error: "Unsupported file type." });
    }
    //this actually uploads the file to the s3 
    const key = `headshots/${safeName}.${ext}`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    return res.json({ uploadUrl, key, expiresIn: 300 });
    } catch (err) {
    return res.status(500).json({ error: "Failed to sign upload." });
    }
});

export default router;
