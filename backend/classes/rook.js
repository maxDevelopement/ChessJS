const { ChessPiece } = require('./chessPiece.js');

class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "rook", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves);
        this.grade = grade;
    }
    calculMove(actualBoard){
        let northLineStillAvailable = true
        let eastLineStillAvailable = true
        let southLineStillAvailable = true
        let westLineStillAvailable = true
        for(let coord = 1; coord < 8; coord++){            
            if(northLineStillAvailable){
                const doNorthCaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition)
                console.log("north case : ", doNorthCaseExist)
                if(doNorthCaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition - coord, this.yPosition)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition
                        })
                    }else{
                        northLineStillAvailable = false
                    }
                }else{
                    northLineStillAvailable = false    
                }
            }
            if(eastLineStillAvailable){
                const doEastCaseExist = this.doCaseExist(this.xPosition, this.yPosition + coord)
                if(doEastCaseExist){
                    console.log("east case : ", doEastCaseExist)
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition, this.yPosition + coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition,
                            y: this.yPosition + coord
                        })
                    }else{
                        eastLineStillAvailable = false
                    }
                }else{                    
                    eastLineStillAvailable = false
                }
            }
            if(southLineStillAvailable){
                const doSouthCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition)
                console.log("south case : ", doSouthCaseExist)
                if(doSouthCaseExist){
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition + coord, this.yPosition)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition
                        })
                    }else{
                        southLineStillAvailable = false
                    }                    
                }else{                    
                    southLineStillAvailable = false
                }
            }
            if(westLineStillAvailable){
                const doWestCaseExist = this.doCaseExist(this.xPosition, this.yPosition - coord)
                if(doWestCaseExist){    
                    console.log("west case : ", doWestCaseExist)                
                    const colorIsSame = this.isDestinationCaseColorTheSame(actualBoard, this, this.xPosition, this.yPosition - coord)
                    if(!colorIsSame){
                        this.possiblesMoves.push({
                            x: this.xPosition,
                            y: this.yPosition - coord
                        })
                    }else{
                        westLineStillAvailable = false
                    }      
                }else{                    
                    westLineStillAvailable = false
                }
            }
        }
    }
}
module.exports = { Rook }