const User = require("../models/User");
const bcrypt = require("bcryptjs");  // Change made here from bcrypt to bcryptjs
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "User already exists. Please login." });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    user = new User({
      username,
      email,
      password: hashPassword,
    });

    await user.save(); // Save the new user

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error); // 👈 Also log the error
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found. Please signup." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",  // Token expires in 1 hour
    });

    // Set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    return res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(Date.now()) });  // Clear the token
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error during logout. Please try again." });
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
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};



