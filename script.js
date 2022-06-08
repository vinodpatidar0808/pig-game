'use strict';

// selecting elements, El is to distinguish between elements and their values
const score0El = document.querySelector('#score--0');
// to select a specific id , getElementById is slightly faster than querySelector
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// scores stores the total score for both players
let scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;

const init = () => {
    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currScore = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
};

init();

const switchPlayer = () => {
    currScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // toggle method of classlist do both thing if class is applied it remove the class and if class is not there it will add the class to the element
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// roll the dice
btnRoll.addEventListener('click', () => {
    if (playing) {
        //1. generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2 display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. check for the rolled dice if 1  change the player
        if (dice !== 1) {
            // add dice to current score
            currScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

// holding the current score in total score
btnHold.addEventListener('click', () => {
    // 1. add current score to active player's score
    if (playing) {
        scores[activePlayer] += currScore;
        currScore = 0;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. check  current player's score whether it is below 100 or above 100 if above 100 then player wins
        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
