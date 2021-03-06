const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

function computerPlay() {
    let rand = Math.random() * 3;
    rand = Math.floor(rand);

    switch (rand) {
        case 0:
            return ROCK;

        case 1:
            return PAPER;

        case 2:
            return SCISSORS;

        default:
            return;
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    if (playerSelection != ROCK &&
        playerSelection != PAPER &&
        playerSelection != SCISSORS) {
        return -1;
    }

    if (computerSelection != ROCK &&
        computerSelection != PAPER &&
        computerSelection != SCISSORS) {
        return -2;
    }

    if (playerSelection == computerSelection) {
        return 0;
    } else if (playerSelection == ROCK && computerSelection == PAPER ||
                playerSelection == PAPER && computerSelection == SCISSORS ||
                playerSelection == SCISSORS && computerSelection == ROCK) {
        return 1;
    } else {
        return 2;
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    let round = 0;
    console.group(`Round ${round + 1}`);

    let result = resolveRound();

    switch (result) {
        case -1:
            console.groupEnd(`Round ${round + 1}`);
            console.log("Abort match...");
            return;

        case 1:
            computerScore++;
            break;

        case 2:
            playerScore++;
            break;

        default:
            break;
    }

    console.log(`You: ${playerScore} - ${computerScore} :Computer`);
    console.groupEnd(`Round ${round + 1}`);

    round++;
    console.group(`Round ${round + 1}`);

    result = resolveRound();

    switch (result) {
        case -1:
            console.groupEnd(`Round ${round + 1}`);
            console.log("Abort match...");
            return;

        case 1:
            computerScore++;
            break;

        case 2:
            playerScore++;
            break;

        default:
            break;
    }

    console.log(`You: ${playerScore} - ${computerScore} :Computer`);
    console.groupEnd(`Round ${round + 1}`);

    round++;
    console.group(`Round ${round + 1}`);

    result = resolveRound();

    switch (result) {
        case -1:
            console.groupEnd(`Round ${round + 1}`);
            console.log("Abort match...");
            return;

        case 1:
            computerScore++;
            break;

        case 2:
            playerScore++;
            break;

        default:
            break;
    }

    console.log(`You: ${playerScore} - ${computerScore} :Computer`);
    console.groupEnd(`Round ${round + 1}`);

    round++;
    console.group(`Round ${round + 1}`);

    result = resolveRound();

    switch (result) {
        case -1:
            console.groupEnd(`Round ${round + 1}`);
            console.log("Abort match...");
            return;

        case 1:
            computerScore++;
            break;

        case 2:
            playerScore++;
            break;

        default:
            break;
    }

    console.log(`You: ${playerScore} - ${computerScore} :Computer`);
    console.groupEnd(`Round ${round + 1}`);

    round++;
    console.group(`Round ${round + 1}`);

    result = resolveRound();

    switch (result) {
        case -1:
            console.groupEnd(`Round ${round + 1}`);
            console.log("Abort match...");
            return;

        case 1:
            computerScore++;
            break;

        case 2:
            playerScore++;
            break;

        default:
            break;
    }

    console.log(`You: ${playerScore} - ${computerScore} :Computer`);
    console.groupEnd(`Round ${round + 1}`);

    console.log("MATCH OVER");
    
    const finalScore = `[${playerScore} - ${computerScore}]`;

    if (playerScore == computerScore) {
        console.log(`It's a draw match! ${finalScore}`)
    } else if (playerScore < computerScore) {
        console.log(`You lose the match! ${finalScore}`)
    } else {
        console.log(`You win the match! ${finalScore}`)
    }
}

function resolveRound() {
    let playerSelection = prompt("Your Selection...");

    if (playerSelection === null) {
        return -1;
    }

    let computerSelection = computerPlay();

    const result = playRound(playerSelection, computerSelection);

    if (result == -1) {
        console.log(`Invalid player selection: ${playerSelection}`)
        console.log("Try again...")
        return resolveRound();
    }

    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    console.log(`You selected: ${playerSelection}...`);
    console.log(`Computer selected: ${computerSelection}...`);

    switch (result) {
        case 0:
            console.log("It's a draw");
            return 0;

        case 1:
            console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
            return 1;

        case 2:
            console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
            return 2;

        default:
            console.error(`Invalid round result: ${result}`);
            return;
    }
}

function capitalize(s) {
    if (!s) {
        return "";
    }

    if (s.length == 1){
        return s.toUpperCase();
    } else {
        let firstLetter = s.charAt(0);
        firstLetter = firstLetter.toUpperCase();

        let theRest = s.substr(1);
        theRest = theRest.toLowerCase();

        return firstLetter + theRest;
    }
}