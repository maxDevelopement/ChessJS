const { ChessPiece } = require('./chessPiece.js');
class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(actualBoard){
        const KingMoves = [
            {
                x: this.xPosition + 1,
                y: this.yPosition 
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition - 1
            },
            {
                x: this.xPosition - 1,
                y: this.yPosition 
            },
            {
                x: this.xPosition - 1,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition - 1,
                y: this.yPosition - 1
            },
            {
                x: this.xPosition,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition,
                y: this.yPosition - 1 
            }
        ]
        //console.log("actualboard : ", actualBoard)
        KingMoves.forEach((move) => {
            const existCase = this.doCaseExist(move.x, move.y)
            if(existCase){
                const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, move.x, move.y)
                //console.log("comparaison couleur (true ou false attendue : ", colorIsSame)
                //console.log("color source : ", this.color)
                if(existCase && !colorIsSame){
                    //console.log("this.possiblesMoves : ", this.possiblesMoves)
                    this.possiblesMoves.push({
                        x: move.x,
                        y: move.y
                    })
                } 
            }                
        })
    }   
}


module.exports = { King }