const { sequelize } = require('./sequelize')
//const Users = require('../models/users')
//const Game = require('../models/games')
//const UsersAsGame = require('../models/usersAsGame')

async function initDb(){
    try{
        await sequelize.authenticate()
        console.log("connexion to db successfull")
    }catch(error){
        console.log("unable to connect the db : ", error)
    }
}

module.exports = initDb