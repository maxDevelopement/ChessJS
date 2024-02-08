const { ChessPiece } = require('./chessPiece.js')
const { checkCaseExist, doCaseExist } = require('../routes/displayBoard')

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
                const doNWCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition - coord)
                if(!doNWCaseExist){
                    NWstillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition + coord,
                        y: this.yPosition - coord
                    })             
                }
            }
            // NE
            if(NEstillAvailable){
                const doNECaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition + coord)
                if(!doNECaseExist){
                    NEstillAvailable = false
                }else{
                    console.log("selectedCase nishop : ", selectNEcase)
                    this.possiblesMoves.push({
                        x: this.xPosition + coord,
                        y: this.yPosition + coord
                    })
                    /*if(checkGoodColorCase(this.color, selectNECase.color)){
                        
                    }*/
                    
                }
            }
            // SE
            if(SEstillAvailable){
                const doSEcaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition + coord)
                if(!doSEcaseExist){
                    SEstillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition - coord,
                        y: this.yPosition + coord
                    })
                    /*if(checkGoodColorCase(this.color, selectSEcase.color)){
                        
                    }*/
                }
            }
            // SW
            if(SWstillAvailable){
                const doSWcaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition - coord)
                if(!doSWcaseExist){
                    SWstillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition - coord,
                        y: this.yPosition - coord
                })
                    /*if(checkGoodColorCase(this.color, selectSWcase.color)){
                        
                    }*/
                }
            }
        }
    }
}

module.exports = { Bishop }