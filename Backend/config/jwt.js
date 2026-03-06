const jwt = require('jsonwebtoken');

const generateToken = (id,email)=>{
    const Token = jwt.sign(
        {id,email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    );
    return Token;
}

module.exports = {generateToken};