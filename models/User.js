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