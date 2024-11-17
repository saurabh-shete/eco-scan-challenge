import fs from "fs";
import { promisify } from "util";
import openai from "../../connections/openaiClient.js";

const unlinkAsync = promisify(fs.unlink);

const carbonFootprintData = {
  "T-shirt": 7,
  Jeans: 12,
  Jacket: 15,
  Shoes: 8,
  Sweater: 14,
  Dress: 13,
  Shorts: 6,
  Skirt: 8,
  Suit: 20,
  Underwear: 3,
  Socks: 2,
  Cap: 4,
  Scarf: 5,
  Gloves: 6,
  Coat: 18,
  Pants: 10,
  Hoodie: 12,
  Blouse: 9,
  Shirt: 8,
  Leggings: 7,
  Tracksuit: 15,
};

export const analyzeImage = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    const prompt = `
      You are analyzing an image of clothing items. Map the detected clothing items to the closest match in the following carbon footprint data:
      
      ${JSON.stringify(carbonFootprintData, null, 2)}

      If an item doesn't match any category, classify it as "Other" and assign a generic carbon footprint of 10 kg CO₂.

      Provide the result in JSON format like this:
      {
        "items": [
          { "name": "T-shirt", "count": 2, "carbonFootprint": 7 },
          { "name": "Other", "count": 1, "carbonFootprint": 10 }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    await unlinkAsync(imagePath);

    const rawResult = response.choices[0].message.content;
    let parsedResult;

    try {
      parsedResult = JSON.parse(rawResult);
    } catch (error) {
      const jsonMatch = rawResult.match(/\{.*\}/s);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON from the model's response.");
      }
    }

    const items = parsedResult.items || [];

    if (items.length === 0) {
      return res.status(400).json({
        message: "No clothing items detected in the image. Please try again.",
      });
    }

    const formattedItems = items.map((item) => {
      if (!carbonFootprintData[item.name]) {
        return {
          name: "Other",
          count: item.count,
          carbonFootprint: 10,
        };
      }
      return item;
    });

    const totalItems = formattedItems.reduce((sum, item) => sum + item.count, 0);
    const totalCarbonFootprint = formattedItems.reduce(
      (sum, item) => sum + item.count * item.carbonFootprint,
      0
    );

    res.status(200).json({
      message: "Image analyzed successfully!",
      items: formattedItems,
      totalItems,
      totalCarbonFootprint,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);

    res.status(500).json({
      message: "An error occurred while analyzing the image.",
      error: error.message,
    });
  }
};

