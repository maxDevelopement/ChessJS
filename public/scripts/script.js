let chessBoard = document.getElementById("chessBoard");

// au chargement de la page
addEventListener("load", (event) => {
    console.log("load !");
    createPlayBoard();
});

function createPlayBoard(){
    for(let x = 0; x <= 7; x++){
        console.log("x")
        let column = document.createElement("div");
        chessBoard.appendChild(column);
        for(let y = 0; y <= 7; y++){
            console.log("y")
            column.className = "column";
            if(x % 2 == 0){
                if(y % 2 !== 0){
                    createCase(column, "black");
                }else{
                    createCase(column, "white");               
                }
            }else{
                if(y % 2 === 0){
                    createCase(column, "black");
                }else{
                    createCase(column, "white");             
                }
            }
            
        }
    }
}

function createCase(column, color){
    const oneCase = document.createElement("div");
    column.appendChild(oneCase);
    oneCase.className = color;
}