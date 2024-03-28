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
                if(doNorthCaseExist){
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition - coord, this.yPosition)
                    if(!colorIsSame.value){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition
                        })
                        if(colorIsSame.color !== 'none'){
                            northLineStillAvailable = false
                        }
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
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition, this.yPosition + coord)
                    if(!colorIsSame.value){
                        this.possiblesMoves.push({
                            x: this.xPosition,
                            y: this.yPosition + coord
                        })
                        if(colorIsSame.color !== 'none'){
                            eastLineStillAvailable = false
                        }
                    }else{
                        eastLineStillAvailable = false
                    }
                }else{                    
                    eastLineStillAvailable = false
                }
            }
            if(southLineStillAvailable){
                const doSouthCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition)
                if(doSouthCaseExist){
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition + coord, this.yPosition)
                    if(!colorIsSame.value){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition
                        })
                        if(colorIsSame.color !== 'none'){
                            southLineStillAvailable = false
                        }
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
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition, this.yPosition - coord)
                    if(!colorIsSame.value){
                        this.possiblesMoves.push({
                            x: this.xPosition,
                            y: this.yPosition - coord
                        })
                        if(colorIsSame.color !== 'none'){
                            westLineStillAvailable = false
                        }
                    }else{
                        westLineStillAvailable = false
                    }      
                }else{                    
                    westLineStillAvailable = false
                }
            }
        }
        return this.possiblesMoves
    }
}
module.exports = { Rook }