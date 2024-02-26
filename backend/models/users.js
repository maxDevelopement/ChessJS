const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Users = sequelize.define('users', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt: false
})
module.exports = Users