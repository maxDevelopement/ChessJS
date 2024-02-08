const { ChessPiece } = require('./chessPiece.js');

class Rook extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "rook", _img){
        super(xPosition, yPosition, color, grade, _img);
        this.grade = grade;
    }
    calculMove(){
        for(let coord = 1; coord < 8; coord++){
            let northLineStillAvailable = true
            let eastLineStillAvailable = true
            let southLineStillAvailable = true
            let westLineStillAvailable = true
            
            if(northLineStillAvailable){
                const doNorthCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition)
                if(!doNorthCaseExist){
                    northLineStillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition + coord,
                        y: this.yPosition
                    })
                }
            }
            if(eastLineStillAvailable){
                const doEastCaseExist = this.doCaseExist(this.xPosition, this.yPosition + coord)
                if(!doEastCaseExist){
                    eastLineStillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition,
                        y: this.yPosition + coord
                    })
                }
            }
            if(southLineStillAvailable){
                const doSouthCaseExist = this.doCaseExist(this.xPosition - coord, this.yPosition)
                if(!doSouthCaseExist){
                    southLineStillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition - coord,
                        y: this.yPosition
                    })
                }
            }
            if(westLineStillAvailable){
                const doWestCaseExist = this.doCaseExist(this.xPosition, this.yPosition - coord)
                if(!doWestCaseExist){
                    westLineStillAvailable = false
                }else{
                    this.possiblesMoves.push({
                        x: this.xPosition,
                        y: this.yPosition - coord
                    })
                }
            }
        }
    }
}
module.exports = { Rook }