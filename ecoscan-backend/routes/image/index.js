import express from "express";
import upload from "../../middlewares/multer.js";
import { analyzeImage } from "../../controllers/image/index.js";

const router = express.Router();

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded or invalid file type",
      });
    }

    await analyzeImage(req, res);
  } catch (error) {
    console.error("Error in /analyze route:", error);
    res.status(500).json({ message: "An error occurred while processing the image." });
  }
});

export default router;
