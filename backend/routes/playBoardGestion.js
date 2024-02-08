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

    let blackKing = new King(0, 4, "black");
    let blackQueen = new Queen(0, 3, "black");
    let blackRook = new Rook(0, 0, "black");
    let blackSecondRook = new Rook(0, 7, "black");
    let blackBishop = new Bishop(0, 2, "black");
    let blackSecondBishop = new Bishop(0, 5, "black");
    let blackKnight = new Knight(0, 1, "black");
    let blackSecondKnight = new Knight(0, 6, "black");
    let blackPawn1 = new Pawn(1, 0, "black");
    let blackPawn2 = new Pawn(1, 1, "black");
    let blackPawn3 = new Pawn(1, 2, "black");
    let blackPawn4 = new Pawn(1, 3, "black");
    let blackPawn5 = new Pawn(1, 4, "black");
    let blackPawn6 = new Pawn(1, 5, "black");
    let blackPawn7 = new Pawn(1, 6, "black");
    let blackPawn8 = new Pawn(1, 7, "black");

    let whiteKing = new King(7, 4, "white");
    let whiteQueen = new Queen(7, 3, "white");
    let whiteBishop = new Bishop(7, 2, "white");
    let whiteSecondBishop = new Bishop(7, 5, "white");
    let whiteRook = new Rook(7, 0, "white");
    let whiteSecondRook = new Rook(7, 7, "white");
    let whiteKnight = new Knight(7, 1, "white");
    let whiteSecondKnight = new Knight(7, 6, "white");
    let whitePawn1 = new Pawn(6, 0, "white");
    let whitePawn2 = new Pawn(6, 1, "white");
    let whitePawn3 = new Pawn(6, 2, "white");
    let whitePawn4 = new Pawn(6, 3, "white");
    //let whitePawn5 = new Pawn(6, 4, "white");
    let invisible = new Empty(6, 4, "none")
    let whitePawn6 = new Pawn(6, 5, "white");
    let whitePawn7 = new Pawn(6, 6, "white");
    let whitePawn8 = new Pawn(6, 7, "white");

actualBoard.push( 
    whiteKing, 
    whiteQueen, 
    whiteRook, 
    whiteSecondRook, 
    whiteBishop, 
    whiteSecondBishop, 
    whiteKnight,
    whiteSecondKnight, 
    whitePawn1,
    whitePawn2,
    whitePawn3,
    whitePawn4,
    invisible,
    whitePawn6,
    whitePawn7,
    whitePawn8 
)
    for(let y = 0; y < 8; y++){
        let empty1 = new Empty(2, y, "none")
        let empty2 = new Empty(3, y, "none")
        let empty3 = new Empty(4, y, "none")
        let empty4 = new Empty(5, y, "none")
        actualBoard.push(empty1, empty2, empty3, empty4)
        finalBoardToSend.push(empty1, empty2, empty3, empty4)
    }
    whiteKing.calculMove(actualBoard);
    whiteQueen.calculMove();
    whiteBishop.calculMove();
    whiteSecondBishop.calculMove();
    whiteRook.calculMove();
    whiteSecondRook.calculMove();
    whiteKnight.calculMove();    
    whiteSecondKnight.calculMove();
    finalBoardToSend.push(
        whiteKing, 
        whiteQueen, 
        whiteBishop, 
        whiteSecondBishop, 
        whiteRook, 
        whiteSecondRook, 
        whiteKnight, 
        whiteSecondKnight,
        whitePawn1,
        whitePawn2,
        whitePawn3,
        whitePawn4,
        invisible,
        whitePawn6,
        whitePawn7,
        whitePawn8 );

/*    
    
    let whiteBishop = new Bishop(7, 2, "white");
    let whiteSecondBishop = new Bishop(7, 5, "white");
    

    piecesOnBoard.push( 
        blackKing, 
        blackQueen, 
        blackRook, 
        blackSecondRook, 
        blackBishop, 
        blackSecondBishop, 
        blackKnight,
        blackSecondKnight, 
        blackPawn1,
        blackPawn2,
        blackPawn3,
        blackPawn4,
        blackPawn5,
        blackPawn6,
        blackPawn7,
        blackPawn8 
        whiteKing,
        whiteQueen, 
        whiteRook, 
        whiteSecondRook, 
        whiteBishop, 
        whiteSecondBishop, 
        whiteKnight,
        whiteSecondKnight, 
        whitePawn1,
        whitePawn2,
        whitePawn3,
        whitePawn4,
        whitePawn5,
        whitePawn6,
        whitePawn7,
        whitePawn8,
    )*/
    return finalBoardToSend
}

module.exports = startNewGame 