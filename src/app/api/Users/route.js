import User from "@/app/(models)/User"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// GET: Retrieve all users
export async function GET() {
  try {
    const cards = await Card.find(); // Populating the referenced fields
    return NextResponse.json({ cards }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error retrieving courses", err }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req) {
  try {
    const body = await req.json();
    const user = body.formData; // Adjust this based on your request body structure
     // Check if the user already exists
     const existingUser = await User.findOne({ email: user.email }); // Change the field to match your unique identifier
     
    const newUser = !existingUser && await User.create(user);
 
    return NextResponse.json({ message: existingUser ? "Login success fully" : "User created", users: existingUser ? existingUser : newUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error creating user", err }, { status: 500 });
  }
}

