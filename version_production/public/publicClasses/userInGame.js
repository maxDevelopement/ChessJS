export default class UserInGame{
    constructor(idUser, idGame, actualArray, userColor, opponentUsername, colorTurn){
        this.idUser = idUser,
        this.idGame = idGame,
        this.actualArray = actualArray,
        this.myColor = userColor,
        this.opponentUsername = opponentUsername,
        this.colorTurn = colorTurn
    }
}