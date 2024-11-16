import express from "express";
import { getTopOffers } from "../../controllers/offers/index.js";

const router = express.Router();

router.post("/top", getTopOffers);

export default router;
