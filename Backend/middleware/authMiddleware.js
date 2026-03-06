const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized token not found"});
    }

    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();  
    } catch (error) {
        return res.status(403).json({message:"Forbidden - Invalid Token"});
    }
}

module.exports = authMiddleware;