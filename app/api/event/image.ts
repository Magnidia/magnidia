import { NextRequest, NextResponse } from "next/server";
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs/promises';

const upload = multer({ dest: "uplaods/"});
const s3 = new AWS.S3();

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    await upload.single('image')(req as any, res as any, () => {});

    const uploadedFile = (req as any).file;

    if (!uploadedFile) {
      return (req as any).status(400).json({ error: 'No file uploaded' });
    }

    // Read the file content using fs.promises
    const fileContent = await fs.readFile(uploadedFile.path);

    // AWS S3 upload parameters
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'magnidia-imageupload',
      Key: `uploads/${uploadedFile.filename}`,
      Body: fileContent,
      ContentType: uploadedFile.mimetype,
      ACL: 'public-read', // This makes the uploaded file publicly accessible
    };
    s3.upload(params, (uploadErr, data) => {
      if (uploadErr) {
        return (req as any).status(500).json({ error: 'Error uploading file to S3' });
      }

      // Send the URL of the uploaded image in the API response
      (req as any).json({ imageUrl: data.Location });
    });
  } catch (error) {
    console.error(error);
    (req as any).status(500).json({ error: "Internal servor error" });
  }
};

export default handler;
