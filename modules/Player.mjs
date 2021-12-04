class Player {
    //Player constructor 
    constructor(name, playerType) {
        this.name = name;
        this.playerType = playerType;
        this.wins = 0;
        this.points = 0;
    }

    //Show the wins and the points of each player
    getRecord() {
        const playerWins = document.querySelector(
            `.${this.playerType}-wins`
        );
        playerWins.innerHTML = this.wins;

        const playerPoints = document.querySelector(
            `.${this.playerType}-points`
        );
        playerPoints.innerHTML = this.points;

    }

    //Show name player
    showName() {
        const playerH3 = document.querySelector(
            `.${this.playerType}-h3`);
        playerH3.innerHTML = this.name;
    }

    //Save the data on JSON file
    toJson() {
        localStorage.setItem(this.playerType, JSON.stringify(this));
    }
}
//Giving access to "Player" from outside
export default Player;