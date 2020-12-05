let scores,
  turn,
  roundScore,
  rolledScore,
  rolledScore2,
  winner,
  diceImage,
  previousRoll,
  maxScore;
init();

document.querySelector('.btn--roll').addEventListener('click', () => {
  if (!winner) {
    rolledScore = Math.floor(Math.random() * 6) + 1;
    rolledScore2 = Math.floor(Math.random() * 6) + 1;
    diceImage.src = 'dice-' + rolledScore + '.png';
    diceImage2.src = 'dice-' + rolledScore2 + '.png';
    diceImage.style = 'block';
    diceImage2.style = 'block';

    if (rolledScore === 6 && rolledScore2 === 6) {
      document.getElementById('score--' + turn).textContent = '0';
      document.getElementById('current--' + turn).textContent = '0';
      scores[turn] = 0;
      roundScore = 0;
      turn = 1 - turn;
      changeActive();
    } else if (rolledScore !== 1 && rolledScore2 != 1) {
      //increase round score for current player
      roundScore += rolledScore + rolledScore2;
      document.querySelector('#current--' + turn).textContent = roundScore;
    } else {
      //reset roundScore
      diceImage.style.display = 'none';
      diceImage2.style.display = 'none';
      roundScore = 0;
      previousRoll = 0;
      document.querySelector('#current--' + turn).textContent = '0';

      //change turn

      turn = 1 - turn;
      changeActive();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
  scores[turn] += roundScore; //add current round score
  roundScore = 0;

  if (!winner) {
    // No winner yet
    if (scores[turn] >= maxScore) {
      //winning condition
      //player wins
      winner = 1;
      document.getElementById('score--' + turn).textContent = scores[turn];
      //hide dice image
      diceImage.style.display = 'none';
      diceImage2.style.display = 'none';
      document.querySelector('.player--' + turn).classList.add('winner');
      document.getElementById('name--' + turn).textContent = 'Winner!';
    } else {
      //hold add scores to active player
      document.getElementById('score--' + turn).textContent = scores[turn];
      turn = 1 - turn;
    }

    document.getElementById('current--0').textContent = '0'; //reset current score after hold score is added
    document.getElementById('current--1').textContent = '0';
    if (!winner) changeActive(); //change active player
  }
});

document.querySelector('.btn--new').addEventListener('click', () => {
  init();
});

document.querySelector('.scoreinput').addEventListener('keyup', e => {
  maxScore = e.target.value;
});

function changeActive() {
  document.querySelector('.player--0').classList.toggle('player--active'); //change active player
  document.querySelector('.player--1').classList.toggle('player--active');
}

function init() {
  scores = [0, 0]; //player 1 and plater 2 score
  turn = 0; //Game starts with player 1's turn
  roundScore = 0;
  rolledScore = 0;
  winner = 0;
  maxScore = 100;

  //Initially hide the dice
  diceImage = document.querySelector('.dice');
  diceImage2 = document.querySelector('.dice--2');
  diceImage.style.display = 'none';
  diceImage2.style.display = 'none';

  //reset input field custom maxScore
  document.querySelector('.scoreinput').value = '';

  //reset initial scores
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;

  //player 0 initially starts the game
  document.querySelector('.player--0').classList.remove('player--active'); //change active player
  document.querySelector('.player--0').classList.add('player--active'); //first remove(if it exists) then add
  document.querySelector('.player--1').classList.remove('player--active');

  //Reset player names
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  //remove any winner class
  document.querySelector('.player--0').classList.remove('winner');
  document.querySelector('.player--1').classList.remove('winner');
  document.getElementById('name--' + turn).textContent = 'Player ' + (turn + 1);
}
