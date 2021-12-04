class Board {
    //Board constructor
    constructor(size) {
        this.size = size;
        this.theCards = [];
        this.board = document.querySelector(".board");
        this.board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    }

    //Add card to board
    addCard(card) {
        this.theCards.push(card);
    }

    //Shuffle the cards on the board
    shuffle() {
        for (let i = this.theCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.theCards[i], this.theCards[j]] = [
                this.theCards[j],
                this.theCards[i],
            ];
        }

        for (let i = 0; i < this.theCards.length; i++) {
            this.board.appendChild(this.theCards[i].element);
        }
    }
}

//Giving access to "Board" from outside
export default Board;