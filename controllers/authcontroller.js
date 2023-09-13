const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createJWT = require("../utils");

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
  const token = createJWT({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const login = async (req, res) => {
  res.send("user logged in ");
};
const logout = async (req, res) => {
  res.send("user logged out");
};

module.exports = {
  login,
  logout,
  register,
};
