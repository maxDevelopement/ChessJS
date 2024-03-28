const { Op } = require('sequelize')
const path = require('path')
const UsersAsGame = require('../models/usersAsGame')
const User = require('../models/users')
const Game = require('../models/games')
const fsPromises = require('fs').promises

module.exports = (app) => {
    app.get('/api/getAllGamesOfUser', async function (req, res){
        const idUser = req.query.idUser
        const allGamesRequest = await UsersAsGame.findAll({
            where: {
                [Op.or]: [
                    { fkUser1: idUser },
                    { fkUser2: idUser }
                ]
            }
        })
        if(allGamesRequest.length === 0){
            return res.json({length: 0})
        }
        const allGames = await Promise.all(allGamesRequest.map(async (game) => {  
            const fileOfGame = (await Game.findOne({where: {idGame: game.fkGame}})).dataValues.url
            const url = path.join(__dirname, fileOfGame)
            const jsonContent = JSON.parse(await fsPromises.readFile(url))
            const gameData = {
                data: game.dataValues,
                array: jsonContent
            }
            const userData = await User.findOne({where: { idUser : gameData.data.fkUser2}})
            if(!userData){
                return
            }
            gameData.data.opponentUsername = userData.dataValues.username
            // rajouter le code qui va chercher les data JSON 
            return gameData
        }))
        return res.json({allGames: allGames})
    })
}