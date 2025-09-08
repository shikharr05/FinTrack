const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");
const { 
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

// router.post("/upload-image", upload.single("image"), (req, res) => {
//     if(!req.file){
//         return res.status(400).json({ message: "No file uploaded!"})
//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// });

router.post(
  "/upload-image",
  protect,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // 1. The secure URL is now directly available in req.file.path
    const imageUrl = req.file.path;

    try {
      // 2. IMPORTANT: Save the URL to the currently logged-in user's profile
      await User.findByIdAndUpdate(req.user.id, { profileImage: imageUrl });

      // 3. Send the URL back as a response
      res.status(200).json({
        message: "Image uploaded and profile updated!",
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error saving image URL to database:", error);
      res.status(500).json({ message: "Error updating profile." });
    }
  }
);

module.exports = router