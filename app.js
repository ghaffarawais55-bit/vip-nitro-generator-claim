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
// ==========================================
// NEW PRANK MODES & HIGH DEMAND AUTO-MANAGER
// ==========================================

/*
  HIGH DEMAND AUTO-MANAGER:
  Monitors traffic / click frequency / server simulated load.
  If demand spikes (e.g. >50 concurrent interactions or rapid spam clicks),
  it automatically throttles heavy particle animations and switches to 
  "High Demand Mode" (lightweight CSS transitions, simplified DOM) 
  to prevent lag, then automatically restores full animations when free!
*/

class HighDemandManager {
    constructor() {
        this.interactionCount = 0;
        this.isHighDemand = false;
        this.checkInterval = null;
        this.init();
    }

    init() {
        // Track user interactions
        window.addEventListener('click', () => this.registerInteraction());
        window.addEventListener('touchstart', () => this.registerInteraction());

        // Monitor traffic spike every 3 seconds
        this.checkInterval = setInterval(() => {
            if (this.interactionCount > 15 && !this.isHighDemand) {
                this.enableHighDemandMode();
            } else if (this.interactionCount <= 3 && this.isHighDemand) {
                this.disableHighDemandMode();
            }
            this.interactionCount = 0; // reset counter for next window
        }, 3000);
    }

    registerInteraction() {
        this.interactionCount++;
    }

    enableHighDemandMode() {
        this.isHighDemand = true;
        console.warn("⚠️ High Demand Detected! Auto-switching to lightweight mode to maintain 60 FPS.");
        document.body.classList.add('high-demand-mode');
        
        // Show subtle status indicator if desired
        const indicator = document.getElementById('demandIndicator') || this.createIndicator();
        indicator.textContent = "⚡ High Demand Mode (Optimized)";
        indicator.style.color = "#ff3366";
    }

    disableHighDemandMode() {
        this.isHighDemand = false;
        console.log("✅ Traffic normal. Restoring full high-def pranks & particles!");
        document.body.classList.remove('high-demand-mode');

        const indicator = document.getElementById('demandIndicator');
        if (indicator) {
            indicator.textContent = "🟢 Server Optimal (Full FX)";
            indicator.style.color = "#00ff66";
        }
    }

    createIndicator() {
        const div = document.createElement('div');
        div.id = 'demandIndicator';
        div.style.cssText = "position:fixed; bottom:10px; right:10px; background:rgba(0,0,0,0.8); padding:5px 10px; border-radius:5px; font-size:11px; font-family:monospace; z-index:9999; color:#00ff66; border:1px solid rgba(255,255,255,0.1); pointer-events:none;";
        div.textContent = "🟢 Server Optimal (Full FX)";
        document.body.appendChild(div);
        return div;
    }
}

// Initialize High Demand Manager on load
const demandManager = new HighDemandManager();


// ==========================================
// ADDITIONAL NEW PRANK MODES (SELECTABLE)
// ==========================================

/*
  We add a Prank Selector Modal at the start where the victim 
  can choose which "Freebie" they want to fall for:
  1. Discord 1-Year Nitro (Classic)
  2. Fake iPhone 16 Pro Giveaway (New!)
  3. Steam $100 Wallet Code Generator (New!)
  4. TikTok Verified Badge Instant Grant (New!)
*/

