const { app } = require('./app');

const { database } = require('./utils/database.util');

const { Console } = require('./models/console.model');
const { Game } = require('./models/game.model');
const { User } = require('./models/user.model');

database.authenticate()
    .then(console.log('database authenticated'))
    .catch(err => console.log(err));

User.belongsToMany(Game, {through: 'review'});
Game.belongsToMany(User, {through: 'review'});

Game.belongsToMany(Console, {through: 'games_in_consoles'});
Console.belongsToMany(Game, {through: 'games_in_consoles'});

database.sync()
    .then(console.log('database synced'))
    .catch(err => console.log(err));


app.listen(7000, () =>{
    console.log('server is running on port 7000')
});