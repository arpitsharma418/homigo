const express = require("express");
const { signup, login, logout, updateProfile, me } = require("../controllers/authController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.get("/me", protect, me);

module.exports = router;
