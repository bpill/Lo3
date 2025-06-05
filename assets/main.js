// assets/main.js

/**
 * Generates a right‑to‑left sliding ASCII animation for a given word.
 * Each frame is tagged (|NN|) to mimic classic CS 1.6 LO3 scripts.
 * @param {string} word       Word to animate.
 * @param {number} width      Visible window width.
 * @param {number} startTag   Starting numeric tag (counts down).
 * @returns {string[]}        Array of console lines.
 */
function generateSlideFrames(word, width = 20, startTag = 65) {
    const frames = [];
    let tag = startTag;
    for (let offset = width; offset >= -word.length; offset--) {
        const tagStr = String(tag--).padStart(2, '0');
        let line = `|${tagStr}|`;
        for (let i = 0; i < width; i++) {
            const charIndex = i - offset;
            line += (charIndex >= 0 && charIndex < word.length) ? word[charIndex] : '-';
        }
        line += '|';
        frames.push(line);
    }
    return frames;
}

/**
 * Generates a bouncing animation for a word as it slides left‑to‑right and back.
 * The returned array contains lines of fixed width composed of the word and dashes.
 * @param {string} word    Word to animate.
 * @param {number} width   Visible window width.
 * @returns {string[]}     Frames of the bounce cycle.
 */
function generateBounceFrames(word, width = 20) {
    const frames = [];
    const leftBound = -word.length;      // Start completely off‑screen left
    const rightBound = width;            // End completely off‑screen right

    // Left → Right
    for (let offset = leftBound; offset <= rightBound; offset++) {
        let line = '';
        for (let i = 0; i < width; i++) {
            const idx = i - offset;
            line += (idx >= 0 && idx < word.length) ? word[idx] : '-';
        }
        frames.push(line);
    }
    // Right → Left (exclude duplicate endpoints)
    for (let offset = rightBound - 1; offset >= leftBound + 1; offset--) {
        let line = '';
        for (let i = 0; i < width; i++) {
            const idx = i - offset;
            line += (idx >= 0 && idx < word.length) ? word[idx] : '-';
        }
        frames.push(line);
    }
    return frames;
}

const consoleMessages = [
    "LIVE ON 3 RESTARTS...!",
    "[Restart #1]",
    "mp_freezetime 0",
    "sv_restartround 1",
    "sv_gravity -8000",
    "sv_restartround 1",    
    
    "[Restart #2]",
    "sv_gravity -10",
    "sv_airaccelerate -5",
    "sv_restartround 1",
    "[Live On Next Restart...]",
    
    "[Restart #3 - Game is Live!]",
    "sv_gravity 800",
    "sv_airaccelerate 10",
    "mp_freezetime 15",
    "sv_restartround 1",
    // Dynamic LO3 animation frames will be generated programmatically below
];

/* --- LO3 dynamic banner animation (3 → 2 → 1 → GLHF) --- */

// Banner‑style ASCII art blocks (6 rows each, padded to 40 chars)
const banner3 = [
  "                ██████╗                 ",
  "                ╚════██╗                ",
  "                 █████╔╝                ",
  "                 ╚═══██╗                ",
  "                ██████╔╝                ",
  "                ╚═════╝                 "
];

const banner2 = [
  "                ██████╗                 ",
  "                ╚════██╗                ",
  "                 █████╔╝                ",
  "                ██╔═══╝                 ",
  "                ╚██████╗                ",
  "                 ╚═════╝                "
  
];

const banner1 = [
  "                   ██╗                  ",
  "                  ███║                  ",
  "                  ╚██║                  ",
  "                   ██║                  ",
  "                   ██║                  ",
  "                   ╚═╝                  "
];

// Helper to prepend a two‑digit, zero‑padded countdown tag
let tagCounter = 99;
const nextTag = () => `|${String(tagCounter--).padStart(2, "0")}|`;

// Collect frames
const scrollFrames = [];

// Append banners with spacers
[banner3, banner2, banner1].forEach((block, idx) => {
  block.forEach(line => scrollFrames.push(`${nextTag()}${line}|`));
  if (idx < 2) { // Spacer after 3 and 2
    scrollFrames.push(`${nextTag()}----------------------------------------|`);
    scrollFrames.push(`${nextTag()}----------------------------------------|`);
  }
});

// Add final GLHF splash line
scrollFrames.push(`${nextTag()}------------------GLHF!-----------------|`);

// --- Bouncing "LIVE" animation until final Lo3.gg banner ---
// Keep bouncing until only 6 tags remain (|05| … |00|)
const liveBounce = generateBounceFrames("LIVE", 40);
let bounceIdx = 0;

while (tagCounter > 9) {
  const frame = liveBounce[bounceIdx % liveBounce.length];
  scrollFrames.push(`${nextTag()}${frame}|`);
  bounceIdx++;
}

// Stylised 40‑char‑wide "Lo3.gg" ASCII (10 rows)
const lo3gg = [
  "                                        ", // |09|
  "                                        ", // |08|
  "       ██╗             ██████╗          ", // |07|
  "       ██║     ██████╗ ╚════██╗         ", // |06|
  "       ██║     ██╔══██  █████╔╝         ", // |05|
  "       ██║     ██║  ██  ╚═══██          ", // |04|
  "       ███████ ╚█████╗ ██████╗ .gg      ", // |03|
  "       ╚═════╝  ╚════╝ ╚═════╝          ", // |02|
  "                                        ", // |01|
  "                                        "  // |00|
];

// Push the banner so that |00| is the final frame
lo3gg.forEach(line => {
  scrollFrames.push(`${nextTag()}${line}|`);
});

// Merge into main console message queue
consoleMessages.push(...scrollFrames);

document.addEventListener('DOMContentLoaded', () => {
    const consoleOutput = document.getElementById('console-output');
    const loadingHeader = document.getElementById('loading-header');
    let messageIndex = 0;

    function updateLoadingStatus(status, isPulsing = false) {
        loadingHeader.textContent = status;
        if (isPulsing) {
            loadingHeader.classList.add('pulsing');
        } else {
            loadingHeader.classList.remove('pulsing');
        }
    }

    function addConsoleMessage(message) {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = message;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function playSequence() {
        if (messageIndex < consoleMessages.length) {
            addConsoleMessage(consoleMessages[messageIndex]);
            messageIndex++;
            setTimeout(playSequence, 120);
        } else {
            // Animation complete - update header
            updateLoadingStatus('-=[[ Est. 2019 ]]=-', false);
        }
    }

    // Loading sequence
    updateLoadingStatus('exec Lo3_script_v1.cfg', false);
    
    setTimeout(() => {
        updateLoadingStatus('config loaded', false);
        setTimeout(() => {
            updateLoadingStatus('executing', true);
            setTimeout(() => {
                playSequence();
            }, 1000);
        }, 1000);
    }, 1000);
});

// Example initialization functions for components
function initHeader() {
    console.log('Header initialized');
}

function initNavigation() {
    console.log('Navigation initialized');
}