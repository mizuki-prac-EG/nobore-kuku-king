let a, b, correctAnswer;
let inputValue = "";

let score = 0;
let time = 60;
let combo = 0;
let level = 0;
let gameStarted = false;

let timerInterval;
let platformTimer;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const questionEl = document.getElementById("question");
const inputDisplay = document.getElementById("input-display");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const numberButtons = document.getElementById("number-buttons");

const world = document.getElementById("world");
const character = document.getElementById("character");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  generateQuestion();
});

function generateQuestion() {
  a = Math.floor(Math.random() * 9) + 1;
  b = Math.floor(Math.random() * 9) + 1;
  correctAnswer = a * b;
  questionEl.textContent = `${a} × ${b} = ?`;
  inputValue = "";
  inputDisplay.textContent = "";
}

for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("num-btn");

  btn.addEventListener("click", () => {
    inputValue += i;
    inputDisplay.textContent = inputValue;
    checkAnswer();
  });

  numberButtons.appendChild(btn);
}

function checkAnswer() {
  if (parseInt(inputValue) === correctAnswer) {

    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    score++;
    level++;
    combo++;

    scoreEl.textContent = score;

    time += 5;
    if (combo % 3 === 0) {
      time += 3;
    }

    // ジャンプ演出
    character.style.transform = "translate(-50%, -20px)";
    setTimeout(() => {
      character.style.transform = "translate(-50%, 0px)";
    }, 200);

    addPlatform();
    world.style.transform = `translateY(-${level * 50}px)`;

    resetPlatformTimer();
    generateQuestion();

  } else if (inputValue.length >= 2) {
    time -= 3;
    combo = 0;
    inputValue = "";
    inputDisplay.textContent = "";
  }

  timeEl.textContent = time;
}

function addPlatform() {
  const platform = document.createElement("div");
  platform.classList.add("platform");
  world.appendChild(platform);
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);

  resetPlatformTimer();
}

function resetPlatformTimer() {
  clearTimeout(platformTimer);
  platformTimer = setTimeout(() => {
    endGame();
  }, 10000);
}

function endGame() {
  clearInterval(timerInterval);
  clearTimeout(platformTimer);

  character.classList.add("fall");

  setTimeout(() => {
    alert(`ゲームオーバー！スコア: ${score}`);
    location.reload();
  }, 1000);
}