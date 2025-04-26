// app.js or index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const connectDB = require("./connection");  // Import the connectDB function

require("dotenv").config();  // <-- VERY IMPORTANT to load environment variables before using them

const app = express();

// Connect to DB
connectDB();  // Call the connectDB function to connect to MongoDB

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
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
