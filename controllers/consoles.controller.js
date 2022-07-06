const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync( async (req, res, next) =>{
    const { name, company } = req.body;

    const newConsole =await Console.create({
        name,
        company
    });

    res.status(201).json({
        status: 'success',
        newConsole
    })
}); 

const getAllConsole = catchAsync( async (req, res, next) =>{
    const consoles = await Console.findAll({
        attributes: ['id', 'name', 'company'],
        include: {model: Game, attributes:['id', 'title', 'genre']}
    });

	res.status(200).json({
		status: 'success',
		consoles,
	});
});

const updateConsole = catchAsync( async (req, res, next) =>{
    const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync( async (req, res, next) =>{
    const { console } = req;

	await console.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createConsoleGameRelation = catchAsync( async (req, res, next) =>{
    const { gameId, consoleId } = req.body;

    const newRegister = await GamesInConsoles.create({
        gameId,
        consoleId
    });

    res.status(201).json({
        status: 'succes',
        newRegister
    })
});

module.exports = { createConsole, getAllConsole, updateConsole, deleteConsole, createConsoleGameRelation }