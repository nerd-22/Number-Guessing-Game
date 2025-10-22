let randomNumber;
let maxNumber = 10;
let attempts = 0;
let score = 0;
let hintUsed = false;

const difficultySelect = document.getElementById("difficulty");
const startBtn = document.getElementById("start-btn");
const gameArea = document.querySelector(".game-area");
const rangeInfo = document.getElementById("range-info");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const hintBtn = document.getElementById("hint-btn");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", makeGuess);
hintBtn.addEventListener("click", giveHint);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  maxNumber = parseInt(difficultySelect.value);
  randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;
  hintUsed = false;
  feedback.textContent = "";
  attemptsDisplay.textContent = "0";
  guessInput.value = "";
  rangeInfo.textContent = `1 and ${maxNumber}`;
  gameArea.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  startBtn.disabled = true;
  console.log("Secret number:", randomNumber); // For debugging
}

function makeGuess() {
  const guess = parseInt(guessInput.value);
  if (!guess || guess < 1 || guess > maxNumber) {
    feedback.textContent = "⚠️ Please enter a valid number!";
    feedback.style.color = "#ffb400";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === randomNumber) {
    feedback.textContent = `🎉 Correct! You guessed it in ${attempts} attempts!`;
    feedback.style.color = "#00ff88";
    score += hintUsed ? 5 : 10;
    scoreDisplay.textContent = score;
    restartBtn.classList.remove("hidden");
    startBtn.disabled = false;
  } else if (guess < randomNumber) {
    feedback.textContent = "⬆️ Try a higher number!";
    feedback.style.color = "#fff";
  } else {
    feedback.textContent = "⬇️ Try a lower number!";
    feedback.style.color = "#fff";
  }

  guessInput.value = "";
}

function giveHint() {
  if (hintUsed) {
    feedback.textContent = "💡 You already used your hint!";
    feedback.style.color = "#ffb400";
    return;
  }
  hintUsed = true;
  const lower = Math.max(1, randomNumber - 3);
  const upper = Math.min(maxNumber, randomNumber + 3);
  feedback.textContent = `💡 Hint: The number is between ${lower} and ${upper}`;
  feedback.style.color = "#ffeb3b";
}

function restartGame() {
  gameArea.classList.add("hidden");
  startBtn.disabled = false;
  feedback.textContent = "";
}

