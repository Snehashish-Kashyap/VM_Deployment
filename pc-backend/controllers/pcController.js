import { PcModel } from "../models/PcModel.js";

export const PcController = {
  // 🟢 Fetch all blogs
  async getAll(req, res) {
    try {
      const pcs = await PcModel.getAll();
      res.json(pcs);
    } catch (error) {
      console.error("Error fetching PCs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  },

  // 🟡 Fetch logged-in user's blogs
  async getMine(req, res) {
    try {
      const userId = req.user.id; // ✅ from auth middleware
      const pcs = await PcModel.getByUserId(userId);
      res.json(pcs);
    } catch (error) {
      console.error("Error fetching user's PCs:", error);
      res.status(500).json({ error: "Failed to fetch user's blogs" });
    }
  },

  // 🔍 Get blog by ID
  async getById(req, res) {
    try {
      const pc = await PcModel.getById(req.params.id);
      if (!pc) return res.status(404).json({ error: "Blog not found" });
      res.json(pc);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  },

  // ✍️ Create new blog
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { name, description, full_description } = req.body;
      const image_url = req.file ? `/images/${req.file.filename}` : null;

      const pc = await PcModel.create({
        name,
        description,
        image_url,
        full_description,
        userId,
      });

      res.json({ message: "✅ Blog created successfully!", pc });
    } catch (error) {
      console.error("Error creating PC:", error);
      res.status(500).json({ error: "Failed to create blog" });
    }
  },

  // ✏️ Update blog
  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { name, description, full_description } = req.body;
      const image_url = req.file ? `/images/${req.file.filename}` : req.body.image_url;

      const isOwner = await PcModel.checkOwner(id, userId);
      if (!isOwner) return res.status(403).json({ error: "Access denied" });

      const pc = await PcModel.update({
        id,
        name,
        description,
        full_description,
        image_url,
      });

      res.json({ message: "✅ Blog updated successfully!", pc });
    } catch (error) {
      console.error("Error updating PC:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  },

  // ❌ Delete blog
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const isOwner = await PcModel.checkOwner(id, userId);
      if (!isOwner) return res.status(403).json({ error: "Access denied" });

      await PcModel.delete(id);
      res.json({ message: "🗑️ Blog deleted successfully" });
    } catch (error) {
      console.error("Error deleting PC:", error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  },
};
