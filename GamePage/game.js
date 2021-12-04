//import modules
import cardsData from "../cards/cards.mjs";
import Card from "../modules/Card.mjs";
import Board from "../modules/Board.mjs";
import Player from "../modules/Player.mjs";


//Assign new players and retrieve the players from storage
const Player1 = Object.assign(
    new Player(),
    JSON.parse(localStorage.getItem("player1"))
);
const Player2 = Object.assign(
    new Player(),
    JSON.parse(localStorage.getItem("player2"))
);

//Get board size
const size = Number(JSON.parse(localStorage.getItem("size")));
//Create a new board with the desired size  
const board = new Board(size);

//Init card data
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turn = Player1;
let cardsUp = 0;

function initBoard(size) {
    //Add random cards pic to board 
    let k = 0;
    for (let i = 0; i < Math.floor((size * size) / 2); i++) {
        const card1 = new Card(`../cards/${cardsData[k].img}`, cardsData[k].id);
        board.addCard(card1);
        const card2 = new Card(`../cards/${cardsData[k].img}`, cardsData[k++].id);
        board.addCard(card2);
    }
    //Add a card without a pair in case the board is odd size 
    if (size % 2 != 0) {
        const card1 = new Card(`../cards/${cardsData[k].img}`, cardsData[k++].id);
        board.addCard(card1);
    }
    //Shuffle the cards
    board.shuffle();
}

//Update player turn
function updateTurn(player) {
    const theTurn = document.querySelector(".playerTurn");
    theTurn.innerHTML = `${player.name}'s Turn`;
}

//Flip card Algorithm
function flipCard() {
    if (lockBoard || this === firstCard) {
        return;
    }

    this.classList.add("flip");

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    flippedCard = false;

    let isPair = (firstCard.id === secondCard.id);
    if (isPair) {
        foundMatch();
    } else {
        unflipCards();
    }
}

//Add an event to cards when clicked
function clickCads() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", flipCard);
    }

}

//Swap turns
function switchTurns() {
    if (turn == Player1) {
        turn = Player2;
    } else {
        turn = Player1;
    }
}


//Found Pair
function foundMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    updateRecord();
}


function unflipCards() {
    lockBoard = true;

    let myPromise = new Promise(function(myResolve, myReject) {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            switchTurns();
            updateTurn(turn);
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }, 1000);

    });

    myPromise.then(function(value) {
        console.log("Card unfliped successfully")
    });
}

//Results update Algorithm
function updateRecord() {
    turn.points += 1;
    cardsUp += 2;
    console.log(Player1);
    console.log(Player2);
    console.log(size * size);
    if (cardsUp == size * size || (cardsUp + 1 == size * size)) {
        gameOver();
        lockBoard = true;
        if (Player1.points == Player2.points) {
            Player1.wins += 1;
            Player2.wins += 1;
            declare();
        } else if (Player1.points > Player2.points) {
            Player1.wins += 1;
            declare(Player1, "WIN");
        } else {
            Player2.wins += 1;
            declare(Player2, "WIN");
        }
    } else {
        lockBoard = true;
        let myPromise = new Promise(function(myResolve, myReject) {
            setTimeout(() => {
                switchTurns();
                updateTurn(turn);
                lockBoard = false;
                firstCard = null;
                secondCard = null;
            }, 900);

        });


        myPromise.then(function(value) {
            console.log("Score updated successfully")
        });
    }
    Player2.toJson();
    Player1.toJson();
    Player2.getRecord();
    Player1.getRecord();
}

//Declare of winner or tie
function declare(player = null, result = null) {
    console.log(player);
    const place = document.querySelector(".playerTurn");
    if (!player && !result) {
        place.innerHTML = "It's a tie!";
    } else if (result == "WIN") {
        place.innerHTML = `${player.name} Wins!`;
    }
}

//End game
function gameOver() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click", flipCard);
    }

}


function playAgain() {
    Player1.points = 0;
    Player2.points = 0;
    firstCard = null;
    secondCard = null;
    cardsUp = 0;
    lockBoard = false;

    board.theCards.forEach(({
        element
    }) => {
        element.classList.remove("flip");
    });

    Player1.getRecord();
    Player2.getRecord();


    let myPromise = new Promise(function(myResolve, myReject) {
        setTimeout(() => {
            turn = Player1;
            board.theCards.forEach(({
                element
            }) => element.remove());

            board.theCards = [];
            updateTurn(turn);
            initBoard(size);
            cards = document.querySelectorAll(".card");
            clickCads();
        }, 300);

    });


    myPromise.then(function(value) {
        console.log("Game restarted successfully")
    });
}

document.querySelector(".playAgain").addEventListener("click", playAgain);

Player1.showName();
Player2.showName();
updateTurn(turn);
Player1.getRecord();
Player2.getRecord();
initBoard(size);
let cards = document.querySelectorAll(".card");
clickCads();