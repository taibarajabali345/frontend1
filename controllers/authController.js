
const User = require("../models/User");
const bcrypt = require("bcryptjs");  // Change made here from bcrypt to bcryptjs
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;
    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Please login" });
    }

    const hashPassword = await bcrypt.hash(password, 10);  // Using bcryptjs here

    user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Using bcryptjs here

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    return res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(Date.now()) });
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User not authenticated" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");  // Change made here from bcrypt to bcryptjs
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;
    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Please login" });
    }

    const hashPassword = await bcrypt.hash(password, 10);  // Using bcryptjs here

    user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Using bcryptjs here

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    return res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(Date.now()) });
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User not authenticated" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

