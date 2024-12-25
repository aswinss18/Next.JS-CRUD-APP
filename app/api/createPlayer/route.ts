import { NextRequest, NextResponse } from "next/server";
import * as formidable from "formidable";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongoDB";
import Player from "@/lib/playerSchema";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Disable Next.js built-in body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // Parse the form data using formidable
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise<any>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });

    const { name, desc } = fields;
    const { img } = files;

    if (!name || !desc || !img) {
      return NextResponse.json(
        { message: "All fields (name, desc, and img) are required" },
        { status: 400 }
      );
    }

    const filePath = Array.isArray(img) ? img[0]?.filepath : img?.filepath;
    if (!filePath) {
      return NextResponse.json(
        { message: "Image file not found" },
        { status: 400 }
      );
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
      img: imgUrl, // Store Cloudinary URL in the database
    });

    return NextResponse.json(
      { message: "Player created successfully", player: newPlayer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
