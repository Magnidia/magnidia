// api/event/image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import AWS from 'aws-sdk';


declare module 'next' {
  interface NextApiRequest {
    file: any;
  }
}

const upload = multer({ dest: 'uploads/' });

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to handle file uploads
  },
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await upload.single('image')(req as any, res as any, () => {}); // Casting due to multer type mismatch

    // Access the uploaded file information using req.file
    const uploadedFile = req.file as Express.Multer.File;

    // Implement AWS S3 upload logic
    const params = {
      Bucket: 'magnidia-imageupload',
      Key: uploadedFile.originalname,
      Body: uploadedFile.buffer,
    };

    const data = await s3.upload(params).promise();

    // Respond with the URL of the uploaded image
    res.status(200).json({ imageUrl: data.Location });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
