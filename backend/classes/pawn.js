const { ChessPiece } = require('./chessPiece.js')

class Pawn extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "pawn", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves)
        this.grade = grade
    }
    calculMove(actualBoard){
        const selectedCase = checkCaseExist(actualBoard, this.xPosition + 1, this.yPosition)
        if(!selectedCase){
            // case devient reine ou toute autre pièce
        }else{
            this.possiblesMoves.push(selectedCase)
        }
    }
}

module.exports = { Pawn }