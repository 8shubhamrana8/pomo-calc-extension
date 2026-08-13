// background.js

// Listen for messages sent from the popup UI window
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_TIMER") {
    const endTime = Date.now() + message.durationInSeconds * 1000;
    
    chrome.storage.local.set({ 
      endTime: endTime, 
      isCounterRunning: true,
      currentMode: message.currentMode,
      msg: message.msg
    }, () => {
      // Set a Chrome Alarm (delay in minutes)
      chrome.alarms.create("pomodoroTimer", {
        delayInMinutes: message.durationInSeconds / 60
      });
    });
  }

  if (message.action === "STOP_TIMER") {
    chrome.storage.local.set({ isCounterRunning: false });
    chrome.alarms.clear("pomodoroTimer");
  }
});

// Triggered when the timer finishes, even if the service worker was idle/sleeping
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["isCounterRunning", "msg"], (data) => {
      if (data.isCounterRunning) {
        chrome.storage.local.set({ isCounterRunning: false, secondsLeft: 0 });
        
        // Broadcast finish state to popup UI window if it's currently open
        chrome.runtime.sendMessage({ action: "TIMER_FINISHED" });
        
        console.log("Time is up: " + data.msg);
      }
    });
  }
});