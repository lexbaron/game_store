const express = require('express');

const { createConsole,
    deleteConsole,
    getAllConsole,
    updateConsole,
    createConsoleGameRelation } = require('../controllers/consoles.controller');
const { protectSession } = require('../middlewares/auth.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');
const { createConsoleValidator } = require('../middlewares/validators.middleware')

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsole);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsoleValidator, createConsole);

consolesRouter.post('/games-in-consoles', createConsoleGameRelation);

consolesRouter.patch('/:id',consoleExists, updateConsole);

consolesRouter.delete('/id:',consoleExists, deleteConsole);

module.exports = { consolesRouter };