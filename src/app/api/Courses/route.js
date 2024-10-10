import Course from "@/app/(models)/Course"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// GET: Retrieve all courses
export async function GET() {
  try {
    const courses = await Course.find(); // Populating the referenced fields
    return NextResponse.json({ courses }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error retrieving courses", err }, { status: 500 });
  }
}

// POST: Create a new course
export async function POST(req) {
  try {
    const body = await req.json();
    const courseData = body.formData; // Adjust this based on your request body structure
    const newCourse = await Course.create(courseData);
    return NextResponse.json({ message: "Course Created", course: newCourse }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error creating course", err }, { status: 500 });
  }
}

