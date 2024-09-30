// upload.js
import cloudinary from 'cloudinary';
import multer  from 'multer';
import { CloudinaryStorage }  from 'multer-storage-cloudinary';
import dotenv from 'dotenv'
dotenv.config();
cloudinary.v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads', // The name of the folder in Cloudinary
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = upload;
