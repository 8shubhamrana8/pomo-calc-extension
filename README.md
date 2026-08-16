# multiAPP — Pomodoro Timer & Quick Calculator Chrome Extension
#### Video Demo: https://youtu.be/Fk0C9Ub8QTM

**Description**
    
    multiAPP is a lightweight, all-in-one productivity Chrome Extension built using **JavaScript (ES6+)**, **HTML5**, and **CSS3**. Designed following **Chrome Extension Manifest V3** standards, multiAPP                 seamlessly integrates a **Pomodoro Focus Timer** with a **Quick Calculator** directly into your browser popup window. Made it curb my screen time.

   🌟 Key Features
   
   * **Pomodoro Focus Timer:**
     * **Work & Break Modes:** Quickly start standard 25-minute focus sessions, 5-minute short breaks, or 15-minute long breaks with dedicated controls.
     * **Persistent Background Countdown:** Uses `chrome.alarms` and `chrome.storage.local` to track time continuously across browser sessions, ensuring accurate countdowns even when the popup window is closed or           Chrome’s background service worker sleeps.
     * **State Restoration:** Reopening the popup dynamically syncs and resumes the timer UI without resetting progress.
   
   * **Embedded Calculator:**
     * Clean, responsive grid layout for performing quick mathematical calculations right alongside your focus tasks.
     * Supports basic arithmetic operations (`+`, `-`, `x`, `÷`), entry deletion (`del`), and full clear (`AC`).
     * Handles edge cases gracefully (including decimal formatting and division-by-zero protection).
   
   * **Sleek & Lightweight UI:**
     * Custom dark purple theme with smooth translucent control buttons and clear state feedback.
   
   
    🛠️ Tech Stack & Architecture
   
   * **Manifest Version:** Manifest V3
   * **Frontend:** HTML5, CSS3 (Grid & Flexbox layouts)
   * **Logic & APIs:**
     * `chrome.alarms` — High-precision, background-safe timing engine.
     * `chrome.storage.local` — Asynchronous key-value storage for timer state persistence.
     * `chrome.runtime` — Asynchronous message passing between the UI popup and background service worker.
   
   
   
    📁 File Structure
   
   multiAPP/
   ├── manifest.json     # Extension metadata and permission declarations
   ├── background.js     # Background service worker & alarm handler
   ├── popup.html        # Main popup markup (Pomodoro UI & Calculator UI)
   ├── popup.js          # DOM handling, timer state sync, calculator logic
   ├── popup.css         # Extension styling and layout rules
   └── logo.png          # Extension toolbar icon
