import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB"; // Ensure the path is correct
import Player from "@/lib/playerSchema"; // Ensure the path is correct

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, desc, img } = body;

    if (!name || !desc || !img) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newPlayer = await Player.create({ name, desc, img });

    return NextResponse.json(
      { message: "Player created successfully", player: newPlayer },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
