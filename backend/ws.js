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
            const user = {
                ws: ws,
                idUser: clientData.player.idUser,       
                color: clientData.player.color
            }
            //console.log("idGame : ", idGame, ", user : ", user)
            //removeClientFromAllChannels(ws)
            switch(clientData.type){
                case 'connexion': {  
                    console.log("games0 : ", games)   
                    players.push(user)
                    const colorTurn = (await UserAsGame.findOne({where: { fkGame: idGame }})).dataValues.colorTurn
                    let game = games.filter((game) => game.idGame === idGame)
                    if(!game.idGame){
                        game = {
                            idGame: idGame,
                            players: []
                        }
                        games.push(game)
                        console.log("games1 : ", games)
                    }
                    console.log("games2 : ", games)
                    game.players.push(user)
                    const dataToRespond = {
                        type: "connexion",
                        playerConnected: game.length,
                        colorTurn: colorTurn
                    }
                    console.log("games3 : ", game.players.length)
                    responseToPlayers(game.players, dataToRespond)
                    break
                }
                case 'pieceMoving': {
                    console.log('pieceMoving')
                    break 
                }
            }    
        })                                                      
        ws.on('close', () => {
            console.log("socket closed")
            clients.delete(ws)
        })        
    })
}

function responseToPlayers(players, data){
    players.forEach((player) => {
        const ws = player.ws
        ws.send(JSON.stringify(data))
    })    
}