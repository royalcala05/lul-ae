import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "data", "blogPosts.json");
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, { posts: [] });

async function loadDb() {
  await db.read();
  db.data ||= { posts: [] };
}

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// Slugs already used by the hardcoded posts in client/src/data/blogPosts.js.
// Kept in sync manually (small, rarely-changing list) so brother-submitted
// posts can't collide with a hardcoded route.
const RESERVED_SLUGS = new Set([
  "another-line-crosses-into-brotherhood",
  "helping-students-picture-life-after-high-school",
  "a-friday-spent-giving-back",
  "celebrating-another-hermanos-graduation",
  "celebrating-our-2025-graduates",
  "spot-an-hermano-2026",
]);

const TAG_PRESETS = {
  Brotherhood: { tagColor: "var(--lul-gold)", tagTextColor: "#3a250f" },
  Community: { tagColor: "var(--lul-red)", tagTextColor: "#fff" },
  "Hermano Spotlight": { tagColor: "var(--lul-gold)", tagTextColor: "#3a250f" },
  Volunteer: { tagColor: "var(--lul-brown)", tagTextColor: "#fff" },
};

const SEASONS = new Set(["Spring", "Summer", "Fall", "Winter"]);

function slugify(title = "") {
  return String(title)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(title, existingSlugs) {
  const base = slugify(title) || "post";
  if (!existingSlugs.has(base)) return base;
  let n = 2;
  while (existingSlugs.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

function isS3ImageUrl(url = "") {
  const base = String(process.env.PUBLIC_S3_BASE || "").trim().replace(/\/+$/, "");
  if (!base) return false;
  // must match the key prefix uploads.js actually writes blog images to
  // (nested under "uploads/" — see FOLDER_PREFIXES in uploads.js for why)
  return String(url || "").startsWith(`${base}/uploads/blog/`);
}

function validatePost(body) {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const rawBody = String(body.body || "").trim();
  const tag = String(body.tag || "").trim();
  const season = String(body.season || "").trim();
  const year = Number.parseInt(body.year, 10);
  const image = String(body.image || "").trim();
  const author = String(body.author || "").trim();

  if (!title || title.length > 160) return { error: "Title is required (max 160 characters)." };
  if (!excerpt || excerpt.length > 280) return { error: "Excerpt is required (max 280 characters)." };
  if (!rawBody) return { error: "Body is required." };
  if (!Object.prototype.hasOwnProperty.call(TAG_PRESETS, tag)) return { error: "Invalid tag." };
  if (!SEASONS.has(season)) return { error: "Invalid season." };
  const currentYear = new Date().getFullYear();
  if (!Number.isFinite(year) || year < currentYear - 1 || year > currentYear + 1) {
    return { error: "Invalid year." };
  }
  if (!image || !isS3ImageUrl(image)) return { error: "A valid uploaded image is required." };
  if (author.length > 120) return { error: "Author name is too long." };

  const paragraphs = rawBody
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return { error: "Body is required." };
  if (paragraphs.length > 6) return { error: "Please keep articles to 6 paragraphs or fewer." };
  if (paragraphs.some((p) => p.length > 2000)) return { error: "One of the paragraphs is too long." };

  return {
    value: { title, excerpt, body: paragraphs, tag, season, year, image, author },
  };
}

router.get("/blog-posts", async (req, res) => {
  await loadDb();
  const posts = [...db.data.posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return res.json({ posts });
});

router.post("/blog-posts", requireAdmin, async (req, res) => {
  const { error, value } = validatePost(req.body || {});
  if (error) return res.status(400).json({ error });

  await loadDb();

  const existingSlugs = new Set([
    ...RESERVED_SLUGS,
    ...db.data.posts.map((p) => p.slug),
  ]);
  const slug = uniqueSlug(value.title, existingSlugs);
  const preset = TAG_PRESETS[value.tag];
  const createdAt = new Date().toISOString();
  const id = `post_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  const post = {
    id,
    slug,
    title: value.title,
    excerpt: value.excerpt,
    body: value.body,
    tag: value.tag,
    tagColor: preset.tagColor,
    tagTextColor: preset.tagTextColor,
    season: value.season,
    year: value.year,
    date: `${value.season} ${value.year}`,
    image: value.image,
    author: value.author || "",
    createdAt,
  };

  db.data.posts.push(post);
  await db.write();

  return res.status(201).json({ post });
});

router.delete("/blog-posts/:id", requireAdmin, async (req, res) => {
  await loadDb();
  const before = db.data.posts.length;
  db.data.posts = db.data.posts.filter((p) => p.id !== req.params.id);
  if (db.data.posts.length === before) {
    return res.status(404).json({ error: "Post not found." });
  }
  await db.write();
  return res.json({ ok: true });
});

export default router;
