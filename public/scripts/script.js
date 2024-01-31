let User = {
    username: undefined,
    color: undefined,
    takenPieces: []
};


class Case{
    constructor(xPosition, yPosition, grade = "none", pieceColor = "none", htmlElement = "none"){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this._grade = grade;
        this.pieceColor = pieceColor;
        this.htmlElement = htmlElement;
    } 
    get grade(){
        return this._grade;
    }
    // changement automatique de l'image lors de déplacement de pièces
    set grade(grade){ 
        let newGrade = new Grade(grade);
        this._grade = newGrade;
        newGrade.updateImg();
    }
    createCase(line, color){
        const oneCase = document.createElement("div");
        line.appendChild(oneCase);
        oneCase.className = color;
        this.caseColor = color;
        this.htmlElement = oneCase;
        this.htmlElement.addEventListener('click', this.handleClick);
    }
    // affiche automatiquement l'image de la pièce selon son grade
    handleClick= () => {
        console.log("objet : ", this.htmlElement);
        let div = this.htmlElement;
        if(activClick === false){ 
            console.log(this);
            this.grade.ShowMove(this.xPosition, this.yPosition);
            div.style.backgroundColor = "red";
            activClick = true;
        }else if(activClick === true){ // rajouter conditions pour checker si case clickée est dans les case des mouvements possible
            this.CleanMovements();
            activClick = false;
        }
    };
    // remets toutes les cases du tableau de jeu dans leurs couleurs d'origine
    CleanMovements(){
        console.log("chessBoard : ", chessBoardArray);
        chessBoardArray.forEach(line => {
            for(let caseNbr = 0; caseNbr <= 7; caseNbr++){
                console.log("case à cleaner : ",line[caseNbr]);
                let div = line[caseNbr]; // elements html à modifier
                div.htmlElement.style.backgroundColor = div.caseColor;
            }
        });
    }
}

class Grade{
    constructor(name){
        this.name = name;
    }
    updateImg(color){ 
        console.log("update img !");
        let path = `./img/${color}`;
        let div = this.htmlElement;
        switch(this._grade){
            case "king": {
                console.log("grade : ", this._grade);
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_King.png)`;
                }else if(this.pieceColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_King.png)`;
                }         
                break;
            }
            case "queen": {
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_Queen.png)`;
                }else if(this.caseColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_Queen.png)`;
                }         
                break;
            }
            case "bishop": { // fou
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_Bishop.png)`;
                }else if(this.pieceColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_Bishop.png)`;
                }         
                break;
            }
            case "knight": { // cheval
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_Knight.png)`;
                }else if(this.pieceColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_Knight.png)`;
                }         
                break;
            }
            case "Rook": { // tour
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_Rook.png)`;
                }else if(this.pieceColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_Rook.png)`;
                }         
                break;
            }
            case "pawn": { // pion
                if(this.pieceColor === "black"){
                    div.style.backgroundImage = `url(${path}/Black_Pawn.png)`;
                }else if(this.pieceColor === "white"){
                    div.style .backgroundImage = `url(${path}/White_Pawn.png)`;
                }         
                break;
            }
        }
    }
    ShowMove(){
        console.log("showMove gradeb : ", this.name)
        switch(this.name.name){
            case "king": {
                console.log("king !")
                let move = gradeKing.ShowMove();
                move.forEach(div => {
                    console.log(div)
                    div.style.backgroundColor = "red";
                })
            }
            case "queen": {

            }
        }
    }    
}

class King extends Grade{
    constructor(name){
        this.name = name;
    }
    ShowMove(x, y){
        console.log("showmove !")
        let possibleMoves = []; 
        if(chessBoardArray[x-1]){ // check 1 ligne devant
            if(DestionationColor !== User.color){
                if(chessBoardArray[x-1][y-1]){
                    possibleMoves.push(chessBoardArray[x-1][y-1]);
                    chessBoardArray[x-1][y-1].htmlElement.style.backgroundColor = "red";
                }
                if(chessBoardArray[x-1][y]){
                    possibleMoves.push(chessBoardArray[x-1][y]);
                    chessBoardArray[x-1][y].htmlElement.style.backgroundColor = "red";
                }
                if(chessBoardArray[x-1][y+1]){
                    possibleMoves.push(chessBoardArray[x-1][y+1]);
                    chessBoardArray[x-1][y+1].htmlElement.style.backgroundColor = "red";
                }
            }
        }
        const moves = possibleMoves
        console.log("moves : ", moves)
        return moves;
    }
}

// instanciation des grades
let gradeKing = new Grade("king");

// variables
let chessBoardArray = [[], [], [], [], [], [], [], [], ];
let activClick = false;
let chessBoard = document.getElementById("chessBoard");

// au chargement de la page
addEventListener("load", (event) => {
    createPlayBoard();
});

// creation du tableau de jeu vide
function createPlayBoard(){
    for(let x = 0; x <= 7; x++){
        console.log("x")
        let lineArray = `line${x}`;
        let line = document.createElement("div");
        chessBoard.appendChild(line);
        for(let y = 0; y <= 7; y++){
            console.log("y")
            line.className = "line";
            let newCase = new Case(x, y);
            if(x % 2 === 0){
                if(y % 2 !== 0){
                    newCase.createCase(line, "black");
                }else{                                       
                    newCase.createCase(line, "white");                   
                }
                console.log(lineArray)
                chessBoardArray[x].push(newCase);
            }else{
                if(y % 2 === 0){                    
                    newCase.createCase(line, "black");
                }else{                       
                    newCase.createCase(line, "white");             
                }
                chessBoardArray[x].push(newCase);
            }          
        }
    }
    chessBoardArray[7][7].pieceColor = "black";
    chessBoardArray[7][7].grade = gradeKing;
}

