import offers from "../../data/offers.js";

export const getTopOffers = (req, res) => {
  try {
    const { ecoRewardPoints } = req.body;

    if (typeof ecoRewardPoints !== "number" || ecoRewardPoints < 0) {
      return res.status(400).json({
        message: "Invalid request. `ecoRewardPoints` must be a non-negative number.",
      });
    }

    let matchingOffers = offers.filter((offer) => offer.points <= ecoRewardPoints);

    if (matchingOffers.length < 5) {
      const remainingOffers = offers
        .filter((offer) => !matchingOffers.includes(offer)) 
        .sort((a, b) => a.points - b.points) 
        .slice(0, 5 - matchingOffers.length);

      matchingOffers = [...matchingOffers, ...remainingOffers];
    }

    matchingOffers = matchingOffers.slice(0, 6);

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
