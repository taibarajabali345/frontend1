const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    lowercase: true,  // Optional: make sure email is lowercase
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      idMeal: String,
      strMeal: String,
      strMealThumb: String,
      quantity: {
        type: Number,
        default: 1,  // Default quantity for cart items
      },
    },
  ],
  favourites: [
    {
      idMeal: String,
      strMeal: String,
      strMealThumb: String,
      quantity: {
        type: Number,
        default: 1,  // Default quantity for favorites
      },
    },
  ],
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
