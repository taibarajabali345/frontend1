
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







module.exports = { connectDB };