import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import { NextResponse } from "next/server";
import fs from 'fs';

export const dynamic = 'force-dynamic'; // Enable dynamic rendering for file uploads

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const GET = (req) => {
  return NextResponse.json({ cards: "haha" }, { status: 200 });

}

export const POST = async (req) => {
  try {
    const buffer = await req.arrayBuffer(); // Read the request body as a buffer
    const form = formidable({ multiples: false }); // Create a new instance of formidable

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(Buffer.from(buffer), (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.image;
    const fileStream = fs.createReadStream(file.filepath);
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalFilename}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return NextResponse.json(
      { url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json({ message: 'Error uploading to S3', error }, { status: 500 });
  }
};

export const OPTIONS = () => {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
};
