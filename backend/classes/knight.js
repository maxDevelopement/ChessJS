const { ChessPiece } = require('./chessPiece.js');

class Knight extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "knight", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
}

module.exports = { Knight }