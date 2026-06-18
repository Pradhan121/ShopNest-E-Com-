const jwt = require('jsonwebtoken');

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;  //  id + role aa jayega

    next();
  } catch (err) {
    res.status(401).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "Fail",
      message: "Access denied",
    });
  }
  next();
};



// const decoded: any = jwt.verify(
//           token,
//           process.env.JWT_SECRET as string
//         );

//         const adminUser = await User.findById(decoded?.id).select('-password');

//         if (!adminUser) {
//            return res.status(401).json({ message: 'Admin user not found' });
//         }
       
//         req.user = adminUser;
//         req.token = token;
//         return next();
