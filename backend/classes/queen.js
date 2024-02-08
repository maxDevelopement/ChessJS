const { ChessPiece } = require( './chessPiece.js')

class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "queen", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves)
        this.grade = grade
    }
    calculMove(){
        // calcul en diagonale (fou): 
        // NW => North-West
        // NE => Noth-East
        // SW => South-West
        // SE => South-East
        let NWstillAvailable = true
        let NEstillAvailable = true
        let SWstillAvailable = true
        let SEstillAvailable = true
        // calculs en lignes (tour)
        let northLineStillAvailable = true
        let eastLineStillAvailable = true
        let southLineStillAvailable = true
        let westLineStillAvailable = true
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
                }
            }
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
module.exports = { Queen }