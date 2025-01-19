import { NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongoDB";
import Player from "@/lib/playerSchema";
import FormData from "form-data";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const form = new FormData();

    form.append("file", fs.createReadStream(req.body.filepath));

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parsing error:", err);
          reject(new Error("Form parsing error"));
        }

        const { name, desc } = fields;
        const { img } = files;

        if (!name || !desc || !img) {
          return reject(new Error("Missing fields"));
        }

        const filePath = Array.isArray(img) ? img[0]?.filepath : img?.filepath;
        if (!filePath) {
          return reject(new Error("Image file not found"));
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(filePath, {
          folder: "players",
        });

        const imgUrl = uploadResponse.secure_url;

        // Connect to MongoDB
        await connectToDatabase();

        // Create a new player in the database
        const newPlayer = await Player.create({
          name,
          desc,
          img: imgUrl,
        });

        resolve(
          NextResponse.json({
            message: "Player created successfully",
            player: newPlayer,
          })
        );
      });
    });
  } catch (error) {
    console.error("Error during player creation:", error);
    return NextResponse.error();
  }
}
