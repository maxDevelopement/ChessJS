const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Game = sequelize.define('game', {
    idGame: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'game',
    createdAt: false,
    updatedAt: false
})
module.exports = Game