console.log("Hello")

let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board")
const result_div = document.querySelector(".result p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");

const outcomes = ["Tie!", "Rock (user) crushes scissors (computer)!",
    "Paper (user) covers rock (computer)!",
    "Scissors (user) cut paper (computer)!",
    "Rock (computer) crushes scissors (user)!",
    "Paper (computer) covers rock (user)!",
    "Scissors (computer) cut paper (user)!"];

const results = ["You win!", "You lose!", "It's a draw"];
let result = "Chose option to start game!"

function getComputerChoice(){
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function main(){
    rock_div.addEventListener("click", function() {
        game("r");
    });

    paper_div.addEventListener("click", function() {
        game("p");
    });

    scissor_div.addEventListener("click", function() {
        game("s");
    });
}

function userWins(choices) {
    userScore++;
    switch (choices) {
        case "rs":
            result = outcomes[1] + " " + results[0];
            break;
        case "pr":
            result = outcomes[2] + " " + results[0];
            break;
        case "sp":
            result = outcomes[3] + " " + results[0];
    }
    document.getElementById(choices[0]).classList.add("green-glow")
    setTimeout(function () {
        document.getElementById(choices[0]).classList.remove("green-glow")
    }, 300);
    render()
    console.log("WIN")
}

function computerWins(choices) {
    computerScore++;
    switch (choices) {
        case "sr":
            result = outcomes[4] + " " + results[1];
            break;
        case "rp":
            result = outcomes[5] + " " + results[1];
            break;
        case "ps":
            result = outcomes[6] + " " + results[1];
    }
    document.getElementById(choices[0]).classList.add("red-glow")
    setTimeout(function () {
        document.getElementById(choices[0]).classList.remove("red-glow")
    }, 300);
    render()
    console.log("LOSE")
}

function draw(choices) {
    result = outcomes[0] + " " + results[2];
    document.getElementById(choices[0]).classList.add("gray-glow")
    setTimeout(function () {
        document.getElementById(choices[0]).classList.remove("gray-glow")
    }, 300);
    render()
    console.log("DRAW")
}

function render(){
    userScore_span.innerText = userScore.toString();
    computerScore_span.innerText = computerScore.toString();
    result_div.innerText = result;
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    const choices = userChoice + computerChoice
    switch (choices) {
        case "rs":
        case "pr":
        case "sp":
            userWins(choices);
            break;
        case "sr":
        case "ps":
        case "rp":
            computerWins(choices);
            break;
        default:
            draw(choices);
            break;
    }
}

main();