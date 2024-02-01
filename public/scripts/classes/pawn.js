import { ChessPiece } from './chessPiece.js';

export class Pawn extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "pawn", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}