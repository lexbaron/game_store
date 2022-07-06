const express = require('express');
const rateLimit = require('express-rate-limit');

const { AppError } = require('./utils/appError.util');
const { globalErrorHandler } = require('./controllers/error.controller')

const { usersRouter } = require('./routes/users.routes');
const { consolesRouter } = require('./routes/consoles.routes');
const { gamesRouter } = require('./routes/games.routes')

const app = express();

app.use(express.json());

const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 1000,
	message: 'Number of requests have been exceeded',
});

app.use(limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter)
app.use('/api/v1/consoles', consolesRouter);

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use( globalErrorHandler );

module.exports = { app };