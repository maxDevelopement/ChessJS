const path = require('path')
const fs = require('fs')
const Game = require('../models/games')
const UserAsGame = require('../models/usersAsGame')

const { King } = require('../classes/king')
const { Queen } = require('../classes/queen')
const { Rook } = require('../classes/rook')
const { Bishop } = require('../classes/bishop')
const { Knight } = require('../classes/knight')
const { Pawn } = require('../classes/pawn')
const { Empty } = require("../classes/empty")

// tout effacer et recommencer une partie 
function startNewGame(){
    let actualBoard = [];
    let finalBoardToSend = [];

    for(let y = 0; y < 8; y++){
        let empty2 = new Empty(2, y, "none")
        let empty3 = new Empty(3, y, "none")
        let empty4 = new Empty(4, y, "none")
        let empty5 = new Empty(5, y, "none")

        actualBoard.push(empty2, empty3, empty4, empty5)
        finalBoardToSend.push(empty2, empty3, empty4, empty5)
    }

    let whiteRook = new Rook(7, 0, "white");
    let whiteKnight = new Knight(7, 1, "white");
    let whiteBishop = new Bishop(7, 2, "white");
    let whiteQueen = new Queen(7, 3, "white");  
    let whiteKing = new King(7, 4, "white");
    let whiteSecondBishop = new Bishop(7, 5, "white");
    let whiteSecondKnight = new Knight(7, 6, "white");
    let whiteSecondRook = new Rook(7, 7, "white");   
    let whitePawn1 = new Pawn(6, 0, "white");
    let whitePawn2 = new Pawn(6, 1, "white");
    let whitePawn3 = new Pawn(6, 2, "white");
    let whitePawn4 = new Pawn(6, 3, "white");
    let whitePawn5 = new Pawn(6, 4, "white")
    let whitePawn6 = new Pawn(6, 5, "white");
    let whitePawn7 = new Pawn(6, 6, "white");
    let whitePawn8 = new Pawn(6, 7, "white");

    actualBoard.push(
        whiteRook, 
        whiteBishop, 
        whiteKnight,
        whiteQueen,
        whiteKing,   
        whiteSecondBishop, 
        whiteSecondKnight,
        whiteSecondRook,
        whitePawn1,
        whitePawn2,
        whitePawn3,
        whitePawn4,
        whitePawn5,
        whitePawn6,
        whitePawn7,
        whitePawn8,
    )
    let blackRook = new Rook(0, 0, "black");
    let blackKnight = new Knight(0, 1, "black");
    let blackBishop = new Bishop(0, 2, "black");
    let blackQueen = new Queen(0, 3, "black");  
    let blackKing = new King(0, 4, "black");
    let blackSecondBishop = new Bishop(0, 5, "black");
    let blackSecondKnight = new Knight(0, 6, "black");
    let blackSecondRook = new Rook(0, 7, "black");   
    let blackPawn1 = new Pawn(1, 0, "black");
    let blackPawn2 = new Pawn(1, 1, "black");
    let blackPawn3 = new Pawn(1, 2, "black");
    let blackPawn4 = new Pawn(1, 3, "black");
    let blackPawn5 = new Pawn(1, 4, "black");
    let blackPawn6 = new Pawn(1, 5, "black");
    let blackPawn7 = new Pawn(1, 6, "black");
    let blackPawn8 = new Pawn(1, 7, "black");
    actualBoard.push(    
        blackRook, 
        blackBishop, 
        blackKnight,
        blackQueen, 
        blackKing,  
        blackSecondBishop, 
        blackSecondKnight,
        blackSecondRook,
        blackPawn1,
        blackPawn2,
        blackPawn3,
        blackPawn4,
        blackPawn5,
        blackPawn6,
        blackPawn7,
        blackPawn8
    )

    whiteQueen.calculMove(actualBoard);
    whiteBishop.calculMove(actualBoard);
    whiteSecondBishop.calculMove(actualBoard);
    whiteRook.calculMove(actualBoard);
    whiteSecondRook.calculMove(actualBoard);
    whiteKnight.calculMove(actualBoard);    
    whiteSecondKnight.calculMove(actualBoard);
    whitePawn1.calculMove(actualBoard)
    whitePawn2.calculMove(actualBoard)
    whitePawn3.calculMove(actualBoard)
    whitePawn4.calculMove(actualBoard)
    whitePawn6.calculMove(actualBoard)
    whitePawn5.calculMove(actualBoard)
    whitePawn7.calculMove(actualBoard)

    blackQueen.calculMove(actualBoard);
    blackBishop.calculMove(actualBoard);
    blackSecondBishop.calculMove(actualBoard);
    blackRook.calculMove(actualBoard);
    blackSecondRook.calculMove(actualBoard);
    blackKnight.calculMove(actualBoard);    
    blackSecondKnight.calculMove(actualBoard);
    blackPawn1.calculMove(actualBoard)
    blackPawn2.calculMove(actualBoard)
    blackPawn3.calculMove(actualBoard)
    blackPawn4.calculMove(actualBoard)
    blackPawn6.calculMove(actualBoard)
    blackPawn5.calculMove(actualBoard)
    blackPawn7.calculMove(actualBoard)

    finalBoardToSend.push(
        whiteRook, 
        whiteBishop, 
        whiteKnight,        
        whiteQueen,  
        whiteSecondBishop, 
        whiteSecondKnight,
        whiteSecondRook,
        whitePawn1,
        whitePawn2,
        whitePawn3,
        whitePawn4,
        whitePawn5,
        whitePawn6,
        whitePawn7,
        whitePawn8,
        blackRook, 
        blackBishop, 
        blackKnight,
        blackQueen, 
        blackSecondBishop, 
        blackSecondKnight,
        blackSecondRook,
        blackPawn1,
        blackPawn2,
        blackPawn3,
        blackPawn4,
        blackPawn5,
        blackPawn6,
        blackPawn7,
        blackPawn8
    )
    whiteKing.calculMove(finalBoardToSend)
    blackKing.calculMove(finalBoardToSend)
    finalBoardToSend.push(whiteKing, blackKing)
    return finalBoardToSend
}


