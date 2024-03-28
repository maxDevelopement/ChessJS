const { ChessPiece } = require('./chessPiece.js')

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
        }
        return this.possiblesMoves
    }
}

module.exports = { Bishop }