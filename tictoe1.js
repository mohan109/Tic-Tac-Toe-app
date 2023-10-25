const items = document.querySelectorAll(".item1");
const Player_X = 'x';
const Player_O = 'O';
let turn = Player_X;

const ticTacBoard = Array(items.length);
ticTacBoard.fill(null);

//Elements
const strike = document.getElementById("markline");
const gameOver = document.getElementById("game-over");
const gameOverText  = document.getElementById("game-over-text");
const playAgain = document.getElementById("btyn");
playAgain.addEventListener("click", startOtherGame);

const gameOverSound = new Audio("sound/game-over-arcade.wav");
const click = new Audio("sound/click.wav");

items.forEach((item) => item.addEventListener("click",itemClick));

function setHoverText(){
    items.forEach((item) => {
        item.classList.remove("X-display");
        item.classList.remove("O-display");
    });
    const hoverClass = `${turn}-display`;
    items.forEach((item) => {
        if(item.innerText == ""){
            item.classList.add(hoverClass);
        }
    });
}

setHoverText();


function itemClick(event){
    if(gameOver.classList.contains("visible")){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ""){
        return;
    }
    
    if(turn === Player_X){
        tile.innerText = Player_X;
        ticTacBoard[tileNumber-1]=Player_X;
        turn = Player_O;
    }
    else{
        tile.innerText = Player_O;
        ticTacBoard[tileNumber-1]=Player_O;
        turn = Player_X;
    }

    click.play();
    setHoverText();
    checkWinner();
}

//There are 8 winning combinations in a tictactoe board by signing 8 strike-offs into it.
const winningCombinations = [
    { pairs: [1,2,3], marklineClass:"markline-row1"},
    { pairs: [4,5,6], marklineClass:"markline-row2"},
    { pairs: [7,8,9], marklineClass:"markline-row3"},
    { pairs: [1,4,7], marklineClass:"markline-column1"},
    { pairs: [2,5,8], marklineClass:"markline-column2"},
    { pairs: [3,6,9], marklineClass:"markline-column3"},
    { pairs: [1,5,9], marklineClass:"markline-diagonal1"},
    { pairs: [3,5,7], marklineClass:"markline-diagonal2"}
]

// this winning statement by passing any itemvalue into displaywinner function.
function checkWinner(){
    for(const winningMethods of winningCombinations){
        const{pairs, marklineClass} = winningMethods;
        const itemValue1 = ticTacBoard[pairs[0] - 1];
        const itemValue2 = ticTacBoard[pairs[1] - 1];
        const itemValue3 = ticTacBoard[pairs[2] - 1];

        if(itemValue1 != null && itemValue1 === itemValue2 && itemValue1 === itemValue3){
            strike.classList.add(marklineClass);
            displayWinner(itemValue1);
            return;
        }
    }

    //for Draw statement Condition just pass "null" as input in gameOverScreen function.
    const everyItemFilled = ticTacBoard.every((item) => item !== null);
    if(everyItemFilled){
        displayWinner(null);
    }

}

function displayWinner(winnerText){
    let text = "/* Tie! */"
    if(winnerText != null){
        text = `winner is ${winnerText}!`; // ${} is a ES6 literal identifies an object.
    }
    gameOver.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
}


function startOtherGame() {
    strike.className = "markline";
    gameOver.className = "hide";
    ticTacBoard.fill(null);
    items.forEach((item) => (item.innerText = ""));
    turn = Player_X;
    setHoverText();
}

 