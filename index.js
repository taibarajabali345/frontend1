require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const routes = require("./routes");
const bcrypt = require('bcryptjs'); // <-- Add this line for bcrypt

connectDB();
app.use(express.json());
const frontendUrl = process.env.NODE_ENV === 'production'
  ? 'https://heroic-mousse-c67a4b.netlify.app'
  : 'http://localhost:5173';

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Add this route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
