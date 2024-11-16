import express from "express";
import { calculateEcoScore } from "../../controllers/eco_score/index.js";

const router = express.Router();

router.post("/calculate", calculateEcoScore);

export default router;
