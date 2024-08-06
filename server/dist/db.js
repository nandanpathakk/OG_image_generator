"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://nandanpathak30:dbnew%40123@cluster0.dx4on7v.mongodb.net/ogImageGenerator')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const UserPostSchema = new mongoose_1.default.Schema({
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
    ogImageUrl: {
        type: String,
        require: true
    }
});
const UserPost = mongoose_1.default.model('UserPost', UserPostSchema);
exports.default = UserPost;
