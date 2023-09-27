const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Failed!");
  }
  try {
    const { name, role, userId } = isTokenValid({ token });
    req.user = { name, role, userId };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Failed!");
  }
};
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new CustomError.UnauthorisedError("Not Authorised to access this route");
      }
      next();
    };
  };
  
module.exports = { authenticateUser, authorizePermissions };
