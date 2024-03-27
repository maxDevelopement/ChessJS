const { ChessPiece } = require('./chessPiece.js');

class Knight extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "knight", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(actualBoard){
        const KnightMoves = [
            {
                x: this.xPosition + 2,
                y: this.yPosition - 1
            },
            {
                x: this.xPosition + 2,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition - 2,
                y: this.yPosition - 1
            },
            {
                x: this.xPosition - 2,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition - 1,
                y: this.yPosition + 2
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition + 2
            },
            {
                x: this.xPosition - 1,
                y: this.yPosition - 2
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition - 2
            }
        ]
        KnightMoves.forEach((move) => {
            const existCase = this.doCaseExist(move.x, move.y)
            if(existCase){
                const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, move.x, move.y)
                if(colorIsSame.value){
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

module.exports = { Knight }