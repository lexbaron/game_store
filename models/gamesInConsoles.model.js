const { DataTypes, database } = require('../utils/database.util')

const { Game } = require('./game.model');
const { Console } = require('./console.model');

const GamesInConsoles = database.define('games_in_consoles', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gameId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Game,
            key: 'id'
        }
    },
    consoleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Console,
            key: 'id'
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { GamesInConsoles };