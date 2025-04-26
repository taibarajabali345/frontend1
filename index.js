const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();  // <-- VERY IMPORTANT to load environment variables before using them

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    console.log("Mongo URI: ", process.env.MONGO_URI);  // Debug
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

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://lovely-empanada-5f6eb2.netlify.app", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