const NEW_PRANK_CONFIGS = {
    nitro: {
        title: "Discord 1-Year Nitro",
        color: "#5865F2",
        buttonText: "CLAIM NITRO FREE",
        roasts: [
            "Too slow bro! Try actually touching it.",
            "Skill issue! My grandma taps faster 👵",
            "Bro missed by a lightyear! 💀",
            "Are you playing blindfolded or lagging?",
            "Error 404: Hand-eye coordination not found.",
            "Bro really thought he was getting free Nitro 😂",
            "So close! Yet so hilariously far away...",
            "FINAL WARNING: The button has feelings too!"
        ]
    },
    iphone: {
        title: "Free iPhone 16 Pro Max",
        color: "#E2D9BC",
        buttonText: "CLAIM iPHONE NOW",
        roasts: [
            "Tim Cook personally blocked your request! 🍎",
            "You have zero chance at a titanium phone, buddy.",
            "Bro thought Apple would hand out free phones on this sketchy site!",
            "Battery at 1% of your remaining brain cells.",
            "Screen cracked just from your bad luck.",
            "Try trading your old Nokia 3310 instead!",
            "Almost had it... NOT! 💀",
            "Apple legal team is now tracking your location 🚨"
        ]
    },
    steam: {
        title: "Steam $100 Wallet Code",
        color: "#1b2838",
        buttonText: "GENERATE $100 CODE",
        roasts: [
            "Gabe Newell says: Nice try, buy your own games!",
            "Summer Sale ended for you permanently.",
            "Your VAC ban for gullibility is now active.",
            "Error: Insufficient gaming chair quality.",
            "That code was fake before you even clicked.",
            "Bro is broke in both Steam wallet and real life 💸",
            "Critical hit to your dignity!",
            "Final boss defeated you with zero difficulty."
        ]
    },
    tiktok: {
        title: "TikTok Instant Verified Badge",
        color: "#fe2c55",
        buttonText: "GET BLUE CHECKMARK",
        roasts: [
            "Even with 0 followers you thought you were famous?",
            "Algorithm flagged you as: 100% Certified Clown 🤡",
            "Your dancing skills won't save you here.",
            "Verification denied by CEO of TikTok.",
            "Bro wants clout so bad it hurts.",
            "Try posting cringe elsewhere!",
            "You are now famous... in our comedy hall of fame.",
            "Checkmark status: DELETED 💀"
        ]
    }
};

// Inject Prank Selector HTML into index.html dynamically if not present
window.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('mainCard');
    if (card && !document.getElementById('prankSelectorSection')) {
        const selectorHTML = `
            <section id="prankSelectorSection" class="section">
                <div class="header-section">
                    <span class="badge">🔥 SELECT YOUR FREE LOOT 🔥</span>
                    <h1>CHOOSE YOUR POISON</h1>
                    <p>Pick a prize to begin the ultimate interactive prank experience.</p>
                </div>
                <div class="prank-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin: 25px 0;">
                    <button class="cyber-btn prank-choice" data-prank="nitro" style="background:#5865F2;">💎 Discord Nitro</button>
                    <button class="cyber-btn prank-choice" data-prank="iphone" style="background:#b8860b;">📱 iPhone 16 Pro</button>
                    <button class="cyber-btn prank-choice" data-prank="steam" style="background:#1b2838;">🎮 Steam $100</button>
                    <button class="cyber-btn prank-choice" data-prank="tiktok" style="background:#fe2c55;">🎵 TikTok Verified</button>
                </div>
            </section>
        `;
        
        // Insert before scanner section
        const scannerSec = document.getElementById('scannerSection');
        if (scannerSec) {
            scannerSec.insertAdjacentHTML('beforebegin', selectorHTML);
            scannerSec.classList.add('hidden'); // hide scanner initially until prank chosen
        }

        // Add event listeners to choices
        document.querySelectorAll('.prank-choice').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prankType = e.target.getAttribute('data-prank');
                applyPrankTheme(prankType);
            });
        });
    }
});

function applyPrankTheme(type) {
    const config = NEW_PRANK_CONFIGS[type] || NEW_PRANK_CONFIGS.nitro;
    
    // Update active roasts in global scope if app.js uses them
    if (typeof roasts !== 'undefined') {
        roasts.length = 0;
        roasts.push(...config.roasts);
    }

    // Update button text
    const claimBtnEl = document.getElementById('claimBtn');
    if (claimBtnEl) claimBtnEl.textContent = config.buttonText;

    // Transition from selector to scanner
    const selectorSec = document.getElementById('prankSelectorSection');
    const scannerSec = document.getElementById('scannerSection');
    
    if (selectorSec) selectorSec.classList.add('hidden');
    if (scannerSec) scannerSec.classList.remove('hidden');

    // Play sound / trigger subtle effect
    console.log(`Prank mode selected: ${config.title}`);
}
