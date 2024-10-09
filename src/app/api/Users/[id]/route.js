import User from "@/app/(models)/User"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// GET: Retrieve a specific user by ID
export async function GET(request, {params}) {
    try {
        const { id } = params;
  
      if (!id) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
      }
  
      const user = await User.findOne({ _id: id });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error retrieving user", err }, { status: 500 });
    }
  }
  