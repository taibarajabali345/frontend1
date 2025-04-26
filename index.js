require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const routes = require("./routes");

connectDB();
app.use(express.json());
app.use(cors({ origin: "https://heroic-mousse-c67a4b.netlify.app", credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Add this route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

// Listen (ONLY locally, Vercel will handle it on production)
app.listen(port, () => console.log(`Server running on port ${port}`));

// Export app for Vercel
module.exports = app;
