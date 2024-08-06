import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nandanpathak30:dbnew%40123@cluster0.dx4on7v.mongodb.net/ogImageGenerator')
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
});

const UserPost = mongoose.model('UserPost', UserPostSchema);

export default UserPost;
