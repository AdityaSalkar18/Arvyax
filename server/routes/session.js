const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Session = require("../models/Session");
const User = require("../models/User");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "raw",
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

const upload = multer({ storage: Storage });

router.post(
  "/my-sessions/save-publish",
  auth,
  upload.single("sessionFile"),
  async (req, res) => {
    try {
      // console.log('Received body:', req.body);

      const { title, tag } = req.body;

      const user = await User.findOne({ id: req.user.id });
      // console.log(user);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const session = new Session({
        user: user._id,
        title,
        tag,
        sessionFile: req.file ? req.file.path : undefined,
        status: "published",

      });

      const savedSession = await session.save();
      res.status(201).json(savedSession);
    } catch (error) {
      console.error("Error saving session:", error.message);
      res.status(500).json({ error: "Error saving session" });
    }
  }
);



router.post(
  "/my-sessions/save-draft",
  auth,
  upload.single("sessionFile"),
  async (req, res) => {
    try {
      // console.log('Received body:', req.body);

      const { title, tag } = req.body;

      const user = await User.findOne({ id: req.user.id });
      // console.log(user);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const session = new Session({
        user: user._id,
        title,
        tag,
        sessionFile: req.file ? req.file.path : undefined,
      });

      const savedSession = await session.save();
      res.status(201).json(savedSession);
    } catch (error) {
      console.error("Error saving session:", error.message);
      res.status(500).json({ error: "Error saving session" });
    }
  }
);

router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch public sessions" });
  }
});

router.get("/my-sessions", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({ user: userId });

    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error fetching user sessions:", err.message);
    res.status(500).json({ error: "Failed to fetch your sessions" });
  }
});



router.patch(
  "/my-sessions/:id",
  auth,
  upload.single("sessionFile"),
  async (req, res) => {
    try {
      const { title, tag } = req.body;
      const sessionId = req.params.id;

      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const session = await Session.findOne({ _id: sessionId, user: user._id });
      if (!session)
        return res
          .status(404)
          .json({ msg: "Session not found or unauthorized" });

      if (title) session.title = title;
      if (tag) session.tag = tag;
      if (req.file) session.sessionFile = req.file.path;

      session.status = "published";

      const updatedSession = await session.save();
      res.status(200).json(updatedSession);
    } catch (error) {
      console.error("Error updating session:", error.message);
      res.status(500).json({ error: "Error updating session" });
    }
  }
);

module.exports = router;
