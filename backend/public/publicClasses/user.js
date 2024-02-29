import createNewGameRequest from "../scripts/requests/createNewGameRequest.js"
//import createNewGameRequest from "../scripts/requests/createNewGameRequest"
export default class User{
    constructor(idUser, username){
        this.idUser = idUser,
        this.username = username,
        this.allGamesNotFinished = []
        this.actualGame
    }
    // remplir allGamesNotFinished array
    async createNewGame(idOpponent, colorCreator){
        const newGame = await createNewGameRequest(this.idUser, idOpponent, colorCreator)
        console.log("newgame : ", newGame)
        // RAJOUTER DANS ALLGAMESNOTFINISHED
        this.actualGame = newGame
        return newGame
    }
}