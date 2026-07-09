const Auth = require("../models/auth");
const Order = require("../models/order");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Auth.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found"
            });
        }

        const orderCount = await Order.countDocuments({ userId });
        const cart = await Cart.findOne({ userId });
        const cartCount = cart ? cart.items.length : 0;

        const wishlist = await Wishlist.findOne({ userId });
        const wishlistCount = wishlist ? wishlist.products.length : 0;

        res.status(200).json({
            status: "Success",
            data: {
                user,
                orderCount,
                cartCount,
                wishlistCount
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: err.message
        });
    }
};


exports.updateProfile = async (req, res) => {
  try {
    const { username, email} = req.body;

    const user = await Auth.findByIdAndUpdate(
      req.user.id,
      {
        username,
        email,
      },
      {new: true}
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};