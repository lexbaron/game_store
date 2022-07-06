const express = require('express');

const { createUser, deleteUser, getAllUsers, login, updateUser } = require('../controllers/users.controller');
const { createUserValidator } = require('../middlewares/validators.middleware');

const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');
const { userExists } = require('../middlewares/users.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup',createUserValidator, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter.patch('/:id',userExists, protectUserAccount, updateUser);

usersRouter.delete('/:id',userExists, protectUserAccount, deleteUser);

module.exports = { usersRouter };