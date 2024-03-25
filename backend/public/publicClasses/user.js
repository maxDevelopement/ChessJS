import createNewGameRequest from "../scripts/requests/createNewGameRequest.js"

export default class User{
    constructor(idUser, username, allGames, actualGame){
        this.idUser = idUser,
        this.username = username,
        this.allGames = allGames || []
        this.actualGame = actualGame || []
    }
    // remplir allGamesNotFinished array
    async createNewGame(idOpponent, colorCreator){
        const newGame = await createNewGameRequest(this.idUser, idOpponent, colorCreator)
        console.log("newgame : ", newGame)
        // RAJOUTER DANS ALLGAMESNOTFINISHED
        this.actualGame = newGame
        return newGame
    }
    async startNewGame(){
        
    }
}