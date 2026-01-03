import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "data", "inquiries.json");
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, { inquiries: [] });

async function loadDb() {
  await db.read();
  db.data ||= { inquiries: [] };
}

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

function validateInquiry({ email, message, firstName, lastName, phone }) {
  if (!email || !message) {
    return "Email and message are required.";
  }
  if (email.length > 254) {
    return "Email is too long.";
  }
  if (message.length > 4000) {
    return "Message is too long.";
  }
  if (firstName.length > 120 || lastName.length > 120) {
    return "Name is too long.";
  }
  if (phone.length > 40) {
    return "Phone is too long.";
  }
  return null;
}

router.post("/inquiries", async (req, res) => {
  const body = req.body || {};
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();

  const error = validateInquiry({ email, message, firstName, lastName, phone });
  if (error) return res.status(400).json({ error });

  await loadDb();
  const createdAt = new Date().toISOString();
  const id = `inq_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  db.data.inquiries.push({
    id,
    firstName,
    lastName,
    email,
    phone,
    message,
    createdAt,
  });
  await db.write();

  return res.status(201).json({ id });
});

router.get("/inquiries", requireAdmin, async (req, res) => {
  const rawLimit = Number.parseInt(req.query.limit, 10);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 500)
    : 200;

  await loadDb();
  const inquiries = [...db.data.inquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
  return res.json({ inquiries });
});

export default router;
