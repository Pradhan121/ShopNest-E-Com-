const cart = require('../models/cart')

exports.createCart = async(req,res)=>{
    try{
        const cartBody = req.body

        const cartData = await cart.create(cartBody)
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

exports.viewCart = async(req,res)=>{
    try{
        const getCart = await cart.find().populate(['userId', 'productId'])
         res.status(200).json({
                status: 'Success',
                message: 'Cart data fetched',
                data: getCart
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
    }
}

exports.updateCart = async(req,res)=>{
    try{
        const editId = req.params.id

        const editCart = await cart.findByIdAndUpdate(editId, req.body, {new: true})
        res.status(200).json({
            status: 'Success',
            message: 'CartData updated successful',
            data: editCart
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.deleteCart = async(req,res)=>{
    try{
        const deleteId = req.params.id

        const deleteData = await cart.findByIdAndDelete(deleteId)
        res.status(200).json({
            status: 'Success',
            message: 'CartData deleted successful',
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