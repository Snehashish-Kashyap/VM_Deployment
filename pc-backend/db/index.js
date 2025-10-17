import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

// 🌐 Detect environment (Docker or local)
const isDocker = process.env.DOCKER_ENV === "true";

// ✅ Database connection settings
const dbConfig = {
  user: process.env.DB_USER || "postgres",              // Use postgres user inside Docker
  host: isDocker ? "pc_postgres" : "localhost",            // 'postgres' = service name in docker-compose
  database: process.env.DB_NAME || "pc_blog",
  password: process.env.DB_PASSWORD || "postgres",      // Default password in docker-compose
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};

// ✅ Pool for blog database
export const poolBlog = new Pool(dbConfig);

// ✅ Pool for user authentication (same DB)
export const poolAuth = new Pool(dbConfig);

// ✅ Test connections
(async () => {
  try {
    const res1 = await poolBlog.query("SELECT NOW()");
    console.log("✅ Connected to pc_blog at:", res1.rows[0].now);

    const res2 = await poolAuth.query("SELECT NOW()");
    console.log("✅ Connected to user_auth (same DB) at:", res2.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();
