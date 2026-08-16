multiAPP — Pomodoro Timer & Quick Calculator Chrome Extension
Video Demo: https://youtu.be/Fk0C9Ub8QTM
Description:
multiAPP is a lightweight, all-in-one productivity Chrome Extension built using JavaScript (ES6+), HTML5, and CSS3. Designed strictly following Chrome Extension Manifest V3 standards, multiAPP seamlessly integrates a Pomodoro Focus Timer with a Quick Calculator directly into your browser's popup window. The primary motivation behind this project was to help curb excessive screen time and improve personal productivity by keeping essential focus tools in one easily accessible place, without needing to open new tabs or heavy desktop applications.

Design Choices and Architecture
When building a Chrome Extension in the modern era, one of the biggest hurdles is adapting to Manifest V3. Unlike older extensions that could run persistent background scripts, Manifest V3 uses Service Workers that go to sleep when inactive.

To solve this, I chose to use the chrome.alarms API rather than standard JavaScript setInterval() or setTimeout() functions. This ensures that the background countdown remains accurate and persistent even when the popup window is closed or Chrome puts the background service worker to sleep. To maintain the visual state of the timer when a user reopens the extension, I utilized the asynchronous chrome.storage.local API. This allows the popup to dynamically sync with the background worker, fetching the remaining time and the current timer state without resetting the user's progress.

Alongside the timer, I implemented a custom-built Quick Calculator. It uses a responsive CSS Grid layout to sit comfortably next to your focus tasks. It handles basic arithmetic operations, entry deletion, full clearing, and includes safety measures for edge cases like division-by-zero and complex decimal formatting.

File Structure and Functionality
The project is modular and separated into the following key files:

manifest.json: The core configuration file required by Chrome. It declares the extension's metadata (name, version), enforces Manifest V3 rules, sets the default popup, and requests the necessary permissions (alarms and storage) required for the extension to function.

background.js: The background service worker. This file acts as the engine of the Pomodoro timer. It listens for messages from the popup, sets and clears chrome.alarms, and updates the timer's state in chrome.storage.local so the countdown is never lost when the user clicks away.

popup.html: The markup file that defines the visual layout of the extension. It is divided into two main sections: the Pomodoro UI (with Work, Short Break, and Long Break controls) and the Calculator UI (display screen and keypad).

popup.js: The frontend logic script. This handles all DOM manipulation, capturing user clicks for both the timer and the calculator. It is responsible for sending asynchronous messages via chrome.runtime to the background script to start/stop the timer, and it contains the logic for parsing and evaluating the calculator's mathematical expressions.

popup.css: Contains all the styling rules for the extension. I implemented a custom dark purple theme using Flexbox and Grid layouts to ensure the buttons are aligned perfectly. It features smooth, translucent control buttons and clear state feedback (hover effects, active states) for a sleek user experience.

logo.png: The icon used for the extension in the Chrome toolbar and extension management page.

Key Features Summary
Pomodoro Focus Timer: Dedicated controls for standard 25-minute focus sessions, 5-minute short breaks, or 15-minute long breaks.

Persistent Background Countdown: Flawless time tracking across browser sessions utilizing chrome.alarms.

State Restoration: Reopening the popup instantly syncs and resumes the UI without data loss.

Embedded Calculator: Clean, responsive grid layout for performing quick mathematical calculations (+, -, x, ÷) alongside your focus tasks.

Sleek UI: A modern, custom dark theme that is easy on the eyes during long study or work sessions.

This project was created by Shubham as the final project for Harvard's CS50x.
