const order = require('../models/order')

exports.createOrder = async(req,res)=>{
    try{
        const cartBody = req.body

        const cartData = await order.create(cartBody)
         res.status(201).json({
            status: 'Success',
            message: 'Cart created Successful',
            data: cartData
          })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.viewOrder = async(req,res)=>{
    try{
        const getOrder = await order.find().populate(['userId', 'products.productId'])
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