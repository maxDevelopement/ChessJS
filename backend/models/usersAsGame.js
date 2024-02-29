const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const UsersAsGame = sequelize.define('userasgame', {
    idUserAsGame: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fkUser1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fkUser2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fkGame: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fkActualPlayer: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user1Color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user2Color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    winner: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    looser: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'userasgame',
    createdAt: true,
    updatedAt: false
})
module.exports = UsersAsGame