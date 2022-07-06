const express = require('express');

const {createComment, createGame, deleteGame, getAllGames, updateGame } = require('../controllers/games.controller');
const { protectSession } = require('../middlewares/auth.middleware');
const { gameExists } = require('../middlewares/games.middleware');
const { createGameValidator } = require('../middlewares/validators.middleware')

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession)

gamesRouter.post('/',createGameValidator, createGame);

gamesRouter.post('/reviews/:gameId', createComment);

gamesRouter.patch('/:id', gameExists, updateGame);

gamesRouter.delete('/:id', gameExists, deleteGame);

module.exports = { gamesRouter };