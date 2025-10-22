//  import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { PcController } from "../controllers/pcController.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// // ✅ Multer setup for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = "public/images";
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // ✅ Public routes
// router.get("/", PcController.getAll);
// router.get("/:id", PcController.getById);

// // ✅ Protected routes (require JWT)
// router.get("/my", auth, PcController.getMine);
// router.post("/", auth, upload.single("image"), PcController.create);
// router.put("/:id", auth, upload.single("image"), PcController.update);
// router.delete("/:id", auth, PcController.delete);

// export default router;
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PcController } from "../controllers/pcController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

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

// ✅ PUBLIC ROUTES
router.get("/", PcController.getAll);

// ✅ PROTECTED ROUTES
router.get("/my", auth, PcController.getMine); // 👈 must come before /:id
router.get("/:id", PcController.getById);
router.post("/", auth, upload.single("image"), PcController.create);
router.put("/:id", auth, upload.single("image"), PcController.update);
router.delete("/:id", auth, PcController.delete);

export default router;
