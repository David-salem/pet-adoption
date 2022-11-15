const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.jwtSign = (payload, expiresIn = '1h') => {
    const access_token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

    return access_token;
}

module.exports.jwtVerify = (token) => {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    
    return payload;
}