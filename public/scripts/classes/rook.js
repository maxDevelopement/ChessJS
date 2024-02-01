import { ChessPiece } from './chessPiece.js';

export class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "rook", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}