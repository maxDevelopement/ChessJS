const path = require('path')
const fs = require('fs')
const Game = require('../models/games')
const UserAsGame = require('../models/usersAsGame')

module.exports = (app) => {
    app.post('/api/createNewGame', async function (req, res){
        console.log("enter create game, body : ", req.body)
        // recupération des données et affectation des couleurs
        const user1 = req.body.user1 // createur de la partie
        const user2 = req.body.user2
        const user1Color = req.body.colorCreator
        let user2Color
        if(user1Color === 'white'){
            user2Color = 'black'
        }else if(user1Color === 'black'){
            user2Color = 'white'
        }    
        // CREATION DU FICHIER
        console.log("actual repertoire : ", path.join(__dirname, 'gamesFiles'))
        const timestamp = Date.now()
        const file = `${user1}_${timestamp}.json`
        const folderUrl = path.join(__dirname, 'gamesFiles')
        const fileUrl = path.join(folderUrl, file)
        const urlToDb = `gamesFiles/${file}`
        if(!fs.existsSync(fileUrl)){
            console.log("here")
            fs.writeFileSync(fileUrl, "") // rajouter tableau de jeux complet
        }
        console.log("creation du fichier successfull : ", fileUrl)
        // CREATION NOUVEAU RECORD TABLE "GAME"
        const newGame = await Game.create({
            url: urlToDb
        })
        console.log("newGame : ", newGame.dataValues)
        const idNewGame = newGame.dataValues.idGame
        if(idNewGame){
            console.log("data : ", user1, " , ", user2, " , ", idNewGame, " , ", user1Color, " , ", user2Color)
            const createUserAsGame = await UserAsGame.create({
                fkUser1: user1,
                fkUser2: user2,
                fkGame: idNewGame,
                user1Color: user1Color,
                user2Color: user2Color,
                finished: false
            })
            console.log("UserAsGame : ", createUserAsGame.dataValues)
            return res.json({done: true, data: createUserAsGame.dataValues})
        }
    })
}