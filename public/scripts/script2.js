class Player{
    constructor(username, color){
        
    }
}

class ChessPiece{
    constructor(xPosition, yPosition, color){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.grade = "none";
    }
}
class King extends ChessPiece{
    constructor(xPosition, yPosition, color){
        super(xPosition, yPosition, color, grade = "king");
    }
}
class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color){
        super(xPosition, yPosition, color, grade = "queen");
    }
}
class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color){
        super(xPosition, yPosition, color, grade = "queen");
    }
}

// creation du tableau de jeu vide
function createPlayBoard(){
    for(let x = 0; x <= 7; x++){
        console.log("x")
        let lineArray = `line${x}`;
        let line = document.createElement("div");
        chessBoard.appendChild(line);
        for(let y = 0; y <= 7; y++){
            console.log("y")
            line.className = "line";
            if(x % 2 === 0){
                if(y % 2 !== 0){
                    createCase(line, "black");
                }else{                                       
                    createCase(line, "white");                   
                }
                chessBoardArray[x].push(newCase);
            }else{
                if(y % 2 === 0){                    
                    newCase.createCase(line, "black");
                }else{                       
                    newCase.createCase(line, "white");             
                }
                chessBoardArray[x].push(newCase);
            }          
        }
    }
}
function createPlayCase(line, color){
    const oneCase = document.createElement("div");
    line.appendChild(oneCase);
    oneCase.className = color;
    this.caseColor = color;
    this.htmlElement = oneCase;
    this.htmlElement.addEventListener('click', this.handleClick);
}


addEventListener("load", (event) => {
    createPlayBoard();
});