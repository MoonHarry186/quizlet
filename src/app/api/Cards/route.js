import Card from "@/app/(models)/Card"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// GET: Retrieve all courses
export async function GET() {
  try {
    const cards = await Card.find(); // Populating the referenced fields
    return NextResponse.json({ cards }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error retrieving courses", err }, { status: 500 });
  }
}

// POST: Create a new course
export async function POST(req) {
  try {
    const body = await req.json();
    const cards = body.formData; // Adjust this based on your request body structure
    const newCard = await Card.create(cards);
    return NextResponse.json({ message: "Card Created", card: newCard }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error creating course", err }, { status: 500 });
  }
}

