// db.js
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI: ", process.env.MONGO_URI); // Debugging line
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.connection.readyState === 1) {
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection failed");
    }
  } catch (error) {
    console.log("MongoDB error:", error.message);  // Debugging line
  }
};

module.exports = connectDB;  // Exporting connectDB function
