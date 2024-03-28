import getAllGamesRequest from "./requests/getAllGamesRequest.js"
import User from "../publicClasses/user.js"
import UserInGame from "../publicClasses/userInGame.js"
//----------------------------------------------------------------------------
// déclaration des variables
//----------------------------------------------------------------------------
const chessBoardContainer = $('#chessBoardContainer')
const btCancelChessBoard = $('#btCancelChessBoard')
const btStartNewGame = $('#btStartNewGame')
let chessBoardArray = [[], [], [], [], [], [], [], []]; // les cases du plateau
let piecesOnBoard = []; // objets chessPiece qui se trouve sur le plateau de jeau
let clickActif = false;
let selectedPieceToMove
let colorTurn
let ws = undefined
let chessBoard = $('#chessboard')
const isOpponentConnected = $('#isOpponentConnected')

//----------------------------------------------------------------------------
// evenements
//----------------------------------------------------------------------------

btCancelChessBoard.on('click', () => {
    if(ws && ws.readyState === WebSocket.OPEN){
        ws.close()
    }
})

async function getUser(){
    const stockedUser = JSON.parse(sessionStorage.getItem("user"))
    if(!stockedUser){
        return false
    }
    const allGames = (await getAllGamesRequest(stockedUser.idUser)).allGames
    const actualUser = new User(stockedUser.idUser, stockedUser.username, allGames, stockedUser.actualGame)
    if(actualUser.actualGame){
        const actualGame = new UserInGame(stockedUser.idUser, stockedUser.actualGame.idGame, stockedUser.actualGame.actualArray, stockedUser.actualGame.myColor, stockedUser.actualGame.opponentUsername, stockedUser.actualGame.colorTurn)
        actualUser.actualGame = actualGame
    }  
    return actualUser
}

function selectPiece(x, y){
    const piece = piecesOnBoard.find(piece => piece.xPosition === x && piece.yPosition === y);
    if(piece){
        return piece;
    }
}

async function clickCase(){
    const user = await getUser()
    const actualGame = user.actualGame
    // au click d'une case
    for(let x = 0; x <= 7; x++){
        for(let y = 0; y <= 7; y++){
            const chessCase = chessBoardArray[x][y]
            chessCase.on('click', async() => {
                const selectedPiece = selectPiece(x, y)
                if(clickActif === false && selectedPiece){
                    if(selectedPiece.color === actualGame.myColor && actualGame.myColor === colorTurn){
                        selectedPieceToMove = selectedPiece
                        showPossiblesMoves(selectedPiece.possiblesMoves)
                        if(selectedPiece.possiblesMoves.length > 0){
                            clickActif = true
                        }
                    }else if(selectedPiece.color !== actualGame.myColor){
                    }
                }else if(clickActif === true){
                    const isDeplacementValid = selectedPieceToMove.possiblesMoves.find((caseItem) => caseItem.x === selectedPiece.xPosition && caseItem.y === selectedPiece.yPosition)
                    if(!isDeplacementValid){
                        selectedPieceToMove = null
                        cleanMovements()
                        clickActif = false
                        return
                    }else if(isDeplacementValid){
                        const user = await getUser()
                        const actualGame = user.actualGame
                        let sourceCase = selectedPieceToMove
                        let destinationCase = selectedPiece
                        destinationCase.color = sourceCase.color
                        destinationCase.grade = sourceCase.grade
                        sourceCase.color = 'none'
                        sourceCase.grade = 'empty'
                        sendPieceMovingMessage(piecesOnBoard, actualGame.idGame, colorTurn)
                        cleanMovements()
                        clickActif = false
                    }
                }
            })
        }
    }    
}

 $(document).on('chessBoardInsertion', async () => {
    chessBoardArray = [[], [], [], [], [], [], [], []]
    if(chessBoard){
        chessBoard.remove()
    }
    chessBoard = $('<div>', {
        id: 'chessBoard'
    })
    chessBoardContainer.append(chessBoard)
    const user = await getUser()
    const actualGame = user.actualGame
    const playBoard = actualGame.actualArray
    piecesOnBoard = playBoard
    colorTurn = actualGame.colorTurn
    await createPlayBoard()
    clickCase()
    updateGameImg()
    socketConnect().then(() => {
        sendConnexionMessage(actualGame.idUser, actualGame.myColor, actualGame.idGame)
    })
 })

