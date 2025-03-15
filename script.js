let clutter = "";

function generateBubbles() {
  clutter = "";
  for (let i = 1; i < 61; i++) {
    let ranNum = Math.floor(Math.random() * 10);
    clutter += `<div class="bubbles">${ranNum}</div>`;
  }
  document.querySelector(".game-board").innerHTML = clutter;
  attachBubbleEvents();
}

generateBubbles();

let gameBoard = document.querySelector(".game-board");
let timerInput = document.querySelector(".timer input");
let scoreInput = document.getElementById("points");
let hitInput = document.getElementById("hits");
let resetBtn = document.querySelector("button");

let timeLeft = 10; 
let points = 0;
let hits = 0;
let countdownStarted = false;
let countdown; 

function startTimer() {
  if (!countdownStarted) {
    countdownStarted = true; 

    countdown = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerInput.value = timeLeft; 
      } else {
        clearInterval(countdown);
        gameBoard.style.pointerEvents = "none";
      }
    }, 1000);
  }
}

function attachBubbleEvents() {
  document.querySelectorAll(".bubbles").forEach((bubble) => {
    bubble.addEventListener("click", function () {
      if (timeLeft > 0) {
        this.style.opacity = "0";

        let bval = parseInt(this.innerText); 
        points += bval; 
        scoreInput.value = points;

        hits++;
        hitInput.value = hits;

        startTimer(); 
      }
    });
  });
}

attachBubbleEvents();

resetBtn.addEventListener("click", function () {
  clearInterval(countdown);
  countdownStarted = false;
  timeLeft = 10;
  points = 0;
  hits = 0;

  timerInput.value = timeLeft;
  scoreInput.value = points;
  hitInput.value = hits;

  gameBoard.style.pointerEvents = "auto";
  generateBubbles();
});
