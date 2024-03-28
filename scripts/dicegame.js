const ROUND_COUNT = 3;
const DICE_COUNT = 2;
const ROLL_COUNT = 3;
var game = null;


// ------------ DICEGAME CLASS ------------
class DiceGame {
    constructor() {
        this.players = [];
        this.rounds = [];
        this.currentRound = 0;
    }
}
DiceGame.prototype.addRound = function(round) {
    this.rounds.push(round);
}
DiceGame.prototype.addPlayer = function(player) {
    this.players.push(player);
}
DiceGame.prototype.playRound = function() {
    let round = this.rounds[this.currentRound - 1];

    for (let i = 0; i < this.players.length; i++) {
        let player = this.players[i];
        let diceRoll = [];
        for (let j = 0; j < player.dice.length; j++) {
            player.dice[j].roll();
            diceRoll.push(player.dice[j].face);
        }
        round.pushResults(player, diceRoll)
    }

    this.currentRound += 1;

    round.getWinner();
    round.displayResults();

    if (this.currentRound > ROLL_COUNT) {
        let rollDiceButton = document.getElementById("button__roll-dice");
        rollDiceButton.classList.add("hidden");
        rollDiceButton.disabled = true;
        this.displayResults();
    }
}
DiceGame.prototype.displayResults = function() {
    let player1score = Number(document.getElementById("player1-score-total").innerHTML);
    let player2score = Number(document.getElementById("player2-score-total").innerHTML);

    let gameResult = "It's a tie!"
    if (player1score > player2score) {
        gameResult = "Congratulations, you won!"
    } else if (player1score < player2score) {
        gameResult = "Oh no! You lost."
    }

    document.getElementById("text__game-results").innerHTML = gameResult + " Play again?";
}

// ------------ ROUND CLASS ------------
class Round {
    constructor(roundNum) {
        this.number = roundNum;
        this.results = {};
        this.winner = null;
    }
}
Round.prototype.pushResults = function(player, dice) {
    console.log("player=" + player.id);
    console.log("dice=" + dice);
    let score = 0;
    let dice1 = dice[0];
    let dice2 = dice[1];
    if (dice1 == 1 || dice2 == 1) {
        // If any of the players two dice comes up as a 1 then the score for that round for the player is 0
        score = 0;
    } else if (dice1 == dice2) {
        // If the player rolls a pair of the same numbers then the players score is the total of the two dice times 2
        score = (dice1 + dice2) * 2;
    } else {
        // If the player rolls any other combination of dice other t
        score = dice1 + dice2;
    }
    console.log("score=" + score);
    this.results[player.id] = {"dice": dice, "score": score};
}
Round.prototype.getWinner = function() {
    let topScore = 0;
    let topPlayer = null;
    for (let [player, result] of Object.entries(this.results)) {
        if (result.score > topScore) {
                topScore = result.score;
                topPlayer = player;
            } else if (topPlayer != null && result.score == topScore) {
                // tie
                console.log("It's a tie!");
        }
    }
    this.winner = topPlayer;
    console.log("winner=" + this.winner);
}
Round.prototype.displayResults = function() {
    for (let [player, result] of Object.entries(this.results)) {
        document.getElementById(`${player}-score-round`).innerHTML = result.score;
        let currentScore = Number(document.getElementById(`${player}-score-total`).innerHTML);
        document.getElementById(`${player}-score-total`).innerHTML = currentScore + result.score;

        if (player == this.winner) {
            document.getElementById(`${player}-round-result`).innerHTML = "WIN!";
        }
    }
}


// ------------ PLAYER CLASS ------------
class Player {
    constructor(player, isComputer = false) {
        this.id = player;
        this.computer = isComputer;
        this.name = 
        this.dice = [];
    }
}
Player.prototype.addDie = function(die) {
    // Adds a die to the player
    this.dice.push(die);
}


// ------------ DIE CLASS ------------
class Die {
    constructor(element, numSides = 6) {
        this.img = element;
        this.img.style.opacity = 0;
        this.sides = numSides;
        this.face = 1;
        // update imgs
        this.img.src = this.getImageSrc();
        this.img.alt = this.getImageAlt();
        fade(this.img, 1000);
    }
}
Die.prototype.getImageSrc = function() {
    return `../images/dice/dice-${this.face}.png`;
}
Die.prototype.getImageAlt = function() {
    return `Dice face ${this.face}`;
}
Die.prototype.roll = function() {
    this.face = Math.floor(Math.random() * this.sides) + 1;
    this.img.style.opacity = 0;
    this.img.src = this.getImageSrc();
    this.img.alt = this.getImageAlt();
    fade(this.img, 1000);
}


// ------------ FUNCTIONS ------------
function newGame() {
    console.log("Creating new game");

    game = new DiceGame();
    document.getElementById("header__game").innerHTML = "Press Start";
    let newGameButton = document.getElementById("button__new-game");
    newGameButton.disabled = true;
    newGameButton.classList.add("hidden");
    let rollDiceButton = document.getElementById("button__roll-dice");
    rollDiceButton.innerHTML = "Start";
    rollDiceButton.classList.remove("hidden");
    rollDiceButton.disabled = false;
    
    document.getElementById("container__player1--score-text").classList.add("hidden");
    document.getElementById("container__player2--score-text").classList.add("hidden");
    document.getElementById("player1-round-result").innerHTML = "";
    document.getElementById("player2-round-result").innerHTML = "";
    document.getElementById("text__game-results").innerHTML = "";

    for (let i = 1; i <= ROUND_COUNT; i++) {
        game.addRound(new Round(i));
    }

    let player1 = new Player("player1");
    let player2 = new Player("player2", true); // computer

    for (let i = 1; i <= DICE_COUNT; i++) {
        player1.addDie(new Die(document.getElementById(`img__player1--die${i}`)));
        player2.addDie(new Die(document.getElementById(`img__player2--die${i}`)));
    }

    game.addPlayer(player1);
    game.addPlayer(player2);
}

function rollDice() {
    if (game == null) {
        newGame();
    }

    if (game.currentRound == 0) {
        console.log("Initializing game");
        let newGameButton = document.getElementById("button__new-game");
        newGameButton.disabled = false;
        newGameButton.classList.remove("hidden");
        let rollDiceButton = document.getElementById("button__roll-dice");
        rollDiceButton.innerHTML = "Roll Dice";
        document.getElementById("container__player1--score-text").classList.remove("hidden");
        document.getElementById("container__player2--score-text").classList.remove("hidden");
        document.getElementById("player1-score-round").innerHTML = 0;
        document.getElementById("player2-score-round").innerHTML = 0;
        document.getElementById("player1-score-total").innerHTML = 0;
        document.getElementById("player2-score-total").innerHTML = 0;

        game.currentRound += 1;
    } else {
        console.log("Rolling Dice!");
        document.getElementById("header__game").innerHTML = `Round ${game.currentRound}`;
        document.getElementById("player1-round-result").innerHTML = "";
        document.getElementById("player2-round-result").innerHTML = "";

        console.log("Round " + game.currentRound);
        game.playRound();
    }
}

function fade(elem, speed) {
    let outInterval = setInterval(function() {
        elem.style.opacity -= 0.02;
        if (elem.style.opacity <= 0) {
            clearInterval(outInterval);
            let inInterval = setInterval(function() {
                elem.style.opacity = Number(elem.style.opacity) + 0.02;
                if (elem.style.opacity >= 1)
                    clearInterval(inInterval);
            }, speed / 50 );
        }
    }, speed / 50 );
}
