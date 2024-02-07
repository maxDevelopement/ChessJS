const { ChessPiece } = require('./chessPiece.js')
const { checkCaseExist, checkGoodColorCase } = require('../routes/displayBoard')

class Bishop extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "bishop", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(){
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
                const selectNWCase = this.doCaseExist(this.xPosition + coord, this.yPosition - coord)
                if(!selectNWCase){
                    NWstillAvailable = false
                }else{
                    this.possiblesMoves.push(selectNWCase)
                    /*if(checkGoodColorCase(this.color, selectNWCase.color)){
                        
                    } */               
                }
            }
            // NE
            if(NEstillAvailable){
                const selectNECase = this.doCaseExist(this.xPosition + coord, this.yPosition + coord)
                if(!selectNECase){
                    NEstillAvailable = false
                }else{
                    console.log("selectedCase nishop : ", selectNEcase)
                    this.possiblesMoves.push(selectNECase)
                    /*if(checkGoodColorCase(this.color, selectNECase.color)){
                        
                    }*/
                    
                }
            }
            // SE
            if(SEstillAvailable){
                const selectSEcase = this.doCaseExist(this.xPosition - coord, this.yPosition + coord)
                if(!selectSEcase){
                    SEstillAvailable = false
                }else{
                    this.possiblesMoves.push(selectSEcase)
                    /*if(checkGoodColorCase(this.color, selectSEcase.color)){
                        
                    }*/
                }
            }
            // SW
            if(SWstillAvailable){
                const selectSWcase = this.doCaseExist(this.xPosition - coord, this.yPosition - coord)
                if(!selectSWcase){
                    SWstillAvailable = false
                }else{
                    this.possiblesMoves.push(selectSWcase)
                    /*if(checkGoodColorCase(this.color, selectSWcase.color)){
                        
                    }*/
                }
            }
        }
    }
}

module.exports = { Bishop }