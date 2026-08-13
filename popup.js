// popup.js
let seconds = 0;
let countdownInterval;
let isCounterRunning = false;
let currentMode = 'idle';
let msg = '';

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const shortBreakBtn = document.querySelector('.short-break');
const longBreakBtn = document.querySelector('.long-break');
const display = document.querySelector('.timer');

// Restore time tracking values immediately when popup window is clicked open
chrome.storage.local.get(["endTime", "isCounterRunning", "currentMode", "msg", "secondsLeft"], (data) => {
  if (data.isCounterRunning) {
    currentMode = data.currentMode;
    msg = data.msg;
    
    // Check how much time passed while popup window was closed
    const timeLeftInMs = data.endTime - Date.now();
    seconds = Math.max(0, Math.floor(timeLeftInMs / 1000));
    
    if (seconds > 0) {
      resumeLocalUI();
    } else {
      resetUIToZero();
    }
  } else if (data.secondsLeft) {
    seconds = data.secondsLeft;
    countTime();
  }
});

function countTime() {
  let minutes = Math.floor(seconds / 60);
  let second = seconds % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  second = second < 10 ? '0' + second : second;

  display.textContent = `${minutes}:${second}`;
  
  if (seconds <= 0) {
    resetUIToZero();
    alert(msg); // Alerts work inside popup.js if active
    return;
  }
  seconds--;
}

function resumeLocalUI() {
  clearInterval(countdownInterval);
  countTime();
  countdownInterval = setInterval(countTime, 1000);
  isCounterRunning = true;
}

function resetUIToZero() {
  clearInterval(countdownInterval);
  display.textContent = "00:00";
  isCounterRunning = false;
  currentMode = 'idle';
}

// --- BUTTONS SEND SIGNAL ACTIONS TO BACKGROUND ---

startBtn.addEventListener("click", () => {
  if (isCounterRunning && currentMode === "work") return;
  msg = "Time for a Break";
  currentMode = "work";
  if (seconds <= 0) seconds = 1500;
  
  chrome.runtime.sendMessage({ 
    action: "START_TIMER", 
    durationInSeconds: seconds,
    currentMode: currentMode,
    msg: msg
  });
  resumeLocalUI();
});

stopBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  isCounterRunning = false;
  chrome.storage.local.set({ secondsLeft: seconds });
  chrome.runtime.sendMessage({ action: "STOP_TIMER" });
});

shortBreakBtn.addEventListener("click", () => {
  if (isCounterRunning && currentMode === "shortbreak") return;
  msg = "Time to Focus";
  currentMode = "shortbreak";
  seconds = 300;
  
  chrome.runtime.sendMessage({ 
    action: "START_TIMER", 
    durationInSeconds: seconds,
    currentMode: currentMode,
    msg: msg
  });
  resumeLocalUI();
});

longBreakBtn.addEventListener("click", () => {
  if (isCounterRunning && currentMode === "longbreak") return;
  msg = "Time to Focus";
  currentMode = "longbreak";
  seconds = 900;
  
  chrome.runtime.sendMessage({ 
    action: "START_TIMER", 
    durationInSeconds: seconds,
    currentMode: currentMode,
    msg: msg
  });
  resumeLocalUI();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "TIMER_FINISHED") {
    resetUIToZero();
  }
});

// Calculator

document.addEventListener("DOMContentLoaded", () => {
  // Getting all buttons 
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const allClearButton = document.getElementById('allClear');
  const equalsToButton = document.getElementById('equalsTo');
  const deleteButton = document.getElementById('delete');
  const previousOperandTextElement = document.querySelector('[data-previousOperand]');
  const currentOperandTextElement = document.querySelector('[data-currentOperand]');
  
  // Default values
  let currentnum = "";
  let prevnum = "";
  let operand = "";
  let clearscr = false;
  
  numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      workNumbers(e.target.textContent);
    });
  });
  
  function workNumbers(number) {
    if (number === "." && currentnum.includes(".")) return;
    if (clearscr) {
      currentnum = "";
      clearscr = false;
      prevnum = "";
    }
    currentnum += number;
    currentOperandTextElement.textContent = currentnum;
  }
  
  operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      workOperation(e.target.textContent);
    });
  });
  
  function workOperation(operation) {
    if (currentnum === "") return;

    if (prevnum !== "") {
      calculate();
    } else {
      prevnum = currentnum;
    }
    operand = operation;
    previousOperandTextElement.textContent = prevnum + " " + operand;
    currentnum = "";
    currentOperandTextElement.textContent = "";
  }

  equalsToButton.addEventListener("click", () => {
    calculate();
    if (prevnum !== "") {
      currentOperandTextElement.textContent = prevnum;
      previousOperandTextElement.textContent = "";
      operand = "";
      prevnum = "";
      clearscr = true;
    }
  });

  function calculate() {
    if (currentnum == "" || operand == "" || prevnum == "") return;
    let result;
    const prev = parseFloat(prevnum);
    const current = parseFloat(currentnum);
    
    if (operand === "+") {
      result = prev + current;
    } else if (operand === "-") {
      result = prev - current;
    } else if (operand === "x") {
      result = prev * current;
    } else if (operand === "÷") {
      result = current === 0 ? "Cheeky" : prev / current;
    }
    prevnum = result.toString();
    currentnum = "";
  }

  deleteButton.addEventListener("click", () => {
    if (currentnum.length > 0) {
      currentnum = currentnum.slice(0, -1);
      currentOperandTextElement.textContent = currentnum;
    }
  });

  allClearButton.addEventListener("click", () => {
    prevnum = "";
    operand = "";
    currentnum = "";
    previousOperandTextElement.textContent = "";
    currentOperandTextElement.textContent = "";
  });
});