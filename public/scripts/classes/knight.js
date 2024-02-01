import { ChessPiece } from './chessPiece.js';

export class Knight extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "knight", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
}