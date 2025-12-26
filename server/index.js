import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 

import alumniRouter from "./routes/alumni.js";
import eventsRouter from "./routes/events.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api", alumniRouter);
app.use("/api", eventsRouter);

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server running on ${port}`));