function updatePlayboard(oldPlayboard){
    let updatedPlayboard = []
    //console.log("old playboard : ", oldPlayboard[0], ", ", oldPlayboard[1]) // etc
    oldPlayboard.forEach((piece) => {
        const updatedPiece = replacePieceData(piece, oldPlayboard)
        updatedPlayboard.push(updatedPiece)
    })
    return updatedPlayboard
}
//     let whiteBishop = new Bishop(7, 2, "white");
function replacePieceData(piece, playboard){
    switch (piece.grade){
        case 'empty': {
                const empty = new Empty(piece.xPosition, piece.yPosition, "none")
                return empty
        }
        case 'king': {
            const king = new King(piece.xPosition, piece.yPosition, piece.color)
            king.calculMove(playboard)
            return king
        }
        case 'queen': {
            const queen = new Queen(piece.xPosition, piece.yPosition, piece.color)
            queen.calculMove(playboard)
            return queen
        }
        case 'rook': {
            const rook = new Rook(piece.xPosition, piece.yPosition, piece.color)
            rook.calculMove(playboard)
            return rook
        }
        case 'bishop': {
            const bishop = new Bishop(piece.xPosition, piece.yPosition, piece.color)
            bishop.calculMove(playboard)
            return bishop
        }
        case 'knight': {
            const knight = new Knight(piece.xPosition, piece.yPosition, piece.color)
            knight.calculMove(playboard)
            return knight
        }
        case 'pawn': {
            const pawn = new Pawn(piece.xPosition, piece.yPosition, piece.color)
            pawn.calculMove(playboard)
            return pawn
        }
    }
}

async function saveColorTurn(idGame, colorTurn){
    const game = await UserAsGame.findOne({where: {fkGame: idGame}})
    game.colorTurn = colorTurn
    game.save()
}

async function backupPlayboard(playboard, idGame){
    const fileUrl = (await Game.findOne({where: {idGame: idGame}})).dataValues.url 
    const txtContent = JSON.stringify(playboard)
    const url = path.join(__dirname, fileUrl)
    
    if(fs.existsSync(url)){
        fs.writeFileSync(url, txtContent)
    }
    console.log("playboard backuped !")
}

module.exports = { startNewGame, updatePlayboard, backupPlayboard, saveColorTurn }