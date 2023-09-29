const express = require('express');
const router = express.Router()

const { getAllOrders,getSingleOrder,getCurrentUserOrders,createOrder,updateOrders} = require('../controllers/orderController');
const { showCurrentUser } = require('../controllers/userController');
const { authenticateUser,authorizePermissions } = require('../middleware/authentication');

router.route('/').post(authenticateUser,createOrder).get(authenticateUser,authorizePermissions('admin','owner'),getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser,getCurrentUserOrders)

router.route('/:id').get(authenticateUser,getSingleOrder).patch(authenticateUser,updateOrders)

module.exports= router