const { ChessPiece } = require('./chessPiece.js');
class Empty extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "empty", _img, possiblesMoves = "none"){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
        this.color = "none"
    }
    calculMove(){
        return null
    }
}

module.exports = { Empty }