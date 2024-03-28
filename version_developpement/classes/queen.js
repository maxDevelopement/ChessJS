const { ChessPiece } = require( './chessPiece.js')

class Queen extends ChessPiece{
    constructor(xPosition, yPosition, color, grade = "queen", _img, possiblesMoves){
        super(xPosition, yPosition, color, grade, _img, possiblesMoves)
        this.grade = grade
    }
    calculMove(actualBoard){
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
            // deplacements style "bishop"
            // NW
            if(NWstillAvailable){
                const doNWCaseExist = this.doCaseExist(this.xPosition + coord, this.yPosition - coord)
                if( doNWCaseExist){
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition + coord, this.yPosition - coord)
                    if(colorIsSame.value === false){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition - coord
                        })
                        if(colorIsSame.color !== 'none'){
                            NWstillAvailable = false
                        }
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
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition + coord, this.yPosition + coord)
                    if(colorIsSame.value === false){
                        this.possiblesMoves.push({
                            x: this.xPosition + coord,
                            y: this.yPosition + coord
                        })
                        if(colorIsSame.color !== 'none'){
                            NEstillAvailable = false
                        }
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
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition - coord, this.yPosition + coord)
                    if(colorIsSame.value === false){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition + coord
                        })
                        if(colorIsSame.color !== 'none'){
                            SEstillAvailable = false
                        }
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
                    const colorIsSame = this.checkDestinationCaseColor(actualBoard, this, this.xPosition - coord, this.yPosition - coord)
                    if(colorIsSame.value === false){
                        this.possiblesMoves.push({
                            x: this.xPosition - coord,
                            y: this.yPosition - coord
                        })
                        if(colorIsSame.color !== 'none'){
                            SWstillAvailable = false
                        }
                    }else{
                        SWstillAvailable = false
                    }                    
                }else{                    
                    SWstillAvailable = false
                }
            }
            // déplacements style "rook"
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
module.exports = { Queen }