const cart = require('../models/cart')

exports.createCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    let existingCart = await cart.findOne({ userId });

    if (existingCart) {

      items.forEach((newItem) => {

        const existingItem = existingCart.items.find(
          item => item.productId.toString() === newItem.productId.toString()
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          existingCart.items.push(newItem);
        }

      });

      await existingCart.save();

    } else {

      existingCart = await cart.create({
        userId,
        items,
      });

    }

    // ✅ IMPORTANT → populate before sending
    const updatedCart = await cart
      .findOne({ userId })
      .populate({
        path: "items.productId",
        select: "title price image"
      });

    res.status(200).json({
      status: "Success",
      data: updatedCart,
    });

  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};


exports.viewCart = async (req, res) => {
  try {
    const getCart = await cart
      .findOne({ userId: req.user.id })   
      .populate({
  path: "items.productId",
  select: "title price image"
})

    res.status(200).json({
      status: "Success",
      message: "Cart data fetched",
      data: getCart,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const userCart = await cart.findOne({ userId });

    const item = userCart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );

    if (item) {
      item.quantity = quantity;
    }

    await userCart.save();

    // ✅ IMPORTANT: populate after save
    const updatedCart = await cart
      .findOne({ userId })
      .populate({
  path: "items.productId",
  select: "title price image"
})

    res.status(200).json({
      status: "Success",
      data: updatedCart,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const userCart = await cart.findOne({ userId });

    userCart.items = userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await userCart.save();

    const updatedCart = await cart
      .findOne({ userId })
      .populate({
  path: "items.productId",
  select: "title price image"
})
console.log("BACKEND UPDATED CART 👉", updatedCart);
    res.status(200).json({
      status: "Success",
      data: updatedCart,
    });

  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};