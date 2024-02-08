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
    // 1) array : le tableau qui contient tout les objets du tableau de jeu
    // 2) object : l'objet "this" de la case source qui contient toutes les infos
    // 3) xDestination : coordonnée x de la case de destination
    // 4) yDestination : coordonée y de la case de destination 
    isDestinationCaseColorTheSame(boardArray, object, xDestination, yDestination){
        const checkedCase = boardArray.find(caseItem => caseItem.xPosition === xDestination && caseItem.yPosition === yDestination);
        console.log("checkedCase1 : ", checkedCase)
        if(checkedCase.color === object.color){
            return true
        }     
        return false   
    }
}

module.exports = { ChessPiece }