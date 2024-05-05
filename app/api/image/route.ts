import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
  const encodedFileName = encodeURIComponent(fileName);

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: encodedFileName,
    Body: file,
    ContentType: "image/png",
  };

  const s3Client = new S3Client(); // Instantiate your S3Client

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const objectUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${
    process.env.AWS_REGION
  }.amazonaws.com/${encodeURIComponent(encodedFileName)}`;

  return objectUrl;
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.formData();
    const file = formData.get("file") as File;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadFileToS3(buffer, file.name);

      return NextResponse.json({ success: true, imageUrl }, { status: 201 });
    } else {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
