const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Failed!");
  }
  try {
    const { name, role, userid } = isTokenValid({ token });
    req.user = { name, role, userid };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Failed!");
  }
};
const authorizePermissions = (...roles) => {
//   console.log(roles)
  return (res, req, next) => {
    // console.log(req)

    if (!roles.includes(req.user.role)) {

      throw new CustomError.UnauthorisedError("Just dey play");
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermissions };
