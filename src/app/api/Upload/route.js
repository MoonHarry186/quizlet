import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload image API route
export const POST = async (req) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
  }

  
  try {
    const formData = await req.formData();
        const file = formData.get('image'); // Assuming 'image' is the form field name for the file input
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${Date.now()}_${file.name}`,
            Body: buffer,
            ContentType: file.type,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        return NextResponse.json({ message: 'Upload successful', url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}` }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: "Error processing request", error }, { status: 500 });
  }
};