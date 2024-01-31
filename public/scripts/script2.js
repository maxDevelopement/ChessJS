//import $ from 'jquery';
let chessBoardArray = [[], [], [], [], [], [], [], []]; // les cases du plateau
let piecesOnBoard = []; // objets chessPiece qui se trouve sur le plateau de jeau

class Player{
    constructor(username, color){
        
    }
}

class ChessPiece{
    constructor(xPosition, yPosition, color, grade = "none"){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.grade = grade;
        this._img = this.setImg(this.color);
    }
    get img(){
        return this._img;
    }
    set img(value){
        this.img = setImg(value);
    }
    setImg(value){
        console.log("value ", value)
        switch(value){
            case "black": {
              return `./img/black/${this.grade}.png`;
            }
            case "white": {
                return `./img/white/${this.grade}.png`;
            }
            case "none" : {
                return undefined;
            }
        }
    }
}
class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
    
}
class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "queen", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}
class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "rook", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}
class Bishop extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "bishop", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}
class Knight extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "knight", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}
class Pawn extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "pawn", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}

// mise a jour de l'affichage 
function updateGameImg(){
    console.log("array : ", chessBoardArray)
    piecesOnBoard.forEach((piece) => {        
        const coordX = piece.xPosition;
        const coordY = piece.yPosition;
        console.log("piece : ", piece, coordX, coordY)
        const chessCase = chessBoardArray[coordX][coordY];
        if(chessCase && piece.img){
            chessCase.style.backgroundImage = `url('${piece.img}')`;
            console.log(chessCase.style);
        }
    })
}

// creation du tableau de jeu vide
function createPlayBoard(){
    for(let x = 0; x <= 7; x++){
        console.log("x")
        let line = document.createElement("div");
        chessBoard.appendChild(line);
        for(let y = 0; y <= 7; y++){
            console.log("y")
            line.className = "line";
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
    const oneCase = document.createElement("div");
    line.appendChild(oneCase);
    oneCase.className = color;
    return oneCase;
}

/*
// au click d'une case
for(let x = 0; x < 7; x++){
    for(let y = 0; y < 7; y++){
        const chessCase = chessBoardArray[x][y];
        chessCase.addEventListener('click', () => {

        })
    }
}
*/
addEventListener("load", (event) => {
    startNewGame();
    updateGameImg();
});

// tout effacer et recommencer une partie 
function startNewGame(){
    piecesOnBoard = [];
    $('chessBoard').innerHTML = '';
    createPlayBoard();
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
    let whiteRook = new Rook(7, 0, "white");
    let whiteSecondRook = new Rook(7, 7, "white");
    let whiteBishop = new Bishop(7, 2, "white");
    let whiteSecondBishop = new Bishop(7, 5, "white");
    let whiteKnight = new Knight(7, 1, "white");
    let whiteSecondKnight = new Knight(7, 6, "white");
    let whitePawn1 = new Pawn(6, 0, "white");
    let whitePawn2 = new Pawn(6, 1, "white");
    let whitePawn3 = new Pawn(6, 2, "white");
    let whitePawn4 = new Pawn(6, 3, "white");
    let whitePawn5 = new Pawn(6, 4, "white");
    let whitePawn6 = new Pawn(6, 5, "white");
    let whitePawn7 = new Pawn(6, 6, "white");
    let whitePawn8 = new Pawn(6, 7, "white");

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
        blackPawn8,
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
    );
}