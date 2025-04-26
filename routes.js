<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { verifyToken } = require("./middlewares/verifyToken");

const {
  signup,
  login,
  logout,
  checkUser,
} = require("./controllers/authController");

const {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToCart,
  removeFromCart,
  getCart,
  confirmOrder,
} = require("./controllers/featureController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkUser", verifyToken, checkUser);

// Favourites
router.post("/addToFavourites/:id", verifyToken, addToFavourites);
router.post("/removeFromFavourites/:id", verifyToken, removeFromFavourites);
router.get("/getFavourites/:id", verifyToken, getFavourites);

// Cart
router.post("/addToCart/:id", verifyToken, addToCart);
router.post("/removeFromCart/:id", verifyToken, removeFromCart);
router.get("/getCart/:id", verifyToken, getCart); // ✅ Fixed route

// Order
router.post("/confirmOrder/:userId", verifyToken, confirmOrder);

=======
const express = require("express");
const router = express.Router();
const { verifyToken } = require("./middlewares/verifyToken");

const {
  signup,
  login,
  logout,
  checkUser,
} = require("./controllers/authController");

const {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToCart,
  removeFromCart,
  getCart,
  confirmOrder,
} = require("./controllers/featureController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkUser", verifyToken, checkUser);

// Favourites
router.post("/addToFavourites/:id", verifyToken, addToFavourites);
router.post("/removeFromFavourites/:id", verifyToken, removeFromFavourites);
router.get("/getFavourites/:id", verifyToken, getFavourites);

// Cart
router.post("/addToCart/:id", verifyToken, addToCart);
router.post("/removeFromCart/:id", verifyToken, removeFromCart);
router.get("/getCart/:id", verifyToken, getCart); // ✅ Fixed route

// Order
router.post("/confirmOrder/:userId", verifyToken, confirmOrder);

>>>>>>> c19c73637400f5f97d32a76c91f05618c6e1205d
module.exports = router;