//----------------------------------------------------------------------------
// fonctions
//----------------------------------------------------------------------------

// mise a jour de l'affichage 
function updateGameImg(){
    piecesOnBoard.forEach((piece) => {  
        const coordX = piece.xPosition;
        const coordY = piece.yPosition;
        const chessCase = chessBoardArray[coordX][coordY];
        if(chessCase && piece._img){
            chessCase.css({
                'backgroundImage': `url('${piece._img}')`
            })
        }
    })
}

function showPossiblesMoves(arrayOfPossiblesMoves){
    arrayOfPossiblesMoves.forEach((move) => {
        let possibleMove = chessBoardArray[move.x][move.y]
        possibleMove.css({
            "backgroundColor": "red"
        })
    })
}

function cleanMovements(){
    const blackCases = Array.from($('.black'))
    const whiteCases = Array.from($('.white'))
    blackCases.forEach((caseItem) => {
        caseItem.style.backgroundColor = "black"
    })
    whiteCases.forEach((caseItem) => {
        caseItem.style.backgroundColor = "white"
    });
}

// creation du tableau de jeu vide
function createPlayBoard(){
    for(let x = 0; x <= 7; x++){
        let line = $('<div>', {
            class: 'line'
        });
        chessBoard.append(line);
        for(let y = 0; y <= 7; y++){
            let newCase;
            if(x % 2 === 0){
                if(y % 2 !== 0){
                    newCase = createCase(line, "black");
                }else{                                       
                    newCase = createCase(line, "white");                   
                }
                chessBoardArray[x].push(newCase);
            }else{
                if(y % 2 === 0){                    
                    newCase = createCase(line, "black");
                }else{                       
                    newCase = createCase(line, "white");             
                }
                chessBoardArray[x].push(newCase);
            }          
        }
    }
}
function createCase(line, color){
    const oneCase = $('<div>', {
        class: color
    });
    line.append(oneCase);
    return oneCase;
}

// ------------------------------------------------------------
// WEB SOCKET
// ------------------------------------------------------------

export default function socketConnect(){
    return new Promise((resolve, reject) => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
            ws =  new WebSocket(`ws://127.0.0.1:7071`)
            ws.onopen = () => {
                isOpponentConnected.css({'display': 'block'})
                resolve()
            }
            ws.onmessage = async(event) => {
                const data = JSON.parse(event.data)
                if(data.type === 'connexion' || data.type === 'disconnexion'){
                    if(data.playerConnected === 2){ isOpponentConnected.css({ 'backgroundColor': 'green' })
                    }else{ isOpponentConnected.css({ 'backgroundColor': 'red' })} 
                }
                if(data.type === 'pieceMoving'){
                    colorTurn = data.colorTurn
                    piecesOnBoard = data.playboard
                    updateGameImg()
                    const myUserColor = (await getUser())
                } 
                clickActif = false
            }         
        }else{
            resolve()
        }
    })
}
function sendConnexionMessage(idUser, color, idGame){ // 'sendMessage'
    const data = {
        type: 'connexion',
        player: {
            idUser: idUser,
            color: color
        },            
        game: idGame
    }
    if(ws && ws.readyState === WebSocket.OPEN){
        ws.send(JSON.stringify(data));
    }else{
    }
}
function sendPieceMovingMessage(playboard, idGame, colorTurn){ // 'sendMessage'
    const data = {
        type: 'pieceMoving',
        game: idGame,
        playboard: playboard,
        colorTurn: colorTurn
    }
    if(ws && ws.readyState === WebSocket.OPEN){
        ws.send(JSON.stringify(data));
    }
} 