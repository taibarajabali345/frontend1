<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cart: [
    {
      idMeal: String,
      strMeal: String,
      strMealThumb: String,
      quantity: Number,
    },
  ],
  favourites: [
    {
      idMeal: String,
      strMeal: String,
      strMealThumb: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
=======
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Add this route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
>>>>>>> c19c73637400f5f97d32a76c91f05618c6e1205d
