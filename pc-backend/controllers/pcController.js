import { PcModel } from "../models/PcModel.js";

export const PcController = {
  // 🟢 Fetch all PCs
  async getAll(req, res) {
    try {
      const pcs = await PcModel.getAll();
      res.json(pcs);
    } catch (error) {
      console.error("Error fetching PCs:", error);
      res.status(500).json({ error: "Failed to fetch PCs" });
    }
  },

  // 🟡 Fetch logged-in user's PCs
  async getMine(req, res) {
    try {
      const userId = req.user.id;
      const pcs = await PcModel.getByUserId(userId);
      res.json(pcs);
    } catch (error) {
      console.error("Error fetching user's PCs:", error);
      res.status(500).json({ error: "Failed to fetch user's PCs" });
    }
  },

  // 🔍 Get PC by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid PC ID" });
      }

      const pc = await PcModel.getById(id);
      if (!pc) return res.status(404).json({ error: "PC not found" });

      res.json(pc);
    } catch (error) {
      console.error("Error fetching PC:", error);
      res.status(500).json({ error: "Failed to fetch PC" });
    }
  },

  // ✍️ Create new PC
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

      res.json({ message: "✅ PC created successfully!", pc });
    } catch (error) {
      console.error("Error creating PC:", error);
      res.status(500).json({ error: "Failed to create PC" });
    }
  },

  // ✏️ Update PC
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

      res.json({ message: "✅ PC updated successfully!", pc });
    } catch (error) {
      console.error("Error updating PC:", error);
      res.status(500).json({ error: "Failed to update PC" });
    }
  },

  // ❌ Delete PC
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const isOwner = await PcModel.checkOwner(id, userId);
      if (!isOwner) return res.status(403).json({ error: "Access denied" });

      await PcModel.delete(id);
      res.json({ message: "🗑️ PC deleted successfully" });
    } catch (error) {
      console.error("Error deleting PC:", error);
      res.status(500).json({ error: "Failed to delete PC" });
    }
  },
};
