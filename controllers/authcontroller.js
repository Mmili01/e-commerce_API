const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { attachCokiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCokiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please provide both email and password"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials!");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials!");
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCokiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });

 
};
const logout = async (req, res) => {
 res.cookie("token", "logout"), {
    httpOnly:true,
  expires: new Date(Date.now()+ 5 *1000)
 }

//  res.status(StatusCodes.OK).json("logged out")
};

module.exports = {
  login,
  logout,
  register,
};
