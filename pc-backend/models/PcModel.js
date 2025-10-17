import { poolBlog as pool } from "../db/index.js";

export const PcModel = {
  // ✅ Get all blogs
  async getAll() {
    const result = await pool.query(
      `SELECT pcs.*, users.name AS owner_name
       FROM pcs
       JOIN users ON pcs.user_id = users.id
       ORDER BY pcs.id DESC`
    );
    return result.rows;
  },

  // ✅ Get blogs by user ID
  async getByUserId(userId) {
    const result = await pool.query(
      `SELECT pcs.*, users.name AS owner_name
       FROM pcs
       JOIN users ON pcs.user_id = users.id
       WHERE pcs.user_id = $1
       ORDER BY pcs.id DESC`,
      [userId]
    );
    return result.rows;
  },

  // ✅ Get one blog by ID
  async getById(id) {
    const result = await pool.query(
      `SELECT pcs.*, users.name AS owner_name
       FROM pcs
       JOIN users ON pcs.user_id = users.id
       WHERE pcs.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  // ✅ Create blog
  async create({ name, description, image_url, full_description, userId }) {
    const result = await pool.query(
      `INSERT INTO pcs (name, description, image_url, full_description, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, image_url, full_description, userId]
    );
    return result.rows[0];
  },

  // ✅ Update blog
  async update({ id, name, description, image_url, full_description }) {
    const result = await pool.query(
      `UPDATE pcs
       SET name=$1, description=$2, image_url=$3, full_description=$4
       WHERE id=$5
       RETURNING *`,
      [name, description, image_url, full_description, id]
    );
    return result.rows[0];
  },

  // ✅ Delete blog
  async delete(id) {
    await pool.query(`DELETE FROM pcs WHERE id=$1`, [id]);
  },

  // ✅ Check owner
  async checkOwner(id, userId) {
    const result = await pool.query(
      `SELECT * FROM pcs WHERE id=$1 AND user_id=$2`,
      [id, userId]
    );
    return result.rows.length > 0;
  },

  // ✅ Count total blogs by user (for Profile stats)
  async countByUserId(userId) {
    const result = await pool.query(
      `SELECT COUNT(*) AS total FROM pcs WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0]; // { total: '3' }
  },
};
