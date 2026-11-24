// DOM Elements
const startScanBtn = document.getElementById('startScanBtn');
const scannerSection = document.getElementById('scannerSection');
const rewardSection = document.getElementById('rewardSection');
const loadingSection = document.getElementById('loadingSection');
const certificateSection = document.getElementById('certificateSection');
const mainCard = document.getElementById('mainCard');

const scannerBar = document.getElementById('scannerBar');
const scannerStatus = document.getElementById('scannerStatus');

const claimBtn = document.getElementById('claimBtn');
const buttonArena = document.getElementById('buttonArena');
const roastMessage = document.getElementById('roastMessage');
const tapCountEl = document.getElementById('tapCount');

const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');
const loadingStatusText = document.getElementById('loadingStatusText');

const sharePrankBtn = document.getElementById('sharePrankBtn');
const resetBtn = document.getElementById('resetBtn');
const toast = document.getElementById('toast');

// Roast Messages for the 8 attempts
const roasts = [
    "Too slow bro! Try actually touching it.",
    "Skill issue detected! My grandma taps faster 👵",
    "Bro missed by a lightyear! 💀",
    "Are you playing blindfolded or just lagging?",
    "Error 404: Hand-eye coordination not found.",
    "Bro really thought he was going to get free Nitro 😂",
    "So close! Yet so hilariously far away...",
    "FINAL WARNING: The button has feelings too, stop abusing it!"
];

let currentTaps = 0;
const targetTaps = 8;

// Web Audio API Sound Synthesizer
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Play Funny Clown Horn and Sad Trombone
function playClownAndTrombone() {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    // 1. Clown Horn (Two honks: Pa-pa!)
    playHonk(now, 440, 0.15);
    playHonk(now + 0.18, 554.37, 0.15); // C#
    playHonk(now + 0.36, 659.25, 0.25); // E

    // 2. Sad Trombone (Wah-wah-wah-waaaaah)
    const tromboneNotes = [233.08, 220, 207.65, 185]; // Bb, A, Ab, F#
    const durations = [0.35, 0.35, 0.35, 0.8];
    let startTime = now + 0.7;

    tromboneNotes.forEach((freq, idx) => {
        playSlideNote(startTime, freq, durations[idx]);
        startTime += durations[idx];
    });
}

function playHonk(time, freq, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
}

function playSlideNote(time, startFreq, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, time);
    // Slide down pitch for sad trombone wah effect
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.8, time + duration);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
}

// Gentle Mobile Vibration
function triggerVibration() {
    if (navigator.vibrate) {
        try {
            navigator.vibrate([100, 50, 100, 50, 200]);
        } catch (e) {
            console.log("Vibration blocked or unsupported");
        }
    }
}

// Step 1: Fake Verification Scanner
startScanBtn.addEventListener('click', () => {
    initAudio();
    startScanBtn.disabled = true;
    startScanBtn.textContent = "SCANNING QUANTUM SIGNATURE...";

    let progress = 0;
    const statuses = [
        "Analyzing Discord IP and Nitro eligibility...",
        "Bypassing Steam & Epic Games firewall...",
        "Injecting 1-Year VIP Pass into memory...",
        "Quantum handshake verified successfully!"
    ];

    const scanInterval = setInterval(() => {
        progress += 2;
        scannerBar.style.width = progress + '%';

        if (progress === 25) scannerStatus.textContent = statuses[1];
        if (progress === 60) scannerStatus.textContent = statuses[2];
        if (progress === 90) scannerStatus.textContent = statuses[3];

        if (progress >= 100) {
            clearInterval(scanInterval);
            setTimeout(() => {
                scannerSection.classList.add('hidden');
                rewardSection.classList.remove('hidden');
                moveButtonRandomly();
            }, 500);
        }
    }, 35);
});

// Step 2: Teleporting Claim Button & Roasts
function moveButtonRandomly() {
    const arenaRect = buttonArena.getBoundingClientRect();
    const btnRect = claimBtn.getBoundingClientRect();

    const maxX = arenaRect.width - btnRect.width - 20;
    const maxY = arenaRect.height - btnRect.height - 10;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(5, Math.floor(Math.random() * maxY));

    claimBtn.style.left = randomX + 'px';
    claimBtn.style.top = randomY + 'px';
}

// Teleport on Hover for Desktop
claimBtn.addEventListener('mouseenter', () => {
    if (currentTaps < targetTaps) {
        moveButtonRandomly();
        showRandomRoast();
    }
});

// Teleport on Tap/Click for Mobile & Desktop
claimBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentTaps++;
    tapCountEl.textContent = currentTaps;

    if (currentTaps < targetTaps) {
        showRandomRoast();
        moveButtonRandomly();
        triggerVibration();
    } else {
        // 8th tap triggers fake progress stuck at 99.9%
        triggerFinalSequence();
    }
});

function showRandomRoast() {
    const roastIndex = Math.min(currentTaps - 1, roasts.length - 1);
    roastMessage.textContent = roasts[roastIndex];
    // Trigger CSS reflow for shake animation
    roastMessage.style.animation = 'none';
    roastMessage.offsetHeight;
    roastMessage.style.animation = 'shakeRoast 0.3s ease';
}

// Step 3: Fake Progress Bar Stuck at 99.9%
function triggerFinalSequence() {
    rewardSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    let percent = 0.0;
    const loadInterval = setInterval(() => {
        percent += 1.5;
        if (percent >= 99.9) {
            percent = 99.9;
            loadingBar.style.width = '99.9%';
            loadingPercentage.textContent = '99.9%';
            loadingStatusText.textContent = "CRITICAL ERROR: MAXIMUM CLOWN ENERGY REACHED!";
            
            clearInterval(loadInterval);

            // Play Sound & Vibration
            playClownAndTrombone();
            triggerVibration();

            // Transition to Clown Certificate after 2.5 seconds
            setTimeout(() => {
                loadingSection.classList.add('hidden');
                certificateSection.classList.remove('hidden');
                mainCard.classList.add('glow-gold');

                // Launch Confetti Celebration
                launchConfetti();
            }, 2500);
        } else {
            loadingBar.style.width = percent.toFixed(1) + '%';
            loadingPercentage.textContent = percent.toFixed(1) + '%';

            if (percent > 40 && percent < 70) {
                loadingStatusText.textContent = "Syncing with Discord Quantum Servers...";
            } else if (percent >= 70) {
                loadingStatusText.textContent = "Finalizing VIP Nitro Badge delivery...";
            }
        }
    }, 40);
}

// Confetti Cannon
function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#00ff66', '#ff3366', '#33ccff']
        });
    }
}

// Step 4: Share & Reset
sharePrankBtn.addEventListener('click', () => {
    const prankUrl = window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(prankUrl).then(() => {
            showToast();
        }).catch(() => {
            fallbackCopyText(prankUrl);
        });
    } else {
        fallbackCopyText(prankUrl);
    }
});

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        alert("Share this link with your friends: " + text);
    }
    document.body.removeChild(textArea);
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

resetBtn.addEventListener('click', () => {
    currentTaps = 0;
    tapCountEl.textContent = '0';
    roastMessage.textContent = "Click the golden button below to claim your loot!";
    startScanBtn.disabled = false;
    scannerBar.style.width = '0%';
    scannerStatus.textContent = "Initializing secure handshaking with Discord & Steam servers...";
    startScanBtn.textContent = "START QUANTUM SCAN";

    certificateSection.classList.add('hidden');
    scannerSection.classList.remove('hidden');
    mainCard.classList.remove('glow-gold');
});
