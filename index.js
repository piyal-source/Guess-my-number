'use strict';

// HTML elements initialized
const secretNumberElement = document.querySelector(".secret-number");
const guessElement = document.querySelector(".guess");
const highscoreElement = document.querySelector(".highscore");

// set score and highscore
let score = 20;
let highscore = 0;

// functions
function changeBgColor(color) {
    document.querySelector("body").style.backgroundColor = color;
}
function displayMessage(message) {
    document.querySelector(".message").textContent = message;
}
function displayScore() {
    document.querySelector(".score").textContent = score;
}
function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

// on opening/refreshing
document.querySelector(".between-max").textContent = score;
displayScore();
highscoreElement.textContent = highscore;
let randomNumber = getRandomNumber();

// On clicking Check button
document.querySelector(".btn-check").addEventListener("click", function (event) {
    event.preventDefault();
    const guessedNumber = Number(guessElement.value);
    // if no input given
    if (!guessedNumber) {
        displayMessage("⛔ Please enter a number!");
    }
    // if input given
    else {
        // lose, if the player can't guess in given attempts
        if (score <= 1) {
            displayMessage("😪 Sorry, You lost!");
            score = 0;
            displayScore();
            changeBgColor("#e62f2f");
        }
        //if input == secret number
        else if (guessedNumber === randomNumber) {
            displayMessage("🏆 Correct Number!");
            secretNumberElement.textContent = randomNumber;
            changeBgColor("#6ab321");
            if (score > highscore) {
                highscore = score;
                highscoreElement.textContent = highscore;
            }
        }
        // if input != secret number
        else {
            displayMessage(guessedNumber < randomNumber ? "📉 Too Low!" : "📈 Too High!");
            score--;
            displayScore();
        }
    }
});

// On clicking try again button
document.querySelector(".btn-retry").addEventListener("click", function () {
    randomNumber = getRandomNumber();
    score = 20;
    displayScore();
    secretNumberElement.textContent = "?";
    guessElement.value = "";
    changeBgColor("#222");
    displayMessage("Start Guessing...");
});