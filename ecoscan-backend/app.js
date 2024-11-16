import express from "express";
import imageRouter from "./routes/image/index.js";
import ecoScoreRouter from "./routes/eco_score/index.js";
const app = express();

app.use(express.json());

app.use("/api/images", imageRouter);
app.use("/api/eco-score", ecoScoreRouter);

app.get("/", (req, res) => res.send({ message: "EcoScan backend is running!" }));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
