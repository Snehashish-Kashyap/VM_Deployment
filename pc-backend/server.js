import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pcsRouter from "./routes/pcs.js";
import usersRouter from "./routes/users.js";
import { poolBlog, poolAuth } from "./db/index.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // prevent PayloadTooLargeError

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve images correctly (fix broken image issue)
app.use("/images", express.static(path.join(__dirname, "public/images")));


// ✅ Routes
app.use("/api/pcs", pcsRouter);
app.use("/api/users", usersRouter);

// ✅ Test DB connections
(async () => {
  try {
    const res1 = await poolBlog.query("SELECT NOW()");
    console.log("✅ Connected to pc_blog at:", res1.rows[0].now);
    const res2 = await poolAuth.query("SELECT NOW()");
    console.log("✅ Connected to user_auth at:", res2.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
