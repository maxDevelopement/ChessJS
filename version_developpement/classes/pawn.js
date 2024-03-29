const { ChessPiece } = require('./chessPiece.js')

class Pawn extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "pawn", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves)
        this.grade = grade
    }
    calculMove(actualBoard){
        let pawnMove
        if(this.color === 'white'){
            pawnMove = [
                {
                    x: this.xPosition - 1,
                    y: this.yPosition - 1
                },
                {
                    x: this.xPosition - 1,
                    y: this.yPosition
                },
                {
                    x: this.xPosition - 1,
                    y: this.yPosition + 1
                },
                {
                    x: this.xPosition - 2,
                    y: this.yPosition 
                }
            ]
        }else if(this.color === 'black'){
            pawnMove = [
                {
                    x: this.xPosition + 1,
                    y: this.yPosition + 1
                },
                {
                    x: this.xPosition + 1,
                    y: this.yPosition
                },
                {
                    x: this.xPosition + 1,
                    y: this.yPosition - 1
                },
                {
                    x: this.xPosition + 2,
                    y: this.yPosition 
                }
            ]
        }
        const leftCaseExist = this.doCaseExist(pawnMove[0].x, pawnMove[0].y)
        if(leftCaseExist){
            const caseToCheck = actualBoard.find((oneCase) => oneCase.xPosition === pawnMove[0].x && oneCase.yPosition === pawnMove[0].y)
            if(caseToCheck.color !== this.color && caseToCheck.color !== "none"){
                this.possiblesMoves.push({
                    x: pawnMove[0].x,
                    y: pawnMove[0].y
                })
            }
        }
        const frontCaseExist = this.doCaseExist(pawnMove[1].x, pawnMove[1].y)
        if(frontCaseExist){
            const caseToCheck = actualBoard.find((oneCase) => oneCase.xPosition === pawnMove[1].x && oneCase.yPosition === pawnMove[1].y)
            if(caseToCheck.color === "none"){
                this.possiblesMoves.push({ // insertion première case
                    x: pawnMove[1].x,
                    y: pawnMove[1].y
                })
                if(this.color === 'white' && this.xPosition === 6){
                    const secondCaseToCheck = actualBoard.find((oneCase) => oneCase.xPosition === pawnMove[3].x && oneCase.yPosition === pawnMove[3].y)
                    if(secondCaseToCheck && secondCaseToCheck.color === "none"){
                        this.possiblesMoves.push({ // insertion deuxième case (uniquement premier coup du pion)
                            x: pawnMove[3].x,
                            y: pawnMove[3].y
                        })
                    }
                }
                else if(this.color === 'black' && this.xPosition === 1){
                    const secondCaseToCheck = actualBoard.find((oneCase) => oneCase.xPosition === pawnMove[3].x && oneCase.yPosition === pawnMove[3].y)
                    if(secondCaseToCheck && secondCaseToCheck.color === "none"){
                        this.possiblesMoves.push({ // insertion deuxième case (uniquement premier coup du pion)
                            x: pawnMove[3].x,
                            y: pawnMove[3].y
                        })
                    }
                }
            }
        }
        const rightCaseExist = this.doCaseExist(pawnMove[2].x, pawnMove[2].y)
        if(rightCaseExist){
            const caseToCheck = actualBoard.find((oneCase) => oneCase.xPosition === pawnMove[2].x && oneCase.yPosition === pawnMove[2].y)
            if(caseToCheck.color !== this.color && caseToCheck.color !== "none"){
                this.possiblesMoves.push({
                    x: pawnMove[2].x,
                    y: pawnMove[2].y
                })
            }
        }
        return this.possiblesMoves
    }
}

module.exports = { Pawn }