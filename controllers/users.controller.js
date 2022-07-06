const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Game } = require('../models/game.model');

dotenv.config({ path: './config.env' });

const createUser = catchAsync( async (req, res, next) =>{
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser =await User.create({
        name,
        email,
        password: hashPassword
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser
    })
}); 

const getAllUsers = catchAsync( async (req, res, next) =>{
    const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
        include: {model: Game, attributes:['id', 'title', 'genre']}
    });

	res.status(200).json({
		status: 'success',
		users,
	});
});

const updateUser = catchAsync( async (req, res, next) =>{
    const { user } = req;
	const { name, email } = req.body;

	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync( async (req, res, next) =>{
    const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync( async (req, res, next) =>{
    const { email, password } = req.body;

    const user = await User.findOne({
        where:{
            email,
            status: 'active'
        }
    });

    if(!user){
        return next(new AppError('credentials invalid', 400));
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return next(new AppError('credentials invalid', 400));
    };

    const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(200).json({
		status: 'success',
		token,
	});
});

module.exports = { createUser, getAllUsers, login, updateUser, deleteUser }


