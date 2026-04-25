const auth = require('../models/auth')

const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "pradhansm2025.katargam@gmail.com",
        pass: "zgfghsolksmyxhje",
    },
});

const sendMail = async(email) => {
    const info = await transporter.sendMail({
        from: 'pradhansm2025.katargam@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?", 
        html: "<b>Hello world?</b>", // HTML version of the message
        // attachments : "",  // file upload of image
    });

    console.log("Message sent:", info.messageId);
}


exports.register = async(req,res)=>{
    try{
        const user = req.body        
        user.password = await bcrypt.hash(user.password, 10)
        
        const createUser = await auth.create(user)
        sendMail(createUser.email)

        res.status(201).json({
            status: 'Success',
            message: 'User register Successful',
            data: createUser
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const user = await auth.findOne({username: req.body.username})
         if(!user)throw new Error('Invalid username');

        const pass = await bcrypt.compare(req.body.password, user.password)
         if(!pass)throw new Error('Invalid password')

        const token = jwt.sign({ id: user._id, role: user.role },process.env.SECRET_KEY);

        res.status(200).json({
            status: 'Success',
            message: 'Login Successful',
            data: user,
            token
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.getUser = async(req,res)=>{
    try{
        const getAuth = await auth.find()

        res.status(200).json({
            status: 'Success',
            message: 'user fetched Successful',
            data: getAuth
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}