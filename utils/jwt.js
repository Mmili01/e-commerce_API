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


const attachCokiesToResponse = ({res, user})=>{
    const token = createJWT({payload:user})

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure:process.env.NODE_ENV === "production",
      signed:true
    });
  
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCokiesToResponse
};

