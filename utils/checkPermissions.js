const CustomError = require('../errors')

const User = require('../models/user')

const checkPermissions = (requestUser, resourceUserId)=>{
    // console.log(requestUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);

    if (requestUser.role === 'admin') return;
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorisedError('Not allowed to perfom this function')
}

module.exports = checkPermissions