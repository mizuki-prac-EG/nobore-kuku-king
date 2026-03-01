let score=0;
let combo=0;
let inputValue="";
let correctAnswer=0;
let countdown=10;
let timer;
let highScore=localStorage.getItem("highScore")||0;
let selectedChar="day_char.png";

const characters=[
  {name:"デイヒーロー", src:"day_char.png", unlock:0},
  {name:"宮川将軍", src:"miya_char.png", unlock:622}
];

const scoreEl=document.getElementById("score");
const comboEl=document.getElementById("combo");
const highScoreEl=document.getElementById("high-score");
const questionEl=document.getElementById("question");
const characterImg=document.getElementById("character");

highScoreEl.textContent=highScore;

/* 背景切り替え */
function updateBackground(){
  if(score<200)document.body.className="day";
  else if(score<400)document.body.className="sunset";
  else if(score<800)document.body.className="space";
  else document.body.className="blackfall";
}

/* 問題生成 */
function generateQuestion(){
  let a=Math.floor(Math.random()*9)+1;
  let b=Math.floor(Math.random()*9)+1;
  correctAnswer=a*b;
  questionEl.textContent=`${a} × ${b}`;
}

/* ゲーム開始 */
document.getElementById("start-btn").onclick=()=>{
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  startGame();
};

function startGame(){
  score=0;
  combo=0;
  scoreEl.textContent=0;
  comboEl.textContent=0;
  updateBackground();
  characterImg.src=selectedChar;
  generateQuestion();
  startTimer();
}

/* タイマー */
function startTimer(){
  countdown=10;
  document.getElementById("countdown").textContent=countdown.toFixed(2);
  timer=setInterval(()=>{
    countdown-=0.05;
    document.getElementById("countdown").textContent=countdown.toFixed(2);
    if(countdown<=0){
      clearInterval(timer);
      gameOver();
    }
  },50);
}

/* 回答 */
document.getElementById("enter-btn").onclick=checkAnswer;

function checkAnswer(){
  if(parseInt(inputValue)===correctAnswer){
    combo++;
    let add=10;
    if(combo===3)add+=5;
    if(combo===5)add+=10;

    score+=add;
    updateBackground();
  }else{
    combo=0;
    score=Math.max(0,score-5);
  }

  scoreEl.textContent=score;
  comboEl.textContent=combo;
  inputValue="";
  document.getElementById("input-display").textContent="";
  generateQuestion();
}

/* ゲーム終了 */
function gameOver(){
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("final-score").textContent="今回スコア："+score;

  if(score>highScore){
    localStorage.setItem("highScore",score);
    document.getElementById("high-score-result").textContent="🏆 ハイスコア更新！";
  }else{
    document.getElementById("high-score-result").textContent="";
  }

  if(score>=622){
    document.getElementById("unlock-message").textContent=
      "✨ ネタ枠解禁！宮川将軍参上！✨";
  }else{
    document.getElementById("unlock-message").textContent="";
  }
}
