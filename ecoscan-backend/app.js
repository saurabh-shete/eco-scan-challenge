import express from "express";
import imageRouter from "./routes/image/index.js";
import ecoScoreRouter from "./routes/eco_score/index.js";
import offerRouter from "./routes/offers/index.js";
import axios from "axios";

const app = express();

app.use(express.json());

app.use("/api/images", imageRouter);
app.use("/api/eco-score", ecoScoreRouter);
app.use("/api/offers", offerRouter);

app.get("/", (req, res) =>
  res.send({ message: "EcoScan backend is running!" })
);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
  // Start self-pinging after the server starts
  startSelfPinging();
});

function startSelfPinging() {
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds
  const PING_URL = `https://eco-scan-challenge-bgwb.onrender.com`;
  const env = process.env.NODE_ENV;
  if (env === "production") {
    setInterval(async () => {
      try {
        await axios.get(PING_URL);
        console.log("Server pinged successfully to keep it awake.");
      } catch (error) {
        console.error("Error while pinging the server:", error.message);
      }
    }, PING_INTERVAL);
  }
}
