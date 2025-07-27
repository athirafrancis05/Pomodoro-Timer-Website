let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let saveBtn = document.getElementById('save-settings');

let workInput = document.getElementById('work-duration');

let timer;
let isRunning = false;
let duration = parseInt(workInput.value) * 60;
let timeLeft = duration;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
      isRunning = false;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = duration;
  updateDisplay();
}

function saveSettings() {
  duration = parseInt(workInput.value) * 60;
  timeLeft = duration;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
saveBtn.addEventListener('click', saveSettings);

updateDisplay();
