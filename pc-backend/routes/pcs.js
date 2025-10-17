import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PcController } from "../controllers/pcController.js";
import { auth } from "../middleware/auth.js"; // ✅ import middleware

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/images";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Public routes
router.get("/", PcController.getAll);

// ✅ Protected routes (require valid JWT)
router.get("/my", auth, PcController.getMine); // 🟢 MUST come before `/:id`
router.get("/:id", PcController.getById);
router.post("/", auth, upload.single("image"), PcController.create);
router.put("/:id", auth, upload.single("image"), PcController.update);
router.delete("/:id", auth, PcController.delete);

export default router;
