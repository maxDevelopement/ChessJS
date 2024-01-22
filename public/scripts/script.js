let chessBoard = document.getElementById("chessBoard");

// au chargement de la page
addEventListener("load", (event) => {
    console.log("load !");
    createPlayBoard();
});

function createPlayBoard(){
    for(let x = 0; x <= 8; x++){
        console.log("x")
        let column = document.createElement("div");
        chessBoard.appendChild(column);
        for(let y = 0; y <= 8; y++){
            console.log("y")
            column.className = "column";
            if(x % 2 == 0){
                if(y % 2 !== 0){
                    let whiteCases = document.createElement("div");
                    column.appendChild(whiteCases)
                    whiteCases.className = 'whiteCase';
                }else{
                    let blackCases = document.createElement("div");
                    column.appendChild(blackCases);
                    blackCases.className = 'blackCase';                
                }
            }else{
                if(y % 2 === 0){
                    let whiteCases = document.createElement("div");
                    column.appendChild(whiteCases)
                    whiteCases.className = 'whiteCase';
                }else{
                    let blackCases = document.createElement("div");
                    column.appendChild(blackCases);
                    blackCases.className = 'blackCase';                
                }
            }
            
        }
    }
}