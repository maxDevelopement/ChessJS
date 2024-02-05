const { ChessPiece } = require('./chessPiece.js');
const { checkCaseExist } = require('../routes/displayBoard.js')
class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(actualBoard){
        possibleMoves = [];
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
                x: this.xPosition + 1,
                y: this.yPosition
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition
            }
        ]
        KingMoves.forEach((move) => {
            const existCase = checkCaseExist(actualBoard, move.x, move.y)
            if(existCase.color === this.color){ return }
            this.possibleMoves.push( {
                x: existCase.xPosition,
                y: existCase.yPosition
            })
        })
    }
    
}


module.exports = { King }