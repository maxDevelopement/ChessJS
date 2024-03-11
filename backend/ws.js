const WebSocket = require('ws')
const UserAsGame = require('./models/usersAsGame')
module.exports = function setupWsServer(app){
    const wss = new WebSocket.Server({ port: 7071 })
    const clients = new Map()
    
    const games = []
    const players = []
    // chaque client ws qui se connecte se voit stocké avec un id
    wss.on('connection', (ws) => {
        ws.send("connexion established")
        ws.on('message', async (data) => {            
            const clientData = JSON.parse(data)   
            console.log("clientdata : ", clientData)
            const idGame = clientData.game  
            //console.log("idGame : ", idGame, ", user : ", user)
            //removeClientFromAllChannels(ws)
            switch(clientData.type){
                case 'connexion': { 
                    const user = {
                        ws: ws,
                        idUser: clientData.player.idUser,       
                        color: clientData.player.color
                    } 
                    //console.log("games0 : ", games)   
                    players.push(user)
                    const colorTurnReq = (await UserAsGame.findOne({where: { fkGame: idGame }}))
                    let colorTurn = null
                    if(colorTurnReq){
                        colorTurn = colorTurnReq.dataValues.colorTurn
                    }                    
                    console.log("games0 : ", games)
                    let gameExist = games.find((game) => game.idGame === idGame)
                    console.log("Channel trouvée : ", gameExist)
                    if(!gameExist){
                        console.log("channel doesnt exist")
                        gameExist = {
                            idGame: idGame,
                            players: []
                        }
                        games.push(gameExist)
                        console.log("games1 (creation new channel): ", games)
                    }
                    console.log("tentative ajout user dans players : ", gameExist.players)
                    gameExist.players.push(user)
                    console.log("games2 : ", games)

                    const dataToRespond = {
                        type: "connexion",
                        playerConnected: gameExist.players.length,
                        colorTurn: colorTurn
                    }      
                    //console.log("players : ", game.players)
                    console.log("data to respond : ", dataToRespond)
                    responseToPlayers(gameExist.players, dataToRespond)
                    break
                }/*
                case 'disconnexion': {
                    const userId = clientData.player
                    let gameExist = games.find((game) => game.idGame === idGame)
                    let locateUserInGame = gameExist.players.find((user) => user.idUser === userId)
                    gameExist.players.remove(locateUserInGame)
                    const dataToRespond = {
                        type: "disconnexion",
                        playerConnected: 1,
                        colorTurn: colorTurn
                    }  
                    responseToPlayers(gameExist.players, dataToRespond)
                    break
                }*/
                case 'pieceMoving': {
                    console.log('pieceMoving')
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
                responseToPlayers(game.players, {playerConnected: 1})
            })
            console.log("locatedGame : ", locateGame)
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