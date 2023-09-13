const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};



const isTokenValid = ({ token }) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null; // or handle the error in your specific way
    }
};

module.exports = {
    createJWT,
    isTokenValid
};

