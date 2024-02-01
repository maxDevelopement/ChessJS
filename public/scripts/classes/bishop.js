import { ChessPiece } from './chessPiece.js';

export class Bishop extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "bishop", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}