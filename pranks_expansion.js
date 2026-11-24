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
