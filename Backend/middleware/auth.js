const jwt = require('jsonwebtoken')

exports.authCheck = async(req, res, next)=>{
    try{
        const token = req.headers.authorization
         if(!token)throw new Error('Attach token')

        const verify = jwt.verify(token, SECRET_KEY)
        if(!verify)throw new Error('Invalid token')

         next()
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}