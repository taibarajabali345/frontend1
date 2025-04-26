<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI: ", process.env.MONGO_URI);  // Add this line to debug
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.connection.readyState === 1) {
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

=======
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI: ", process.env.MONGO_URI);  // Add this line to debug
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.connection.readyState === 1) {
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

>>>>>>> c19c73637400f5f97d32a76c91f05618c6e1205d
module.exports = { connectDB };