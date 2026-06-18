const Cart = require("../models/cart");
const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode
    } = req.body;

    const userCart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({
        status: "Fail",
        message: "Cart is empty"
      });
    }

    const totalAmount = userCart.items.reduce(
      (acc, item) =>
        acc + item.productId.price * item.quantity,
      0
    );

    const orderData = await Order.create({
      userId,
      products: userCart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      totalAmount
    });

    // cart clear
    userCart.items = [];
    await userCart.save();

    res.status(201).json({
      status: "Success",
      message: "Order placed successfully",
      data: orderData
    });

  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};

exports.viewOrder = async(req,res)=>{
    try{
        const getOrder = await order
               .find({ userId: req.user.id })
               .populate("products.productId");
         res.status(200).json({
                status: 'Success',
                message: 'order data fetched',
                data: getOrder
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
    }
}

exports.updateOrder = async(req,res)=>{
    try{
        const editId = req.params.id

        const editOrder = await order.findByIdAndUpdate(editId, req.body, {new: true})
        res.status(200).json({
            status: 'Success',
            message: 'OrderData updated successful',
            data: editOrder
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.deleteOrder = async(req,res)=>{
    try{
        const deleteId = req.params.id

        const deleteData = await order.findByIdAndDelete(deleteId)
        res.status(200).json({
            status: 'Success',
            message: 'orderData deleted successful',
            data: deleteData
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}