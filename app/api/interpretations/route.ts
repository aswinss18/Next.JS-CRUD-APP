import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = "interpretations"; // Replace with the actual collection ID

// Validate environment variables
if (!DATABASE_ID) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_APPWRITE_DATABASE_ID is not set."
  );
}

// Function to create a document
async function createInterpretation(data: {
  term: string;
  interpretation: string;
}) {
  try {
    return await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data
    );
  } catch (error: any) {
    console.error("Error creating interpretation:", error);
    throw error; // Re-throw for error handling in the POST route
  }
}

// Function to fetch documents
async function fetchInterpretations() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);
    return response.documents;
  } catch (error: any) {
    console.error("Error fetching interpretations:", error);
    throw error; // Re-throw for error handling in the GET route
  }
}

// Handle POST request
export async function POST(req: Request) {
  try {
    const { term, interpretation } = await req.json();
    if (!term || !interpretation) {
      return NextResponse.json(
        { error: "Missing 'term' or 'interpretation' in the request body." },
        { status: 400 }
      );
    }

    const data = { term, interpretation };
    const response = await createInterpretation(data);

    return NextResponse.json(
      { message: "Interpretation created successfully", data: response },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Error:", error.response || error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create interpretation." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const interpretations = await fetchInterpretations();
    return NextResponse.json(interpretations, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error.response || error.message);
    return NextResponse.json(
      { error: error.message || "Failed to fetch interpretations." },
      { status: 500 }
    );
  }
}
