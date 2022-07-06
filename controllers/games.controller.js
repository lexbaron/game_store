const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { User } = require('../models/user.model');
const { Console } = require('../models/console.model');

const createGame = catchAsync( async (req, res, ) =>{
    const { title, genre } = req.body;

    const newGame =await Game.create({
        title,
        genre,
    });

    res.status(201).json({
        status: 'success',
        newGame
    })
});

const getAllGames = catchAsync( async (req, res, ) =>{
    const games = await Game.findAll({
        attributes: ['id', 'title', 'genre'],
        include: {model: User, attributes: ['id', 'name', 'email']},
        include: {model: Console, attributes: ['id', 'name']},
    });

	res.status(200).json({
		status: 'success',
		games,
	});
});

const updateGame = catchAsync( async (req, res, ) =>{
    const { game } = req;
	const { title } = req.body;

	await game.update({ title});

	res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync( async (req, res, ) =>{
    const { game } = req;

	await game.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createComment = catchAsync( async (req, res, ) =>{
    const { comment } = req.body;
    const { gameId } = req.params;
    const { id } = req.sessionUser

    const newComment =await Review.create({
       comment,
       gameId,
       userId: id
    });

    res.status(201).json({
        status: 'success',
        newComment
    })
});

module.exports = { createComment, createGame, getAllGames, deleteGame, updateGame };