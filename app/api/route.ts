import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoDB";
import Player from "@/lib/playerSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase(); // Ensure the database is connected

      const { name, desc, img } = req.body;

      // Validate input
      if (!name || !desc || !img) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Create a new player
      const newPlayer = new Player({
        name,
        desc,
        img,
      });

      await newPlayer.save(); // Save to the database

      res
        .status(201)
        .json({ message: "Player created successfully", player: newPlayer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
