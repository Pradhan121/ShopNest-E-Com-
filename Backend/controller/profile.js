const Auth = require('../models/auth')

exports.getProfile = async(req,res)=>{
    try{
        const user = await Auth.findById(req.user.id).select('-password');
          if(!user) throw new Error('User not found')

        res.status(200).json({
            status: 'Success',
            data: user
        })
    }
    catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });

  }
}

const Auth = require("../models/auth");

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await Auth.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
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