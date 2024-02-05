const { ChessPiece } = require('./chessPiece.js');
const { checkCaseExist, checkGoodColorCase } = require('../routes/displayBoard')

class Bishop extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "bishop", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(actualBoard){
        // calcul en diagonale : 
        // NW => North-West
        // NE => Noth-East
        // SW => South-West
        // SE => South-East
        let NWstillAvailable = true
        let NEstillAvailable = true
        let SWstillAvailable = true
        let SEstillAvailable = true
        for(let coord = 1; coord < 8; coord++){
            // NW 
            if(NWstillAvailable){
                const selectNWCase = checkCaseExist(actualBoard, this.xPosition + coord, this.yPosition - coord)
                if(!selectNWCase){
                    NWstillAvailable = false
                }else{
                    if(checkGoodColorCase(this.color, selectNWCase.color)){
                        this.possiblesMoves.push(selectNWCase)
                    }                
                }
            }
            // NE
            if(NEstillAvailable){
                const selectNECase = checkCaseExist(actualBoard, this.xPosition + coord, this.yPosition + coord)
                if(!selectNECase){
                    NEstillAvailable = false
                }else{
                    if(checkGoodColorCase(this.color, selectNECase.color)){
                        this.possiblesMoves.push(selectNECase)
                    }
                    
                }
            }
            // SE
            if(SEstillAvailable){
                const selectSEcase = checkCaseExist(actualBoard, this.xPosition - coord, this.yPosition + coord)
                if(!selectSEcase){
                    SEstillAvailable = false
                }else{
                    if(checkGoodColorCase(this.color, selectSEcase.color)){
                        this.possiblesMoves.push(selectSEcase)
                    }
                }
            }
            // SW
            if(SWstillAvailable){
                const selectSWcase = checkCaseExist(actualBoard, this.xPosition - coord, this.yPosition - coord)
                if(!selectSWcase){
                    SWstillAvailable = false
                }else{
                    if(checkGoodColorCase(this.color, selectSWcase.color)){
                        this.possiblesMoves.push(selectSWcase)
                    }
                }
            }
        }
    }
}

module.exports = { Bishop }