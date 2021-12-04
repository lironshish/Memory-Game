//Import module
import Player from "./modules/Player.mjs";

const submit = document.querySelector(".submit");
const inputs = document.querySelectorAll(".text-input");
const inputsRadio = document.getElementsByName("size");

//Get players name
const getText = (input) => input.value;
//Get size board
const getSize = (buttons) => {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
            return Number(buttons[i].value);
        }
    }
};

submit.addEventListener("click", () => {
    const inputsArr = [...inputs];
    const Player1 = new Player(getText(inputsArr[0]), "player1");
    const Player2 = new Player(getText(inputsArr[1]), "player2");
    const size = getSize(inputsRadio);
    const stoarge = window.localStorage;
    stoarge.setItem("size", JSON.stringify(size));
    stoarge.setItem("player1", JSON.stringify(Player1));
    stoarge.setItem("player2", JSON.stringify(Player2));
    console.log(Player1);
    location.href = "./GamePage/game.html";
});