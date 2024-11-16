export const calculateEcoScore = (req, res) => {
    try {
      const { totalCarbonFootprint } = req.body;
  
      if (typeof totalCarbonFootprint !== "number" || totalCarbonFootprint < 0) {
        return res.status(400).json({
          message: "Invalid request. `totalCarbonFootprint` must be a non-negative number.",
        });
      }
  
      const ecoRewardPoints = totalCarbonFootprint * 10;
  
      res.status(200).json({
        message: "Eco-score calculated successfully!",
        totalCarbonFootprint,
        ecoRewardPoints,
      });
    } catch (error) {
      console.error("Error calculating eco-score:", error);
  
      res.status(500).json({
        message: "An error occurred while calculating the eco-score.",
        error: error.message,
      });
    }
  };
  