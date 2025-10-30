let timer;
let timeLeft = 0;
let totalTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const minutesInput = document.getElementById("minutes");
const characterImg = document.getElementById("characterImg");
const changeCharacterBtn = document.getElementById("changeCharacterBtn");
const imgUrlInput = document.getElementById("imgUrl");

const circle = document.querySelector(".progress-ring__circle");
const circumference = 2 * Math.PI * 80; // radius=80
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function updateProgress() {
  const progress = timeLeft / totalTime;
  const offset = circumference - progress * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  if (timeLeft === 0) {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid number of minutes 🍵");
      return;
    }
    timeLeft = minutes * 60;
    totalTime = timeLeft;
    updateProgress();
  }

  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      updateProgress();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("⏰ Time’s up! Take a cozy break ☕");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  totalTime = 0;
  timerDisplay.textContent = "00:00";
  circle.style.strokeDashoffset = circumference;
}

function changeCharacter() {
  const url = imgUrlInput.value.trim();
  if (url) {
    characterImg.classList.add("fade");
    setTimeout(() => {
      characterImg.src = url;
      characterImg.classList.remove("fade");
    }, 400);
    imgUrlInput.value = "";
  } else {
    alert("Paste a valid image URL 🌸");
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
changeCharacterBtn.addEventListener("click", changeCharacter);

updateDisplay();
