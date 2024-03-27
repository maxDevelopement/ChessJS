const { ChessPiece } = require('./chessPiece.js');
class King extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "king", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade
        this.mate = false // echec
        this.chessMate = false // echec & mat
    }
    calculMove(actualBoard){
        const KingMoves = [
            {
                x: this.xPosition + 1,
                y: this.yPosition 
            },
            {
                x: this.xPosition + 1,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition + 1,
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
                x: this.xPosition - 1,
                y: this.yPosition - 1
            },
            {
                x: this.xPosition,
                y: this.yPosition + 1
            },
            {
                x: this.xPosition,
                y: this.yPosition - 1 
            }
        ]
        //console.log("actualboard : ", actualBoard)
        KingMoves.forEach((move) => {
            const existCase = this.doCaseExist(move.x, move.y)
            if(existCase){
                const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, move.x, move.y)
                //console.log("comparaison couleur (true ou false attendue : ", colorIsSame)
                //console.log("color source : ", this.color)
                if(existCase && colorIsSame.value === false){
                    //console.log("this.possiblesMoves : ", this.possiblesMoves)
                    this.possiblesMoves.push({
                        x: move.x,
                        y: move.y
                    })
                } 
            }                
        })
        this.dropMatesMovements(actualBoard)
    }   
    dropMatesMovements(actualboard){
        const opponentsPieces = actualboard.filter((piece) => piece.color !== this.color && piece.color !== 'none')
        // check si opponent peut aller sur déplacements du roi
        for(let i = 0; i < this.possiblesMoves.length; i++){
            const opponentMovesMates = opponentsPieces.find((opponentPieceMove) => 
                opponentPieceMove.x === this.possiblesMoves[i].xPosition &&
                opponentPieceMove.y === this.possiblesMoves[i].yPosition
            )
            if(opponentMovesMates){
                console.log("déplacements enemis trouvés : ", opponentMovesMates)
                const updatedPossiblesMoves = this.possiblesMoves.filter((piece) => piece.xPosition === opponentMovesMates.xPosition && piece.yPosition === opponentMovesMates.yPosition)
                this.possiblesMoves = updatedPossiblesMoves
            }
        }
        // detection "echec"
        const checkMates = opponentsPieces.filter((piece) => {
            const mate = piece.possiblesMoves.filter((move) => {
                move.x === this.xPosition && move.y === this.yPosition
            })
            return mate
        })
        if(checkMates[0]){
            this.mate = true
        }else{
            this.mate = false
        }
        if(this.possiblesMoves.length === 0 && this.mate === true){
            this.chessMate = true
        }
    }
}


module.exports = { King }