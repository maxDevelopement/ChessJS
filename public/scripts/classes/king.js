import { ChessPiece } from './chessPiece.js';
export class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
    calculMoveplayBoard(playboard){
        possibleMoves = [];
        const testMove = [
            {
                xPos : this.xPosition + 1, 
                yPos : this.yPosition
            },
            {
                xPos : this.xPosition + 1, 
                yPos : this.yPosition - 1
            },
            {
                xPos : this.xPosition + 1, 
                yPos : this.yPosition + 1
            },
            {
                xPos : this.xPosition, 
                yPos : this.yPosition + 1
            },
            {
                xPos : this.xPosition, 
                yPos : this.yPosition - 1
            },
            {
                xPos : this.xPosition - 1, 
                yPos : this.yPosition
            },
            {
                xPos : this.xPosition - 1, 
                yPos : this.yPosition - 1
            },
            {
                xPos : this.xPosition - 1, 
                yPos : this.yPosition + 1
            }
        ];
        testMove.forEach(move => {
            if(!this.doCaseExist(move.xPos, move.yPos)){
                return;
            }
            if(!this.isCaseAvailable(move.xPos, move.yPos)){
                return
            }

        })

    }
    
}