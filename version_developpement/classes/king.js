const { Queen } = require('../classes/queen')
const { Rook } = require('../classes/rook')
const { Bishop } = require('../classes/bishop')
const { Knight } = require('../classes/knight')
const { Pawn } = require('../classes/pawn')
const { Empty } = require("../classes/empty")
const { ChessPiece } = require('./chessPiece.js')

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
    dropMatesMovements(actualBoard) {
        const opponentsPieces = actualBoard.filter(piece => piece.color !== this.color && piece.color !== "none" && piece.possiblesMoves.length > 0);
        // Pour chaque mouvement possible, vérifier si une pièce adverse pourrait y atteindre
        console.log("all opponents : ", opponentsPieces)
        for(const opponent of opponentsPieces) {
            // Ici, on simulerait les mouvements possibles de la pièce adverse
            const opponentMoves = getOpponentMoves(opponent, actualBoard)
            /*if(opponentMoves && this.possiblesMoves.length > 0){
                const moveToDrop = this.possiblesMoves.filter((myPossiblesMoves) => myPossiblesMoves.xPosition === opponentMoves.x && myPossiblesMoves.yPosition === opponentMoves.y)
                this.possiblesMoves -= moveToDrop
            }*/
        }

   /*     // Vérifier l'échec: Si une des pièces adverses peut atteindre la position actuelle du roi
        this.mate = opponentsPieces.some(opponent => opponent.calculMove(actualBoard));

        // Vérifier l'échec et mat: Si le roi est en échec et n'a plus de mouvements légaux
        if (this.mate && this.possiblesMoves.length === 0) {
            this.chessMate = true;
            console.log("echec et mat")
        } else {
            this.chessMate = false;
            console.log("echec (mate) ? : ", this.mate)
        }*/
    }
}
function getOpponentMoves(opponent, actualBoard){
    console.log("(getOpponentMoves) opponent : ", opponent)
    switch (opponent.grade){
        case 'empty': {
            return null
        }
        case 'pawn' : {
            const pawn = new Pawn(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = pawn.calculMove(actualBoard)
            return moves
        }
        case 'rook' : {
            const rook = new Rook(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = rook.calculMove(actualBoard)
            return moves
        }
        case 'knigt': {
            const knigt = new Knigt(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = knigt.calculMove(actualBoard)
            return moves
        }
        case 'bishop': {
            const bishop = new Bishop(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = bishop.calculMove(actualBoard)
            return moves
        }
        case 'queen': {
            const queen = new Queen(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = queen.calculMove(actualBoard)
            return moves
        }
        case 'king': {
            const king = new King(opponent.xPosition, opponent.yPosition, opponent.color, opponent._img, opponent.possiblesMoves)
            const moves = king.calculMove(actualBoard)
            return moves
        }
    }
}

module.exports = { King }