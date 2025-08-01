const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Session = require("../models/Session");
const User = require("../models/User");
const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// const path = require("path");

// // Multer configuration with Cloudinary storage
// const Storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads",
//     resource_type: "raw", // Required for JSON or non-image files
//     public_id: (req, file) => Date.now() + path.extname(file.originalname),
//   },
// });

// const upload = multer({ storage: Storage });
const upload = multer();


router.post("/", auth, upload.none(), async (req, res) => {
  try {
    // console.log('Received body:', req.body); 

    const { title, tag, status } = req.body;

    const user = await User.findOne({ id: req.user._id });
    // console.log(user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const session = new Session({
      user: user._id,
      title,
      tag,
      status,
    });

    const savedSession = await session.save();
    res.status(201).json(savedSession);
    
  } catch (error) {
    console.error("Error saving session:", error.message);
    res.status(500).json({ error: "Error saving session" });
  }
});

// router.post('/publish', auth, uploadJSON.single('jsonFile'), async (req, res) => {
//   try {
//     const { title, tags } = req.body;
//     const jsonFileUrl = req.file ? req.file.path : '';

//     const session = new Session({
//       user: req.user._id,
//       title,
//       tags: tags.split(',').map(t => t.trim()),
//       jsonFileUrl,
//       status: 'published'
//     });

//     await session.save();
//     res.status(201).json(session);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Could not publish session' });
//   }
// });

// router.get('/sessions', async (req, res) => {
//   try {
//     const sessions = await Session.find({ status: 'published' });
//     res.status(200).json(sessions);
//   } catch (err) {
//     res.status(500).json({ error: 'Could not fetch public sessions' });
//   }
// });

// router.get('/mysessions', auth, async (req, res) => {
//   try {
//     const sessions = await Session.find({ user: req.user._id });
//     res.status(200).json(sessions);
//   } catch (err) {
//     res.status(500).json({ error: 'Could not fetch your sessions' });
//   }
// });

// router.get('/my-sessions/:id', auth, async (req, res) => {
//   try {
//     const session = await Session.findOne({ _id: req.params.id, user: req.user._id });
//     if (!session) return res.status(404).json({ error: 'Session not found' });
//     res.status(200).json(session);
//   } catch (err) {
//     res.status(500).json({ error: 'Could not fetch session' });
//   }
// });

module.exports = router;
