const product = require('../models/product')

exports.createProduct = async(req,res)=>{
    try{
        const create = req.body
        create.image = req.file.filename

        const producrEntry = await product.create(create)
          res.status(201).json({
            status: 'Success',
            message: 'Product created Successful',
            data: producrEntry
          })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.viewProduct = async(req,res)=>{
    try{
        const getProduct = await product.find()
        res.status(200).json({
            status: 'Success',
            message: 'Product created Successful',
            data: getProduct
          })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.updateProduct = async(req,res)=>{
    try{
        const editId = req.params.id

        const editProduct = await product.findByIdAndUpdate(editId, req.body, {new: true})
        res.status(200).json({
            status: 'Success',
            message: 'productData updated successful',
            data: editProduct
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.deleteProduct = async(req,res)=>{
    try{
        const deleteId = req.params.id

        const deleteProduct = await product.findByIdAndDelete(deleteId)
        res.status(200).json({
            status: 'Success',
            message: 'productData deleted successful',
            data: deleteProduct
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.getSingleProduct = async(req,res)=>{
    try{
        const getId = req.params.id

        const singleProduct = await product.findById(getId)
          res.status(200).json({
            status: 'Success',
            message: 'productData fetched successful',
            data: singleProduct
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}