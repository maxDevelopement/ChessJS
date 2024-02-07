const { ChessPiece } = require('./chessPiece.js');
const { checkCaseExist } = require('../routes/displayBoard.js')
class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(){
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
        KingMoves.forEach((move) => {
            const existCase = this.doCaseExist(move.x, move.y)
            if(existCase){
                console.log("this.possiblesMoves : ", this.possiblesMoves)
                this.possiblesMoves.push({
                    x: move.x,
                    y: move.y
                })
            }      
        })
    }
    
}


module.exports = { King }