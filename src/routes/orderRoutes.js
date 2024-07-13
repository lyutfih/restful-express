const express = require('express');
const orderRouter = express.Router();
const checkOrder = require('../middlewares/orderMiddlewares');
const checkUser = require('../middlewares/userMiddlewares');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderControllers');
const orderValidator = require('../validators/orderValidators');

orderRouter.get('/', getAllOrders);

orderRouter.get('/:id', checkOrder, getOrderById);

orderRouter.post('/', orderValidator, checkUser, createOrder);

orderRouter.put('/:id', checkOrder, orderValidator, updateOrder);

orderRouter.delete('/:id', checkOrder, deleteOrder);

module.exports = orderRouter;

