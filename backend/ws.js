const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map()

const games = {}
const players = {}
// chaque client ws qui se connecte se voit stocké avec un id
wss.on('connection', (ws) => {
    console.log("connexion to socket : ");
/*
    const channel = 'public'
    if(!channels[channel]){
        channels[channel] = []
    }
    channels[channel].push(ws)
*/
    ws.on('message', (data) => {  
        //const metadata = clients.get(ws)      
        const clientData = JSON.parse(data)     
        console.log("reception de message : ", clientData.type)
        //removeClientFromAllChannels(ws)
        switch(clientData.type){
            case 'connexion': {     
                console.log("checkConnexion : ", clientData.conversationId)
                channels[channel].push(ws)
                const message = "new_connexion"
                broadcast(channel, message)
                break
            }
        }
        /*
        const clientMessage = {
            username: clientData.username,
            message: clientData.message 
        }        
        console.log("data : ", clientData) 

        if(clientData.canal){
            if(!channels[clientData.canal]){
                channels[clientData.canal] = []
            }
            removeClientFromAllChannels(ws)
            channels[clientData.canal].push(ws)
            broadcast(channels[clientData.canal], clientMessage)
        }
                     
        const outbound = JSON.stringify(clientMessage)  

        if(clientData.canal === 'public'){}        
        for (const client of clients.keys()) {              
            client.send(outbound);                          
        }  */                                    
    })                          
    ws.on('close', () => {
        console.log("socket closed")
        clients.delete(ws)
    })
})