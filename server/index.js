import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import session from "express-session";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";

dotenv.config(); 

import alumniRouter from "./routes/alumni.js";
import eventsRouter from "./routes/events.js";
import inquiriesRouter from "./routes/inquiries.js";

const app = express();
app.set("trust proxy", 1);
const clientOrigin = String(process.env.CLIENT_ORIGIN || "http://localhost:5173").trim();
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);

const sessionSecret = String(process.env.SESSION_SECRET || "").trim();
if (!sessionSecret) {
  console.warn("SESSION_SECRET is not set. Admin sessions will be insecure.");
}

app.use(
  session({
    name: "lul_admin_session",
    secret: sessionSecret || "insecure_dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Unauthorized" }); //not admin 
}

app.get("/api/admin/me", (req, res) => {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({
    authenticated: true,
    username: req.session.adminUser || "admin",
  });
});
//server checks admin login credentials
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  const username = String(req.body?.username || "").trim(); //trim removes whitespace
  const password = String(req.body?.password || "");
  const adminUser = String(process.env.ADMIN_USERNAME || "").trim();
  const passwordHash = String(process.env.ADMIN_PASSWORD_HASH || "").trim();

  if (!adminUser || !passwordHash) { //check if admin credentials are set in env variables
    return res.status(500).json({ error: "Admin credentials not configured." });
  }

  const usernameMatch = username === adminUser; //will be set eitehr true or false 
  const passwordMatch = await bcrypt.compare(password, passwordHash); //will be true or false

  if (!usernameMatch || !passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  req.session.isAdmin = true;
  req.session.adminUser = adminUser;
  return res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("lul_admin_session");
    return res.json({ ok: true });
  });
});

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api", alumniRouter);
app.use("/api", eventsRouter);
app.use("/api", adminLimiter, inquiriesRouter);

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server running on ${port}`));
