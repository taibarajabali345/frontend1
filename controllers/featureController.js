
const User = require("../models/User");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { idMeal, strMeal, strMealThumb, quantity } = req.body;

    if (!idMeal || !strMeal || !strMealThumb || !quantity) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const itemIndex = user.cart.findIndex(item => item.idMeal === idMeal);
    if (itemIndex !== -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ idMeal, strMeal, strMealThumb, quantity });
    }

    await user.save();
    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.cart = user.cart.filter(item => item.idMeal !== cart.idMeal);
    await user.save();

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error removing item" });
  }
};

// Add to favourites
exports.addToFavourites = async (req, res) => {
  const { id } = req.params;
  const favourite = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const existing = user.favourites.some(fav => fav.idMeal === favourite.idMeal);
    if (existing) {
      return res.status(400).json({ success: false, message: "Recipe already in favourites" });
    }

    user.favourites.push(favourite);
    await user.save();

    return res.status(200).json({ success: true, message: "Added to favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from favourites
exports.removeFromFavourites = async (req, res) => {
  const { id } = req.params;
  const favourite = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.favourites = user.favourites.filter(fav => fav.idMeal !== favourite.idMeal);
    await user.save();

    return res.status(200).json({ success: true, message: "Removed from favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get favourites
exports.getFavourites = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, favourites: user.favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm order
exports.confirmOrder = async (req, res) => {
  const { userId } = req.params;
  const { address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.address = address; // Make sure your User model has an 'address' field
    await user.save();

    res.json({ success: true, message: "Order confirmed and address saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });}
  }

