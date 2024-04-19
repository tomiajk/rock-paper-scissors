let score = JSON.parse(localStorage.getItem('score')) || {
  player: 0,
  computer: 0
};

const playerChoice = document.querySelector('.js-player-choice');
const computerChoice = document.querySelector('.js-computer-choice');
const result = document.querySelector('.js-result-text');
const playAgainButton = document.querySelector('.play-again-button');
const gameSection = document.querySelector('.js-game-section');
const gameResultSection = document.querySelector('.js-game-result-section');
const resultSection = document.getElementById('result-section');
const autoPlayElement = document.querySelector('.js-auto-play-button');

resultSection.style.display = 'none';
updateScoreElement();

// ------------- Event Listeners -------------------------------
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock')
  });

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('Paper')
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('Scissors')
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
})

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    score.player = 0;
    score.computer = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

autoPlayElement.addEventListener('click', () => {
  autoPlay();
})

playAgainButton.addEventListener('click', () => {
  gameSection.classList.remove('off-game-section');
  resultSection.style.display = 'none';
});
// --------------------------- End Event Listners -----------------------

// -------------- Auto Play -------------------
let intervalID;
let isAutoPlaying = false;

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayElement.classList.add('auto-playing-style');
    autoPlayElement.innerHTML = 'Stop Play';
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      const computerMove = pickComputerMove();
      playGame(playerMove, computerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoPlayElement.classList.remove('auto-playing-style');
    autoPlayElement.innerHTML = 'Auto Play';
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}
// ---------------------------End Auto Play------------------------------

function playGame(playerMove) {
  resultSection.style.display = '';
  let winner = '';
  const computerMove = pickComputerMove();
  result.innerHTML = '';
  if (computerMove === playerMove){
      result.innerHTML = "IT'S A TIE";
  } else if ((playerMove === 'Rock' && computerMove === 'Scissors') || (playerMove === 'Paper' && computerMove === 'Rock') || (playerMove === 'Scissors' && computerMove === 'Paper')){
      result.innerHTML = `YOU WIN`;
      score.player ++;
      winner = 'player';
  } else {
      result.innerHTML = `YOU LOSE`;
      score.computer ++;
      winner = 'computer'
  }

  gameSection.classList.add('off-game-section')
  displayResult(playerMove, computerMove, winner);
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-player-score').innerHTML = `${score.player}`;
  document.querySelector('.js-computer-score').innerHTML = `${score.computer}`
}


function pickComputerMove(){
  let computerMove = '';
  const randomNum = Math.random();
  if (randomNum >= 0 && randomNum <= (1/3)) {
      computerMove = 'Rock';
  } else if (randomNum > (1/3) && randomNum <= (2/3)) {
      computerMove = 'Paper';
  } else {
      computerMove = 'Scissors';
  }
  return computerMove;
}

function displayResult(player, computer, winner) {
  
  playerChoice.innerHTML = `
  <div class="ripple ripple-1 js-player-ripple">
    <div class="ripple ripple-2 js-player-ripple">
      <div class="ripple ripple-3 js-player-ripple">
        <p>YOU PICKED</p>
        <button class="player-button play-button js-player-choice">
          <img src="images/${player}-emoji.png" title="Rock-emoji" class="play-icon rock">
        </button>
      </div>
    </div>
  </div>`;

  computerChoice.innerHTML = `
  <div class="ripple ripple-1 js-computer-ripple">
    <div class="ripple ripple-2 js-computer-ripple">
      <div class="ripple ripple-3 js-computer-ripple">
        <p>COMPUTER PICKED</p>
        <button class="computer-button play-button js-computer-choice">
          <img src="images/${computer}-emoji.png" title="Rock-emoji" class="play-icon rock">
        </button>
      </div>
    </div>
  </div>`;

  const computerRipple = document.querySelectorAll('.js-computer-ripple');
  const playerRipple = document.querySelectorAll('.js-player-ripple');
  const allRipples = document.querySelectorAll('.ripple');
  
  offRipple(allRipples);

  if (winner === 'player') {
    createRipple(playerRipple); 
  } else if (winner === 'computer') {
    createRipple(computerRipple)
  }
}

function createRipple(winingElement) {
  // Create the ripples for the wining element
  winingElement.forEach(element => {
    element.classList.remove('off-ripple');
  });
}

function offRipple(ripples) {
  // Put off all ripples
  ripples.forEach(ripple => {
    ripple.classList.add('off-ripple');
  });
}