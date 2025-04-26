require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const routes = require("./routes");

connectDB();
app.use(express.json());
app.use(cors({ origin: "https://heroic-mousse-c67a4b.netlify.app", credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Root route
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

// ❌ DO NOT use app.listen(port) here!

// ✅ Export for Vercel to handle
module.exports = app;
