import offers from "../../data/offers.js";

export const getTopOffers = (req, res) => {
  try {
    const { ecoRewardPoints } = req.body;

    if (typeof ecoRewardPoints !== "number" || ecoRewardPoints < 0) {
      return res.status(400).json({
        message: "Invalid request. `ecoRewardPoints` must be a non-negative number.",
      });
    }

    // Filter offers that the user can redeem
    let matchingOffers = offers.filter((offer) => offer.points <= ecoRewardPoints);

    // If no matching offers, provide lowest-point offers as a fallback
    if (matchingOffers.length === 0) {
      matchingOffers = offers.sort((a, b) => a.points - b.points).slice(0, 5);
    }

    res.status(200).json({
      message: "Top offers fetched successfully!",
      matchingOffers,
    });
  } catch (error) {
    console.error("Error fetching top offers:", error);

    res.status(500).json({
      message: "An error occurred while fetching top offers.",
      error: error.message,
    });
  }
};
