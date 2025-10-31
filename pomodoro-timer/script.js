let timer;
let timeLeft = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timeInputs = document.getElementById("timeInputs");

const characterImg = document.getElementById("characterImg");
const imgUrlInput = document.getElementById("imgUrl");
const changeCharacterBtn = document.getElementById("changeCharacterBtn");

const settingsIcon = document.getElementById("settingsIcon");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");
const themeButtons = document.querySelectorAll(".theme-btn");

function updateDisplay() {
  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;
  timerDisplay.textContent = `${String(hrs).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  if (timeLeft === 0) {
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;
    timeLeft = h * 3600 + m * 60 + s;
    if (timeLeft <= 0) {
      alert("Please enter a valid time 🍵");
      return;
    }
  }

  timeInputs.style.opacity = "0";
  setTimeout(() => (timeInputs.style.display = "none"), 500);

  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("⏰ Time’s up! Take a cozy break ☕");
      timeInputs.style.display = "block";
      timeInputs.style.opacity = "1";
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
  updateDisplay();
  timeInputs.style.display = "block";
  timeInputs.style.opacity = "1";
}

function changeCharacter() {
  const url = imgUrlInput.value.trim();
  if (url) {
    characterImg.src = url;
    imgUrlInput.value = "";
  } else {
    alert("Paste a valid image URL 🌸");
  }
}

// Modal controls
settingsIcon.addEventListener("click", () => {
  settingsModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  settingsModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === settingsModal) settingsModal.style.display = "none";
});

// Theme change
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.className = btn.dataset.theme;
  });
});

// Timer controls
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
changeCharacterBtn.addEventListener("click", changeCharacter);

updateDisplay();
