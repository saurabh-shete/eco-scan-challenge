import express from "express";
import upload from "../../middlewares/multer.js";
import { analyzeImage } from "../../controllers/image/index.js";

const router = express.Router();


router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded or invalid file type" });
    }
    console.log(req.file);
    await analyzeImage(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
