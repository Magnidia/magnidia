import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });

async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
    const fileBuffer = file;
    console.log(fileName);

    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${fileName}`,
      Body: fileBuffer,
      ContentType: 'image/png',
    };
  
    const s3Client = new S3Client(); // Instantiate your S3Client
  
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  
    const objectUrl = `https://magnidia-imageupload.s3.us-east-2.amazonaws.com/${params.Key}`;

    return objectUrl;

  }

export async function POST(request: { formData: () => Promise<any> }) {
	try {

		const formData = await request.formData();
		const file = formData.get('file');

		if(!file) {
			return NextResponse.json( { error: "File is required."}, { status: 400 } );
		} 

		const buffer = Buffer.from(await file.arrayBuffer());
		const objectUrl = await uploadFileToS3(buffer, file.name);

		return NextResponse.json({ success: true, objectUrl});
	} catch (error) {
		return NextResponse.json({ error });
	}
}