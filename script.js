'use strict'

//HTML Elements

//Score Elements
const elementScore0 = document.getElementById('score--0');
const elementScore1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');

//Buttons
const newGameBtn = document.querySelector('.btn--new');
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//Setting up Initial Conditions for the Game
elementScore0.textContent = 0;
elementScore1.textContent = 0;
diceElement.classList.add('hidden');

let currScore = 0;
let totalScores = [0, 0];

//Switching Players function
const switchPlayer = () => {
    if (elementPlayer0.classList.contains('player--active')) {
        elementPlayer0.classList.remove('player--active');
        elementPlayer1.classList.add('player--active');
        currentScore0.textContent = 0;
        currScore = 0;

    } else {
        elementPlayer1.classList.remove('player--active');
        elementPlayer0.classList.add('player--active');
        currentScore1.textContent = 0;
        currScore = 0;

    }
}

//Finish Game function
const endGame = () => {
    holdBtn.disabled = true;
    diceRollBtn.disabled = true;
    diceElement.classList.add('hidden');
}


//Roll Dice Button Event Listener
diceRollBtn.addEventListener('click', () => {
    //1. Generate a random dice number
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2. Remove the 'hidden' class and display dice image according to it.
    diceElement.classList.remove('hidden');
    diceElement.setAttribute('src', `dice-${dice}.png`);

    //3. Check if the dice is 1. If it is 1, switch the 'active--player' class.
    if (dice === 1) {
        switchPlayer();
    } else {
        currScore += dice;
        if (elementPlayer0.classList.contains('player--active')) {
            currentScore0.textContent = currScore
        } else {
            currentScore1.textContent = currScore
        }
    }
})

//Hold Button Event Listener
holdBtn.addEventListener('click', () => {
    if (elementPlayer0.classList.contains('player--active')) {
        totalScores[0] += currScore;
        elementScore0.textContent = totalScores[0];
        if (totalScores[0] <= 20) {
            switchPlayer();
        } else {
            elementPlayer0.classList.add('player--winner');
            elementPlayer0.classList.remove('player--active');
            endGame();
        }
    } else {
        totalScores[1] += currScore;
        elementScore1.textContent = totalScores[1];
        if (totalScores[1] <= 20) {
            switchPlayer();
        } else {
            elementPlayer1.classList.add('player--winner');
            elementPlayer1.classList.remove('player--active');
            endGame();
        }
    }
})

//Resetting the Game
newGameBtn.addEventListener('click', () => {
    //1. Setting current and total scores of both players equal to 0.
    currScore = 0;
    totalScores = [0, 0];

    elementScore0.textContent = 0;
    elementScore1.textContent = 0;

    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    //2. Remove 'player--winner' and 'player--active' class and add 'player--active' on Player0
    elementPlayer0.classList.remove('player--winner');
    elementPlayer1.classList.remove('player--winner');
    elementPlayer1.classList.remove('player--active');
    elementPlayer0.classList.add('player--active');

    //3. Enable 'Roll Dice' and 'Hold' buttons
    diceRollBtn.disabled = false;
    holdBtn.disabled = false;

    //5. Check if the dice contain 'hidden' class, if not add it.
    if (!diceElement.classList.contains('hidden')) {
        diceElement.classList.add('hidden')
    }
})