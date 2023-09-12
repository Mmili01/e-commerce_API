const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const register = async (req, res) =>{
    const user = await User.create(req.body)
}
const login = async (req, res) =>{
    res.send('user logged in ')
}
const logout = async (req, res) =>{
    res.send('user logged out')
}

module.exports = {
    login, logout, register
}