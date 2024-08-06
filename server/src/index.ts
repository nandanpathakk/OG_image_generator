import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import cloudinary from './utils/cloudinary';
import UserPost from './db';
import { z } from 'zod';

const upload = multer({ dest: 'uploads/' }); // Define temporary upload directory

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

    if (!file) {
      return res.status(400).json({
        msg: 'Image file is required',
      });
    }

    const cloudinary_res = await cloudinary.uploader.upload(file.path, {
      folder: '/post_images',
    });

    const post = await UserPost.create({
      title,
      content,
      imageUrl: cloudinary_res.secure_url,
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
