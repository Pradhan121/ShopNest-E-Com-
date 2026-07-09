const wishlist = require("../models/wishlist");

exports.addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let userWishlist = await Wishlist.findOne({ userId });

    if (!userWishlist) {
      userWishlist = await Wishlist.create({
        userId,
        products: [{ productId }],
      });
    } else {
      const exists = userWishlist.products.find(
        (item) => item.productId.toString() === productId
      );

      if (!exists) {
        userWishlist.products.push({ productId });
        await userWishlist.save();
      }
    }

    const data = await Wishlist.findOne({ userId }).populate(
      "products.productId"
    );

    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const data = await Wishlist.findOne({
      userId: req.user.id,
    }).populate("products.productId");

    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.removeWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const userWishlist = await Wishlist.findOne({
      userId: req.user.id,
    });

    userWishlist.products = userWishlist.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await userWishlist.save();

    const data = await Wishlist.findOne({
      userId: req.user.id,
    }).populate("products.productId");

    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};
