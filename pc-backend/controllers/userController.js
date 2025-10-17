import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { poolAuth as pool } from "../db/index.js";
import { sendMail } from "../utils/mailService.js"; // ✅ Updated import

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey123";

export const UserController = {
  // 🆕 Register user
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check existing user
      const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
      if (existing.rows.length > 0)
        return res.status(400).json({ error: "User already exists" });

      // Hash password and store
      const hashed = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
        [name, email, hashed]
      );

      // ✅ Send Welcome Mail
      await sendMail(
        email,
        "🎉 Welcome to PCVerse!",
        `<h2>Hi ${name},</h2>
         <p>Welcome to <b>PCVerse</b> — your futuristic PC blogging hub! 🚀</p>`
      );

      res.json({ message: "✅ Registration successful! Welcome email sent!" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  },

  // 🔑 Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
      if (result.rows.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      // ✅ Send Login Mail
      await sendMail(
        email,
        "🔑 New Login Detected - PCVerse",
        `<h2>Hi ${user.name},</h2>
         <p>You just logged in to your <b>PCVerse</b> account.</p>
         <p>If this wasn’t you, please reset your password immediately.</p>`
      );

      res.json({ message: "✅ Login successful!", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  },
};
