const { ChessPiece } = require('./chessPiece.js');

class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "rook", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}
module.exports = { Rook }