const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCokiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  console.log("Anyting");
  const users = await User.find({ role: "user" }).select("-password");
//   console.log("user logged", users);
  if (users) {
    // console.log(req.users)
    res.status(StatusCodes.OK).json({ users });
  }
};

const getsingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  // console.log(req.user)
  if (!user) {
    throw new CustomError.NotFoundError("User not found!!");
  }
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const { email, name } = req.body;
  
    if (!email || !name) {
      throw new CustomError.BadRequestError("Email or name cannot be empty");
    }
  
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { email, name },
      { new: true, runValidators: true }
    );
  console.log(req.user)
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }
  
    // Now, you can safely access the user's properties
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(tokenUser);
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };
  

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // console.log(req.user)
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Parameters cannot be empty");
  }
  const user = await User.findOne({ _Id: req.user.userId });

  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  // Update the user's password
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password successfully updated" });
};

module.exports = {
  getAllUsers,
  getsingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
