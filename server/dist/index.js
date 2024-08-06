"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("./utils/cloudinary"));
const db_1 = __importDefault(require("./db"));
const zod_1 = require("zod");
const upload = (0, multer_1.default)({ dest: 'uploads/' }); // Define temporary upload directory
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userPostBody = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
app.post('/userpost', upload.single('postImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const cloudinary_res = yield cloudinary_1.default.uploader.upload(file.path, {
            folder: '/post_images',
        });
        const post = yield db_1.default.create({
            title,
            content,
            imageUrl: cloudinary_res.secure_url,
        });
        res.json({
            message: 'Post successfully added',
            post,
        });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            msg: 'Error creating post',
            error,
        });
    }
}));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
