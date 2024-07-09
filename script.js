var starbtn=document.querySelector(".startbtn")
var strter=document.querySelector(".starter")
var restrtbtn=document.querySelector(".restart")
starbtn.addEventListener("click",function(){
    strter.style.display="none"
})
restrtbtn.addEventListener("click",function(){
    strter.style.display="block"
})

const statusDisplay=document.querySelector(".game-status")
let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];

const winMsg=() => `Player ${currentPlayer} has WON!!`;
const drawMsg=() => `Game ended in a draw..`;
const currentPlayerTurn=() => `It,s ${currentPlayer}'s turn..`;

statusDisplay.innerHTML=currentPlayerTurn();

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector(".restart").addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent){
    const clickedCell= clickedCellEvent.target;
    const clickedCellIndex= parseInt(
        clickedCell.getAttribute("data-cell-index")
    );

    if(gameState[clickedCellIndex]!== "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}

const winCondi=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const wincondition=winCondi[i];
        let a=gameState[wincondition[0]];
        let b=gameState[wincondition[1]];
        let c=gameState[wincondition[2]];
        if(a=='' || b=='' ||c==''){
            continue;
        }
        if(a==b && b==c){
            roundWon=true;
            break
        }
    }
    if(roundWon){
        statusDisplay.innerHTML=winMsg();
        alert("Won!!");
        gameActive=false;
        return;
    }

    let roundDraw= !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML=drawMsg();
        alert("MATCH DRAW!!")
        gameActive=false
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer=currentPlayer == "X" ? "O" : "X"
    statusDisplay.innerHTML=currentPlayerTurn();
}

function handleRestartGame(){
    gameActive=true;
    currentPlayer="X";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}
