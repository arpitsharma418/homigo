const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

function buildAuthUser(user) {
  return {
    id: user._id,
    _id: user._id,
    username: user.username,
    fullName: user.fullName || "",
    email: user.email,
    phone: user.phone || "",
    location: user.location || "",
    bio: user.bio || "",
    avatar: user.avatar || { url: "", filename: "" },
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function uploadAvatar(file) {
  if (!file) {
    return null;
  }

  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "homigo/avatars",
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    filename: result.public_id,
  };
}

// Sigup User
const signup = async (req, res) => {
  try {
    const { username, fullName, email, password, phone, location, bio } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const isExisting = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (isExisting) {
      return res
        .status(409)
        .json({ message: "User already exist with this email" });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username.trim(),
      fullName: fullName?.trim() || "",
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone: phone?.trim() || "",
      location: location?.trim() || "",
      bio: bio?.trim() || "",
    });

    console.log("New user created:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      user: buildAuthUser(user),
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      user: buildAuthUser(user),
      message: "Logged in successfully!",
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, fullName, email, phone, location, bio, avatarUrl, removeAvatar } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required." });
    }

    const trimmedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exist with this email" });
    }

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.username = trimmedUsername;
    user.fullName = fullName?.trim() || "";
    user.email = normalizedEmail;
    user.phone = phone?.trim() || "";
    user.location = location?.trim() || "";
    user.bio = bio?.trim() || "";

    const uploadedAvatar = await uploadAvatar(req.file);

    if (uploadedAvatar) {
      user.avatar = uploadedAvatar;
    } else if (avatarUrl?.trim()) {
      user.avatar = {
        url: avatarUrl.trim(),
        filename: "external-avatar",
      };
    } else if (removeAvatar === "true") {
      user.avatar = {
        url: "",
        filename: "",
      };
    }

    await user.save();

    return res.json({
      user: buildAuthUser(user),
      message: "Profile updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const me = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, logout, updateProfile, me };
