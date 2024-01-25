

class Case{
    constructor(xPosition, yPosition, grade = "none", caseColor = "none", playerColor = "none", htmlElement = "none"){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this._grade = grade;
        this.caseColor = caseColor;
        this.playerColor = playerColor;
        this.htmlElement = htmlElement;
    } 
    get grade(){
        return this._grade;
    }
    // changement automatique de l'image lors de déplacement de pièces
    set grade(newGrade){ 
        this._grade = newGrade;
        this.updateImg();
    }

    updateImg(){ 
        console.log("update img !");
        let blackPath = './img/Black_Chessman';
        let whitePath = './img/White_Chessman';
            let div = this.htmlElement;
            switch(this._grade){
                case "king": {
                    console.log("grade : ", this._grade);
                    div.style.backgroundImage = `url(${blackPath}/Black_King.png)`;
            }
        }
    }

    createCase(line, color){
        const oneCase = document.createElement("div");
        line.appendChild(oneCase);
        oneCase.className = color;
        this.caseColor = color;
        this.htmlElement = oneCase;
        this.htmlElement.addEventListener('click', this.handleClick);
    }
    
    handleClick= () => {
        console.log("objet : ", this.htmlElement);
        let div = this.htmlElement;
        if(activClick === false){ 
            div.style.backgroundColor = "red";
            activClick = true;
        }else if(activClick === true){ // rajouter conditions pour checker si case clickée est dans les case des mouvements possible
            this.CleanMovements();
            activClick = false;
        }
    };
    ShowMovement(){
        console.log("movements possibles !")
    }
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
                    newCase.grade = "king";
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
}

