const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('#score');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');



audioStart = new Audio('./soung/audio_theme.mp3');
audioGameOver = new Audio('./soung/audio_gameover.mp3');

let interval = null;
let playerScore = 0;
let isGameRunning = false;
let isGameOver = false;

const scoreCounter = () => {
  playerScore++;
  score.innerHTML = `Score: <b>${playerScore}</b>`;
}

const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'

  interval = setInterval(scoreCounter, 20);
  audioStart.play()
  

}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;
  audioStart.play()
  audioStart.currentTime = 0;

  
  playerScore = 0;
  score.innerHTML = `Score: <b>${playerScore}</b>`;
  isGameRunning = true;
  
  
}

const jump = () => {

  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)


}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'

      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()

      audioGameOver.play()

      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)

      gameOver.style.display = 'flex'

      clearInterval(loop);
      clearInterval(interval);
      isGameRunning = false;
      isGameOver = true;
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ' && isGameRunning) {
    jump();
  }

  else if (tecla === 'Enter') {
    if (!isGameRunning && !isGameOver) {
      startGame();
      isGameRunning = true;
      clearInterval(interval);
    }
    else if (isGameOver) {
      restartGame();
      isGameOver = false;
      isGameRunning = true;
      
    }
  }
})

document.addEventListener('keydown', e => {
  if (isGameRunning && e.key === 'Enter') {
    e.preventDefault(); // Isso impede a ação padrão da tecla "Enter".
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump()

  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
    restartGame()
    isGameRunning = true;
    
  }
})

const botao = document.getElementById("botao");

botao.addEventListener('click', () => {
  if (!isGameRunning) {
    startGame()
    restartGame()
    isGameRunning = true;
  }
});

