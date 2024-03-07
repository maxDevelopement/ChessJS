import getAllGamesRequest from "./requests/getAllGamesRequest.js"
import User from "../publicClasses/user.js"
import UserInGame from "../publicClasses/userInGame.js"
//----------------------------------------------------------------------------
// déclaration des variables
//----------------------------------------------------------------------------
const chessBoardContainer = $('#chessBoardContainer')

const btStartNewGame = $('#btStartNewGame')
let chessBoardArray = [[], [], [], [], [], [], [], []]; // les cases du plateau
let piecesOnBoard = []; // objets chessPiece qui se trouve sur le plateau de jeau
let clickActif = false;
let ws = undefined
let chessBoard = $('#chessboard')

//----------------------------------------------------------------------------
// evenements
//----------------------------------------------------------------------------
async function getUser(){
    const stockedUser = JSON.parse(sessionStorage.getItem("user"))
    if(!stockedUser){
        return false
    }
    console.log("check user : ", stockedUser)
    const allGames = (await getAllGamesRequest(stockedUser.idUser)).allGames
    const actualUser = new User(stockedUser.idUser, stockedUser.username, allGames)
    const actualGame = new UserInGame(stockedUser.idUser, stockedUser.actualGame.idGame, stockedUser.actualGame.actualArray, stockedUser.actualGame.myColor, stockedUser.actualGame.opponentUsername)
    actualUser.actualGame = actualGame
    //console.log("user au cick : ", actualUser)
    return actualUser
}

async function clickCase(){
    const user = await getUser()
    const actualGame = user.actualGame
    // au click d'une case
    for(let x = 0; x <= 7; x++){
        for(let y = 0; y <= 7; y++){
            const chessCase = chessBoardArray[x][y]
            //console.log("click chesscase : ", chessCase)
            chessCase.on('click', () => {
                if(clickActif === false){
                    console.log("clickActif : ", clickActif, ", myColor : ", actualGame.myColor)
                    console.log(x, y)
                    const selectedPiece = selectPiece(x, y)
                    if(selectedPiece && selectedPiece.color === actualGame.myColor){
                        //console.log("moves possibles de la piece : ", selectedPiece.possiblesMoves)
                        showPossiblesMoves(selectedPiece.possiblesMoves)
                        if(selectedPiece.possiblesMoves.length > 0){
                            clickActif = true;
                        }
                    }else if(selectedPiece.color !== actualGame.myColor){
                        console.log("mauvaise couleur")
                    }
                }
                else{
                    cleanMovements();
                    clickActif = false;
                }
            })
        }
    }    
}

btStartNewGame.on('click', () => {
    startNewGame("black", "max2");
 })

 $(document).on('chessBoardInsertion', async () => {
    chessBoard = $('<div>', {
        id: chessBoard
    })
    chessBoardContainer.append(chessBoard)
    console.log("connexion to socket")
    socketConnect()
    const user = await getUser()
    createPlayBoard();
    clickCase();
    const playBoard = user.actualGame.actualArray
    //console.log("resultat playboard : ", playBoard);
    piecesOnBoard = playBoard;
    updateGameImg();
 })
//----------------------------------------------------------------------------
// requêtes fetch
//----------------------------------------------------------------------------

async function startNewGame(playerColor, opponent){
    console.log("start new game !")
    const request = await fetch(`http://10.229.32.215:3000/api/startNewGame?playerColor=${playerColor}&playerOpponent=${opponent}`, {
    method: 'Get',
    headers: {
        'Content-Type': 'application/json'
    }
   }) 
   if(request.ok){
        console.log("request ok")
        createPlayBoard();
        clickCase();
        const playBoard = await request.json()
        //console.log("resultat playboard : ", playBoard);
        piecesOnBoard = playBoard.playBoard;
        updateGameImg();
   }
}

//----------------------------------------------------------------------------
// fonctions
//----------------------------------------------------------------------------

// mise a jour de l'affichage 
function updateGameImg(){
    console.log("array : ", chessBoardArray)
    piecesOnBoard.forEach((piece) => {  
        //console.log("piece : ", piece)      
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
    console.log(chessBoardArray)
    arrayOfPossiblesMoves.forEach((move) => {
        //console.log(move.x, move.y)
        let possibleMove = chessBoardArray[move.x][move.y]
        //console.log(possibleMove)
        possibleMove.css({
            "backgroundColor": "red"
        })
    })
}

function cleanMovements(){
    console.log("clean moves !")
    const blackCases = Array.from($('.black'));
    const whiteCases = Array.from($('.white'));
    //console.log(blackCases, whiteCases)
    blackCases.forEach((caseItem) => {
        caseItem.style.backgroundColor = "black";
    })
    whiteCases.forEach((caseItem) => {
        caseItem.style.backgroundColor = "white";
    });
}

// creation du tableau de jeu vide
function createPlayBoard(){
    console.log("createPlayBoard")
    for(let x = 0; x <= 7; x++){
        //console.log("x")
        let line = $('<div>', {
            class: 'line'
        });
        chessBoard.append(line);
        for(let y = 0; y <= 7; y++){
            //console.log("y")
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
function selectPiece(x, y){
    const piece = piecesOnBoard.filter(piece => piece.xPosition === x && piece.yPosition === y);
    if(piece[0]){
        //console.log(piece[0])
        return piece[0];
    }
}

// ------------------------------------------------------------
// WEB SOCKET
// ------------------------------------------------------------

export default function socketConnect(){
    console.log("socket co")
    if (!ws || ws.readyState === WebSocket.CLOSED) {
        console.log("1erconnexion")
        try{
            ws =  new WebSocket(`ws://localhost:7071`)
        }catch(error){
            console.log(error)
        }
        ws.onopen = () => {
            console.log("connected to socket !")
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if(data.type === "connexionMessage"){
                
            }
            if(data.type === "sendMessage"){

            }   
        } 
    }
    function sendMessage(type){ // 'sendMessage'
        const data = {
            sender: sessionStorage.getItem("username"),
            message: userMessage.value,
            conversationId: sessionStorage.getItem("actualConversation")
        }
        console.log(data.conversationId)
        if(ws){
            ws.send(JSON.stringify({type: type, sender: data.sourceUsername, message: data.message, conversationId: data.conversationId}));
        }
    } 
}

function sendMessage(type){ // 'sendMessage'
    const data = {
        sender: sessionStorage.getItem("username"),
        message: userMessage.value,
        conversationId: sessionStorage.getItem("actualConversation")
    }
    console.log(data.conversationId)
    if(ws){
        ws.send(JSON.stringify({type: type, sender: data.sourceUsername, message: data.message, conversationId: data.conversationId}));
    }
} 