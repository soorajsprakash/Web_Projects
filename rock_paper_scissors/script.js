
let totalScore = {
    computerScore: 'N/A',
    playerScore: 0
}

// DOM stuffs
const player_score_div = document.querySelector('#playerScore');
const hands_div = document.querySelector('#hands');
const result_div = document.querySelector('#result');
const reset_div = document.querySelector('#reset-btn')

// OnClick Listeners to the R-P-S Buttons
const rpsButtons = document.querySelectorAll('.rps-buttons')
for (let button of rpsButtons) {
    button.addEventListener('click', () => {
        onClickRPS(button.value);
    })
}
reset_div.addEventListener('click', () => {
    totalScore.playerScore = 0;
    hands_div.innerText = '';
    player_score_div.innerText = '';
    result_div.innerText = '';
})


// Generate Computer Choice
function getComputerChoice() {
    const rpsChoice = ['Rock', 'Paper', 'Scissors'];
    const randomNum = Math.floor(Math.random() * 3);
    return rpsChoice[randomNum];
}


// Get result after comparing Player & Computer choice
let score;
const getResult = (playerChoice, computerChoice) => {

    if (playerChoice === computerChoice) {
        score = 0;
    }
    else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
        score = 1
    }
    else if (playerChoice === 'Paper' && computerChoice === 'Rock') {
        score = 1
    }
    else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {
        score = 1
    }
    else {
        score = -1;
    }
    return score;
}


// Function that works after a user clicks a button
// THE BRAIN
const onClickRPS = (playerChoice) => {

    const computerChoice = getComputerChoice();
    const score = getResult(playerChoice, computerChoice);

    console.log(`Player Choice: ${playerChoice}`)
    console.log(`Computer Choice: ${computerChoice}`)
    console.log(`Score: ${score}`)

    totalScore['playerScore'] += score;
    console.log(totalScore)
    showResult(score, playerChoice, computerChoice)
}


// DOM manipulation --> Update Score on screen
const showResult = (score, playerChoice, computerChoice) => {
    switch (score) {
        case -1:
            result_div.innerText = 'You Lose!';
            break;
        case 0:
            result_div.innerText = 'TIE!';
            break;
        case 1:
            result_div.innerText = 'You Won!';
            break;
    }
    hands_div.innerText = `🥷🏽:${playerChoice} v/s 💻:${computerChoice}`;
    player_score_div.innerText = `Score: ${totalScore.playerScore}`
}
