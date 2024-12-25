import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import Player from "@/lib/playerSchema";

export async function GET() {
  try {
    await connectToDatabase(); // Ensure the database is connected

    const players = await Player.find(); // Fetch all players from the collection
    return NextResponse.json(players, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
