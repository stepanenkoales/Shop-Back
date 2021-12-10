const jwt = require('jsonwebtoken');
const createError = require("http-errors");

class JWTService {
  encode(payload, secret, expTime) {
    return jwt.sign(payload, secret, {expiresIn: expTime});
  }
  
  decode(token, secret) {
    try {
      return jwt.verify(token, secret);
    }
    catch (err) {
      switch (err.message) { 
        case 'invalid token': {
          throw new createError.Unauthorized("invalid token");
        }
        case 'jwt expired': {
          throw new createError.Unauthorized("token expired")
        }
        default: {
          throw new createError.Unauthorized("token error")
        }
      }
    }
  }
}

module.exports = new JWTService(); 

