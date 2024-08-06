import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const mongodbUri = process.env.MONGO_URL

if (!mongodbUri) {
  throw new Error('MONGODB_URI is not defined in the .env file');
}

// mongoose.connect(mongodbUri)
mongoose.connect("mongodb+srv://nandanpathak30:dbnew%40123@cluster0.dx4on7v.mongodb.net/ogImageGenerator")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const UserPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  ogImageUrl:{
    type: String,
    require: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now }
});

const UserPost = mongoose.model('UserPost', UserPostSchema);

export default UserPost;
