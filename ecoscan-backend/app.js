const express = require("express");

const app = express();

// GET route to check server status
app.get("/", (req, res) => {
  res.send({ message: "EcoScan backend is running!" });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
