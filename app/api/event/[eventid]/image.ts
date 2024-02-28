import { NextApiRequest, NextApiResponse } from "next/server";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'YOUR_S3_BUCKET_NAME',
    acl: 'public-read',
    key: (_req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await upload.single('image')(req, res);

    // Assuming the file upload was successful, you can now obtain the S3 URL
    const imageUrl: string = (req.file as any)?.location;

    // Perform other operations if needed (e.g., saving the URL to a database)

    res.status(201).json({ message: "Successfully uploaded the image.", imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to upload the image." });
  }
};

export default handler;
