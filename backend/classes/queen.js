const { ChessPiece } = require( './chessPiece.js')

class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "queen", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves)
        this.grade = grade
    }
}
module.exports = { Queen }