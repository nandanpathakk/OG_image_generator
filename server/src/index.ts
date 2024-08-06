import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cloudinary from './utils/cloudinary';
import UserPost from './db';
import { z } from 'zod';
import { generateOgImage } from './ogImageGenerator';

// Define the upload directory relative to the server root
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir }); // Define temporary upload directory
// const upload = multer({ dest: "uploads/" })

const app = express();
app.use(express.json());
app.use(cors());

const userPostBody = z.object({
  title: z.string(),
  content: z.string(),
});

app.post('/userpost', upload.single('postImage'), async (req: Request, res: Response) => {
  const success = userPostBody.safeParse(req.body);
  
  if (!success.success) {
    return res.status(400).json({
      msg: 'Incorrect Inputs',
    });
  }

  try {
    const { title, content } = req.body;
    const file = req.file;

    let imageUrl;
    let ogImageUrl;

    if (file) {
      const cloudinary_res = await cloudinary.uploader.upload(file.path, {
        folder: '/post_images',
      });
      imageUrl = cloudinary_res.secure_url;
    }

    // Generate OG Image
    const ogImageBuffer = await generateOgImage(title, content, imageUrl || 'https://via.placeholder.com/300');

    // Save OG image buffer to a file in the uploads directory
    const ogImagePath = path.join(uploadDir, 'og-image.png');
    fs.writeFileSync(ogImagePath, ogImageBuffer);

    // Upload OG Image to Cloudinary
    const ogImageUploadRes = await cloudinary.uploader.upload(ogImagePath, {
      folder: '/og_images',
    });
    ogImageUrl = ogImageUploadRes.secure_url;

    // Clean up temporary OG image file
    fs.unlinkSync(ogImagePath);

    const post = await UserPost.create({
      title,
      content,
      imageUrl,
      ogImageUrl,
      createdAt: new Date()
    });

    res.json({
      message: 'Post successfully added',
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      msg: 'Error creating post',
      error,
    });
  }
});

app.get("/getpost", async (req:Request, res: Response) => {

  try{
    const posts = await UserPost.find().sort({ createdAt: -1 });
      res.json(posts)
  }catch(error){
    console.error("Error getting posts", error)
    res.status(500).json({
      msg: "Error getting posts",
      error
    })
  }

});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
