const { Op } = require('sequelize')
const UsersAsGame = require('../models/usersAsGame')
const User = require('../models/users')

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
            const gameData = game.dataValues
            const getOpponentUsername = await User.findOne({where: { idUser : gameData.fkUser2}})
            if(!getOpponentUsername){
                return
            }
            gameData.opponentUsername = getOpponentUsername.dataValues.username
            // rajouter le code qui va chercher les data JSON 
            return gameData
        }))
        //console.log("data to return : ", allGames)
        return res.json({allGames: allGames})
    })
}