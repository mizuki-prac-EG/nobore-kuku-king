let a, b, correctAnswer;
let inputValue = "";

let score = 0;
let time = 60;
let level = 0;
let gameStarted = false;

let timerInterval;
let countdownInterval;
let countdownTime = 10.0;

const colors = ["red", "orange", "blue", "purple", "pink"];

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const bgm = document.getElementById("bgm");
const correctSE = document.getElementById("correct-se");
const wrongSE = document.getElementById("wrong-se");

const questionEl = document.getElementById("question");
const inputDisplay = document.getElementById("input-display");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const countdownEl = document.getElementById("countdown");

const centerMessage = document.getElementById("center-message");
const resultMark = document.getElementById("result-mark");

const numberButtons = document.getElementById("number-buttons");
const deleteBtn = document.getElementById("delete-btn");
const enterBtn = document.getElementById("enter-btn");

const character = document.getElementById("character");
const ground = document.getElementById("ground");
let platformTop = document.getElementById("platformTop");
let platformBottom = document.getElementById("platformBottom");

startBtn.addEventListener("click", startGame);
backBtn.addEventListener("click", returnToTitle);

function startGame() {

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  bgm.currentTime = 0;
  bgm.play();

  resetGame();

  centerMessage.textContent = "START!";
  setTimeout(() => centerMessage.textContent = "", 1500);

  platformTop.style.backgroundColor = getRandomColor();
  generateQuestion();
}

function returnToTitle() {

  clearInterval(timerInterval);
  clearInterval(countdownInterval);

  bgm.pause();

  gameScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function resetGame() {

  score = 0;
  time = 60;
  level = 0;
  gameStarted = false;

  scoreEl.textContent = score;
  timeEl.textContent = time;

  ground.style.display = "block";
  platformBottom.style.display = "none";
  character.style.bottom = "10px";
}

function getRandomColor(excludeColor = null) {
  let newColor;
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === excludeColor);
  return newColor;
}

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
  btn.onclick = () => {
    if (inputValue.length < 2) {
      inputValue += i;
      inputDisplay.textContent = inputValue;
    }
  };
  numberButtons.appendChild(btn);
}

deleteBtn.onclick = () => {
  inputValue = inputValue.slice(0, -1);
  inputDisplay.textContent = inputValue;
};

enterBtn.onclick = () => checkAnswer();

function checkAnswer() {

  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (parseInt(inputValue) === correctAnswer) {

    correctSE.currentTime = 0;
    correctSE.play();

    showResult("〇", "green");

    score++;
    level++;

    if (level === 1) {
      ground.style.display = "none";
      platformBottom.style.display = "block";
      character.style.bottom = "60px";
    }

    scoreEl.textContent = score;
    time += 5;

    swapPlatforms();
    resetCountdown();
    generateQuestion();

  } else {

    wrongSE.currentTime = 0;
    wrongSE.play();

    showResult("✕", "red");
  }

  inputValue = "";
  inputDisplay.textContent = "";
}

function showResult(mark, color) {
  resultMark.textContent = mark;
  resultMark.style.color = color;
  setTimeout(() => resultMark.textContent = "", 800);
}

function swapPlatforms() {
  const prevColor = platformTop.style.backgroundColor;
  platformBottom.style.backgroundColor = prevColor;
  platformTop.style.backgroundColor = getRandomColor(prevColor);
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);

  startCountdown();
}

function startCountdown() {
  countdownTime = 10.0;
  countdownEl.textContent = countdownTime.toFixed(2);

  countdownInterval = setInterval(() => {
    countdownTime -= 0.01;
    countdownEl.textContent = countdownTime.toFixed(2);

    if (countdownTime <= 0) {
      endGame();
    }
  }, 10);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  startCountdown();
}

function endGame() {

  clearInterval(timerInterval);
  clearInterval(countdownInterval);

  bgm.pause();

  centerMessage.textContent = "GAME OVER";
}
