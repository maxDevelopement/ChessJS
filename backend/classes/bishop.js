const { ChessPiece } = require('./chessPiece.js')
const { checkCaseExist, doCaseExist } = require('../routes/displayBoard')

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
                const doNWCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition - coord)
                if( doNWCaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition + coord, this.yPosition - coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition - coord
                        })
                    }else{
                        NWstillAvailable = false
                    }                    
                }else{
                    NWstillAvailable = false
                }
            }
            // NE
            if(NEstillAvailable){
                const doNECaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition + coord)
                if(doNECaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition + coord, this.yPosition + coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition + coord
                        })
                    }else{
                        NEstillAvailable = false
                    }
                }else{
                    NEstillAvailable = false                    
                }
            }
            // SE
            if(SEstillAvailable){
                const doSEcaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition + coord)
                if(doSEcaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition - coord, this.yPosition + coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition + coord
                        })
                    }else{
                        SEstillAvailable = false
                    }                   
                }else{                    
                    SEstillAvailable = false
                }
            }
            // SW
            if(SWstillAvailable){
                const doSWcaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition - coord)
                if(doSWcaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition - coord, this.yPosition - coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition - coord
                        })
                    }else{
                        SWstillAvailable = false
                    }                    
                }else{                    
                    SWstillAvailable = false
                }
            }
        }
    }
}

module.exports = { Bishop }