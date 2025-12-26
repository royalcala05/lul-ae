import express from "express";
import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { fileURLToPath } from "url";
import { BASE_LINES } from "../data/baseLines.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, "..", "data", "alumni_profiles.csv");

// --- helpers ---
function getPublicS3Base() {
  return String(process.env.PUBLIC_S3_BASE || "").replace(/\/+$/, "");
}

// Robustly get a column even if headers have extra spaces
function getCol(row, target) {
  const want = target.toLowerCase().replace(/\s+/g, "");
  const key = Object.keys(row).find(
    (k) => k.toLowerCase().replace(/\s+/g, "") === want
  );
  return key ? row[key] : "";
}

function headshotToPublicUrl(val = "") {
  const base = getPublicS3Base();
  const v = String(val || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v; // already a URL
  const key = v.replace(/^\/+/, "");
  return base ? `${base}/${encodeURI(key)}` : "";
}

function normalizeLineKey(val = "") {
  const token = String(val || "").trim().toUpperCase().split(/\s+/)[0] || "";
  return token.replace(/[^A-Z]/g, "");
}

function normalizeName(val = "") {
  return String(val || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^Hermano\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function nameKeys(val = "") {
  const full = normalizeName(val);
  if (!full) return [];
  const parts = full.split(" ").filter(Boolean);
  const firstLast =
    parts.length >= 2 ? `${parts[0]} ${parts[parts.length - 1]}` : full;
  return Array.from(new Set([full, firstLast]));
}

// --- DEBUG: verify parsing + S3 url building ---
router.get("/alumni/debug", (req, res) => {
  try {
    const csvText = fs.readFileSync(CSV_PATH, "utf8");
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    const rawRows = parsed.data || [];

    // trim header keys
    const rows = rawRows.map((r) => {
      const clean = {};
      for (const [k, v] of Object.entries(r)) {
        clean[String(k).trim()] = typeof v === "string" ? v.trim() : v;
      }
      return clean;
    });

    const first = rows[0] || {};
    const headshotKey = getCol(first, "HeadshotKey");
    const base = getPublicS3Base();
    const publicUrl = headshotToPublicUrl(headshotKey);

    return res.json({
      ok: true,
      csvPath: CSV_PATH,
      publicS3Base: base,
      firstRowKeys: Object.keys(first),
      firstRowSample: first,
      headshotKey,
      computedPublicUrl: publicUrl,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// --- your real endpoint (keep your existing /alumni logic) ---
router.get("/alumni", (req, res) => {
  try {
    const csvText = fs.readFileSync(CSV_PATH, "utf8");
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    const rawRows = parsed.data || [];

    const rows = rawRows.map((r) => {
      const clean = {};
      for (const [k, v] of Object.entries(r)) {
        clean[String(k).trim()] = typeof v === "string" ? v.trim() : v;
      }
      return clean;
    });

    const extrasByKey = new Map();

    for (const row of rows) {
      const lineKey = normalizeLineKey(getCol(row, "Line (Alpha, Beta, etc)"));
      const fullName = getCol(row, "Full Name");
      const keys = nameKeys(fullName);

      if (!lineKey || keys.length === 0) continue;

      const ts = new Date(getCol(row, "Timestamp") || 0).getTime() || 0;

      const headshotKey = getCol(row, "HeadshotKey");
      const extra = {
        name: fullName,
        bio: getCol(row, "Biography(Max 150 Words - Optional )") || getCol(row, "Biography(Max 150 Words - Optional)"),
        linkedin: getCol(row, "LinkedIn Profile URL"),
        company: getCol(row, "Company/Organization"),
        title: getCol(row, "Job Title"),
        email: getCol(row, "Email Address (Optional)"),
        headshot: headshotToPublicUrl(headshotKey),
        _ts: ts,
      };

      for (const nameKey of keys) {
        const key = `${lineKey}|${nameKey}`;
        const prev = extrasByKey.get(key);
        if (!prev || ts >= prev._ts) extrasByKey.set(key, extra);
      }
    }

    const merged = BASE_LINES.map((line) => {
      const lineKey = normalizeLineKey(line.key);
      const hermanos = (line.hermanos || []).map((h) => {
        const base = typeof h === "string" ? { name: h } : h;
        const keys = nameKeys(base?.name || "");
        if (!lineKey || keys.length === 0) return base;
        let extra;
        for (const key of keys) {
          extra = extrasByKey.get(`${lineKey}|${key}`);
          if (extra) break;
        }
        if (!extra) return base;
        return { ...base, ...extra, name: base.name || extra.name };
      });
      return { ...line, hermanos };
    });

    res.json(merged);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
