const express = require('express');
const userRouter = express.Router();
const checkUser = require('../middlewares/userMiddlewares');
const userValidator = require('../validators/userValidators');
const { getAllUsers, getUserById, getUserOrders, createUser, updateUser, setUserStatus, deleteUser } = require('../controllers/userControllers');


userRouter.get('/', getAllUsers);

userRouter.get('/:id', checkUser, getUserById);

userRouter.get('/:id/orders', checkUser, getUserOrders);

userRouter.post('/', userValidator, createUser);

userRouter.put('/:id', checkUser, userValidator, updateUser);

userRouter.put('/:id/check-inactive', checkUser, setUserStatus);

userRouter.delete('/:id', checkUser, deleteUser); 

module.exports = userRouter;

