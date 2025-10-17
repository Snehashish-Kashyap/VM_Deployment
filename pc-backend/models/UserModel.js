import { poolAuth as pool } from "../db/index.js";

export const UserModel = {
  // 🔹 Create a new user
  async createUser(name, email, passwordHash) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, passwordHash]
    );
    return result.rows[0];
  },

  // 🔹 Find user by email (for login)
  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  // 🔹 Find user by ID (for profile)
  async findById(id) {
    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },
};
