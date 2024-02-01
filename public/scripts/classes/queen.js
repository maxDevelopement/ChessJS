import { ChessPiece } from './chessPiece.js';

export class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "queen", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}