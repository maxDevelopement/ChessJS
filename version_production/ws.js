const WebSocket = require('ws')
const UserAsGame = require('./models/usersAsGame')
const { updatePlayboard, backupPlayboard, saveColorTurn } = require('./routes/playBoardGestion')
require('dotenv').config()
const port = process.env.WS_PORT
module.exports = function setupWsServer(app){
    const wss = new WebSocket.Server({ port: port})
    const clients = new Map()
    
    const games = []
    const players = []
    // chaque client ws qui se connecte se voit stocké avec un id
    wss.on('connection', (ws) => {
        //ws.send({type: "connexion established"})
        ws.on('message', async (data) => {            
            const clientData = JSON.parse(data)   
            ////console.log("clientdata : ", clientData)
            const idGame = clientData.game  
            switch(clientData.type){
                case 'connexion': { 
                    const user = {
                        ws: ws,
                        idUser: clientData.player.idUser,       
                        color: clientData.player.color
                    } 
                    players.push(user)
                    const colorTurnReq = (await UserAsGame.findOne({where: { fkGame: idGame }}))
                    let colorTurn = null
                    if(colorTurnReq){
                        colorTurn = colorTurnReq.dataValues.colorTurn
                    }                    
                    let gameExist = games.find((game) => game.idGame === idGame)
                    if(!gameExist){
                        gameExist = {
                            idGame: idGame,
                            players: []
                        }
                        games.push(gameExist)
                    }
                    gameExist.players.push(user)
                    const dataToRespond = {
                        type: "connexion",
                        playerConnected: gameExist.players.length,
                        colorTurn: colorTurn
                    }      
                    responseToPlayers(gameExist.players, dataToRespond)
                    break
                }
                case 'pieceMoving': {
                    //console.log('pieceMoving')
                    const playboard = clientData.playboard
                    const updatedPlayboard = updatePlayboard(playboard)
                    let colorTurn = clientData.colorTurn
                    if(colorTurn === 'black'){
                        colorTurn = 'white'
                    }else if(colorTurn === 'white'){
                        colorTurn = 'black'
                    }
                    const dataToRespond = {
                        type: 'pieceMoving',
                        playboard: updatedPlayboard,
                        colorTurn: colorTurn
                    }
                    const theGame = games.find((game) => game.idGame === idGame)
                    //console.log("idGame : ", idGame, ", the game : ", theGame)
                    const playersToRespond = theGame.players
                    await saveColorTurn(idGame, colorTurn)
                    await backupPlayboard(updatedPlayboard, idGame)
                    responseToPlayers(playersToRespond, dataToRespond)  
                    break 
                }
            }    
        })                                                      
        ws.onclose = () => {
            const userWs = ws
            let locateGame = games.find((game) => { 
                const playerIndex = game.players.findIndex(player => player.ws === userWs)
                if(playerIndex !== -1){
                    game.players.splice(playerIndex, 1)
                }
                responseToPlayers(game.players, {type: 'disconnexion', playerConnected: 1})
            })
            //console.log("locatedGame : ", locateGame)
            clients.delete(ws)
        }       
    })
}

function responseToPlayers(players, data){
    players.forEach((player) => {
        const ws = player.ws
        ws.send(JSON.stringify(data))
    })    
}