// const multer = require("multer");
// // Multer is a middleware that handles the incoming file from the client: it parses the multipart/form-data request and saves the file either to disk or memory.
// // Then, you decide what to do with it:
// // Save the file on disk → store its path in the database.
// // Save the file in memory or buffer → store it directly in the database (like MongoDB’s GridFS or as a binary).


// //configure Storage
// //isse jo bhi image uplaod hogi from login or signup page wo hamare system mai uploads folder mai ayegi using multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb ) => {
//         cb(null, 'uploads/')
//     },
    
//     filename: (req, file, cb) => {

//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
//     //filename wale part se jo bhi pic mere upload folder mai aayegi uske different names rkhe jayenge using date.now() function.
// });

// //File Filter
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

//     if(allowedTypes.includes(file.mimetype)){
//         cb(null, true);
//     }
//     else{
//         cb(new Error('Only .jpeg, .png and .jpg format are allowed'), false);
//     }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


// in middleware/uploadMiddleware.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary using your .env variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure the Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "fintrack_avatars", // A folder name in your Cloudinary account
        allowed_formats: ["jpeg", "png", "jpg"], // Replaces your fileFilter
    },
});

// Create the upload instance
const upload = multer({ storage: storage });

module.exports = upload;