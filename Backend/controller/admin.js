const Product = require("../models/product");
const Order = require("../models/order");
const Auth = require("../models/auth");


exports.getUsers = async (req, res) => {
  try {

     const users = await Auth.find({
      role: "user",
    }).select("-password");

    res.status(200).json({
      status: "Success",
      data: users,
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.deleteUser = async (req, res) => {
  try {

    const user = await Auth.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        status: "Fail",
        message: "Admin cannot be deleted",
      });
    }

    await Auth.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.dashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await Auth.countDocuments({
      role: "user",
    });

    const revenueData = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    // Recent Users
    const recentUsers = await Auth.find({
      role: "user",
    })
      .select("username email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Products
    const recentProducts = await Product.find()
      .select("title price category image rating createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Orders
    const recentOrders = await Order.find()
      .populate("userId", "username email")
      .populate("products.productId", "title image")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      status: "Success",

      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,

        recentUsers,
        recentProducts,
        recentOrders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json({
      status: "Success",
      data: products,
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.addProduct = async (req, res) => {
  try {

     const productData = {
      ...req.body,
    };

    // image upload hui hai
    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = await Product.create(productData);

    res.status(201).json({
      status: "Success",
      data: product,
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.updateProduct = async (req, res) => {
  try {

     const updateData = {
      ...req.body,
    };

    // Agar new image upload hui hai
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        status: "Fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: product,
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
      message: "Product Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    res.status(200).json({
      status: "Success",
      data: orders,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};

exports.updateOrder = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: order,
    });

  } catch (err) {

    res.status(500).json({
      status: "Fail",
      message: err.message,
    });

  }
};