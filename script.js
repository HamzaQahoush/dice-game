'use strict';

//selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let playing;
let scores;
let currentScore;
let activePlayer;
//starting conditions
function start() {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score1.textContent = 0;
  score0.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
start();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  // 1. Generate a randome dice function
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `./img/dice-${dice}.png`);

    // 3. check the rolled dice if 1  then switch

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. add current score to active player's score

  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //scores[1]= scores[1]+current score

    //2. check if player's score is >=100
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  //finish the game
});

btnNew.addEventListener('click', start);
