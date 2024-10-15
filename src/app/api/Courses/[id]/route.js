import Card from "@/app/(models)/Card"; // Import Cards first
import User from "@/app/(models)/User"; // Import User first
import Course from "@/app/(models)/Course"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// GET: Retrieve a specific user by ID
export async function GET(request, {params}) {
    try {
        const { id } = params;
      if (!id) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
      }
      // console.log(id)
      const courses = await Course.find({ _id: id }).populate('cards')
      
  
      if (!courses) {
        return NextResponse.json({ message: "Courses not found" }, { status: 404 });
      }
  
      return NextResponse.json({ courses }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error retrieving courses", err }, { status: 500 });
    }
  }
  