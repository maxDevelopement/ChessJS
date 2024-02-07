class ChessPiece{
    constructor(xPosition, yPosition, color, grade = "none"){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.grade = grade;
        this._img = this.setImg(this.color);
        this.possiblesMoves = [];
    }
    get img(){
        return this._img;
    }
    set img(value){
        this.img = setImg(value);
    }
    setImg(value){
        console.log("value ", value)
        switch(value){
            case "black": {
              return `./img/black/${this.grade}.png`;
            }
            case "white": {
                return `./img/white/${this.grade}.png`;
            }
            case "none" : {
                return undefined;
            }
        }
    }

    doCaseExist(xPos, yPos){
        if((xPos < 0 || xPos > 7) || (yPos < 0 || yPos > 7)){
            return false;
        }else{
            return true;
        }       
    }
    // cette fonction determine si le joueur peut déplacer sa pièce sur la case de destination proposée
    // le joueur peut déplacer sa pièce uniquement si la case est vide ou a une pièce enemie
    // les paramètres de la fonction sont : 
    // 1) xDestination : coordonnée x de la case de destination
    // 2) yDestination : coordonée y de la case de destination 
    isCaseAvailable(xDestination, yDestination){
        
    }
}

module.exports = { ChessPiece }