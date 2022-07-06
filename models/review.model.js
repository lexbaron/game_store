const { DataTypes, database } = require('../utils/database.util');

const { Game } = require('./game.model');
const { User } = require('./user.model');

const Review = database.define('review',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id'
        }
    },
    gameId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Game,
            key: 'id'
        }
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Review };