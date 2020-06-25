const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const RESULT_INVALID_COMPUTER_SELECTION = -2;
const RESULT_INVALID_PLAYER_SELECTION = -1;
const RESULT_DRAW = 0;
const RESULT_LOSE = 1;
const RESULT_WIN = 2;

game();

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
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection != ROCK &&
        playerSelection != PAPER &&
        playerSelection != SCISSORS) {
        return RESULT_INVALID_PLAYER_SELECTION;
    }

    if (computerSelection != ROCK &&
        computerSelection != PAPER &&
        computerSelection != SCISSORS) {
        return RESULT_INVALID_COMPUTER_SELECTION;
    }

    if (playerSelection == computerSelection) {
        return RESULT_DRAW;
    } else if (playerSelection == ROCK && computerSelection == PAPER ||
                playerSelection == PAPER && computerSelection == SCISSORS ||
                playerSelection == SCISSORS && computerSelection == ROCK) {
        return RESULT_LOSE;
    } else {
        return RESULT_WIN;
    }
}

function game() {
    let round = 0;
    let playerScore = 0;
    let computerScore = 0;

    const playerScoreSpan = document.querySelector('#player-score');
    const computerScoreSpan = document.querySelector('#computer-score');

    const logHeader = document.querySelector('#log-header');
    const log = document.querySelector('#log');
    log.textContent = '\n\n\n\n'; // preemtively create height

    const selectionList = document.querySelectorAll('.selection');
    selectionList.forEach(function (item) {
        item.addEventListener('click', playerSelect);
    });

    function playerSelect(e) {
        let playerSelection = e.target.getAttribute('data-selection');
        let computerSelection = computerPlay();

        const roundResult = playRound(playerSelection, computerSelection);

        if (roundResult == RESULT_INVALID_PLAYER_SELECTION) {
            console.error(`Invalid player selection: ${playerSelection}`);
            return;
        }

        logRound(roundResult, playerSelection, computerSelection);
        updateMatch(roundResult);
    }

    function logRound(roundResult, playerSelection, computerSelection) {
        logHeader.textContent = `Round ${round + 1}`;
    
        playerSelection = capitalize(playerSelection);
        computerSelection = capitalize(computerSelection);
    
        log.textContent = `You selected: ${playerSelection}...`;
        log.textContent += `\nComputer selected: ${computerSelection}...`;
    
        switch (roundResult) {
            case RESULT_DRAW:
                log.textContent += "\nIt's a draw"
                break;
    
            case RESULT_LOSE:
                log.textContent += `\nYou Lose! ${computerSelection} beats ${playerSelection}`;
                break;
    
            case RESULT_WIN:
                log.textContent += `\nYou Win! ${playerSelection} beats ${computerSelection}`;
                break;
    
            default:
                console.error(`Invalid round result: ${roundResult}`);
                return;
        }
    }

    function updateMatch(roundResult) {
        switch (roundResult) {
            case RESULT_DRAW:
                break;
    
            case RESULT_LOSE:
                computerScore++;
                computerScoreSpan.textContent = computerScore;
                break;
    
            case RESULT_WIN:
                playerScore++;
                playerScoreSpan.textContent = playerScore;
                break;
    
            default:
                console.error(`Invalid round result: ${roundResult}`);
                return;
        }

        round++;

        if (playerScore >= 5 || computerScore >= 5) {
            finishMatch();
        }
    }

    function finishMatch() {
        selectionList.forEach(function (item) {
            item.disabled = true;
            item.blur(); // remove focus
        });

        const matchOverString = '\n\nMATCH OVER.';

        const finalScore = `[${playerScore} - ${computerScore}]`;

        if (playerScore == computerScore) {
            log.textContent += `${matchOverString} It's a draw match! ${finalScore}`;
        } else if (playerScore < computerScore) {
            log.textContent += `${matchOverString} You lose the match! ${finalScore}`;
        } else {
            log.textContent += `${matchOverString} You win the match! ${finalScore}`;
        }
    }
}

function capitalize(s) {
    if (!s) {
        return '';
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