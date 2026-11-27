/**
 * ============================================================================
 * CREATOR CONFIGURATION (Edit passcode, music, names, stories, notes & pass)
 * ============================================================================
 */
const CONFIG = {
    // Passcode Lock Screen Settings
    passcode: "0709",
    passcodeHint: "Hint: Try My Birth Date & Month✨",

    // Background Music Settings (Place your .mp3 file in the same folder)
    music: {
        src: "song.mp3",
        playingLabel: "Our Vibe ♪",
        pausedLabel: "Play Music",
        maxVolume: 0.65
    },

    // Personalize names here
    recipientName: "Bestie",
    senderRole: "Your Best Friend",

    // 1. Hero Section Content
    hero: {
        badge: "A Little Corner Made Just For You",
        titlePrefix: "For My ",
        titleHighlight: "Favorite",
        titleSuffix: " Person",
        subtitle: "I built this little space from scratch just to put into words how grateful I am for our bond—and why having you as my best friend is my favorite blessing."
    },

    // 2. Interactive Story Card ("The Unfiltered Truth")
    storyRevealItems: {
        heading: "The Unfiltered Truth",
        paragraphs: [
            [
                { type: "text", content: "Let's be honest for a second—you are officially the world's most adorable " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "certified overthinker" },
                { type: "text", content: ", who can turn the tiniest situation into a full emotional movie. And honestly, listening to all your random stories and making you laugh has become my " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "favorite part of every day" },
                { type: "text", content: "." }
            ],
            [
                { type: "text", content: "There are very few people in life you can talk to without any filter, and for me, you are that " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "safe space & pure sunshine" },
                { type: "text", content: ". No matter how exhausting a day gets, one message from you and your " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "chaotic yet golden-hearted vibe" },
                { type: "text", content: " instantly make everything feel lighter." }
            ],
            [
                { type: "text", content: "Since you consider me your best friend and brother, always remember this promise: through every high and low in life, your " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "personal cheerleader & bodyguard" },
                { type: "text", content: " will always be standing right beside you—with zero conditions and a " },
                { type: "secret", pill: "Tap to reveal ✨", reveal: "lifetime guarantee of support" },
                { type: "text", content: "." }
            ]
        ]
    },

    // 3. "Open When..." Mood Letter Box
    moodNotes: {
        heading: "Little Notes For Every Mood",
        subheading: "Tap whichever mood matches your heart right now.",
        defaultPrompt: "Choose any mood pill above to open a letter written just for you...",
        moods: [
            {
                id: "overthinking",
                label: "Overthinking Again 💭",
                tag: "Open when your mind won't slow down",
                notes: [
                    "Take a deep breath and pause for a second. Your mind is worrying about scenarios that haven't even happened yet. Remember, nothing is ever as heavy as it feels at midnight—we will figure everything out together.",
                    "If something is bothering you quietly inside, please don't carry it alone. Just send me a message—whether you want practical advice or simply someone to listen without judging, I am always right here.",
                    "What feels overwhelming today will be something you smile about a few weeks from now. Be gentle with yourself, drink some water, and trust how resilient you truly are."
                ]
            },
            {
                id: "smile",
                label: "Need a Smile ✨",
                tag: "Open when you need a gentle reminder",
                notes: [
                    "Just a quick reminder that your smile can genuinely brighten anyone's entire day. Finding someone as kind, warm, and real as you is rare—so never let anyone dim your sparkle.",
                    "Fun fact: You make the people around you happier without even trying. Take a moment today to appreciate yourself, because you really are one of a kind.",
                    "In case nobody told you today: I am super proud of you, your effort, and the grace with which you handle everything life throws your way."
                ]
            },
            {
                id: "low",
                label: "Feeling Low 🫂",
                tag: "Open on heavy or exhausting days",
                notes: [
                    "You don't have to operate at 100% energy every single day. If you're feeling drained or off today, take the pressure off yourself. Rest up, play your favorite comfort songs, and let the day pass softly.",
                    "Whenever life feels a little too loud or heavy, remember that your best friend and brother is always just one call away. You never have to go through tough days alone.",
                    "Be extra kind to your heart today. Doing your best right now is more than enough, and tomorrow brings a fresh start."
                ]
            },
            {
                id: "roast",
                label: "Roast Me Gently 🙈",
                tag: "Open when you want the honest truth",
                notes: [
                    "Let's tell the truth: your sleep schedule and your 'I promise I'll sleep early tonight' speech are both legendary myths. Still, you're adorable enough that all your excuses get forgiven immediately.",
                    "Looking at your daily decision-making skills, it's clear you need a full-time life advisor—and you should feel lucky I'm doing that job completely free of charge.",
                    "90% dramatic storytelling, 10% pure innocence, and 100% my favorite bestie. Keeping up with your chaos is a full-time adventure, and I wouldn't trade it for anything."
                ]
            }
        ]
    },

    // 4. Tactile Hold-to-Unlock Keepsake Pass
    vipPassDetails: {
        heading: "Your Personal Bestie Privilege Pass",
        subheading: "Press and hold the button below for 2 seconds to unlock your official VIP treat.",
        holdButtonText: "Press & Hold for 2 Seconds to Unlock Your Treat",
        passTitle: "Unlimited Coffee, Treats & Bhai's Time",
        passSubtitle: "This keepsake pass entitles my favorite bestie to instant treat redemptions, endless late-night talks, and unconditional support whenever she asks.",
        perks: [
            "Unlimited Coffee & Favorite Snacks Treat",
            "Priority 24/7 Rant & Advice Hotline",
            "Zero-Judgment Safe Space Forever",
            "Guaranteed Backup in Every Situation"
        ],
        codePrefix: "BESTIE-VIP"
    },

    footerNote: "Crafted with warmth & care — for the bestie who feels like family."
};

/**
 * ============================================================================
 * APPLICATION STATE
 * ============================================================================
 */
const state = {
    enteredPin: "",
    isUnlocked: false,
    isMusicPlaying: false,
    unlockedSecrets: 0,
    totalSecrets: 0,
    selectedMoodId: null,
    currentNoteIndex: -1,
    passUnlocked: false,
    generatedPassCode: ""
};

/**
 * ============================================================================
 * 0A. BACKGROUND MUSIC PLAYER WITH SMOOTH FADE-IN ON UNLOCK
 * ============================================================================
 */
let musicFadeInterval = null;

function initMusicPlayer() {
    const audioEl = document.getElementById("bgMusic");
    const toggleBtn = document.getElementById("musicToggleBtn");
    const btnLabel = document.getElementById("musicBtnLabel");

    if (!audioEl || !toggleBtn) return;

    audioEl.src = CONFIG.music.src;
    audioEl.volume = CONFIG.music.maxVolume;
    btnLabel.textContent = CONFIG.music.pausedLabel;

    function updateMusicButtonUI(playing) {
        state.isMusicPlaying = playing;
        if (playing) {
            toggleBtn.classList.add("playing");
            btnLabel.textContent = CONFIG.music.playingLabel;
        } else {
            toggleBtn.classList.remove("playing");
            btnLabel.textContent = CONFIG.music.pausedLabel;
        }
    }

    function playWithFadeIn() {
        if (state.isMusicPlaying) return;
        if (musicFadeInterval) clearInterval(musicFadeInterval);

        audioEl.volume = 0;
        const playPromise = audioEl.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    updateMusicButtonUI(true);
                    let currentVol = 0;
                    const step = CONFIG.music.maxVolume / 20;
                    musicFadeInterval = setInterval(() => {
                        currentVol = Math.min(currentVol + step, CONFIG.music.maxVolume);
                        audioEl.volume = currentVol;
                        if (currentVol >= CONFIG.music.maxVolume) {
                            clearInterval(musicFadeInterval);
                        }
                    }, 80);
                })
                .catch((err) => {
                    console.warn("Audio playback waiting for user tap:", err);
                    updateMusicButtonUI(false);
                });
        }
    }

    toggleBtn.addEventListener("click", () => {
        if (state.isMusicPlaying) {
            if (musicFadeInterval) clearInterval(musicFadeInterval);
            audioEl.pause();
            updateMusicButtonUI(false);
        } else {
            playWithFadeIn();
        }
    });

    // Expose fade-in trigger for passcode unlock
    window.startBackgroundMusicWithFade = playWithFadeIn;
}

/**
 * ============================================================================
 * 0B. CUTE ANIMAL SVG LIBRARY & AMBIENT BACKGROUND GENERATOR
 * ============================================================================
 */
const CUTE_ANIMAL_SVGS = {
    teddy: `
        <svg viewBox="0 0 100 100" fill="none">
            <circle cx="28" cy="28" r="12" fill="#e2a785"/>
            <circle cx="28" cy="28" r="7" fill="#ffb5a7"/>
            <circle cx="72" cy="28" r="12" fill="#e2a785"/>
            <circle cx="72" cy="28" r="7" fill="#ffb5a7"/>
            <ellipse cx="50" cy="54" rx="28" ry="25" fill="#e2a785"/>
            <ellipse cx="50" cy="61" rx="12" ry="9.5" fill="#fff1e6"/>
            <circle cx="39" cy="49" r="3" fill="#2b1627"/>
            <circle cx="61" cy="49" r="3" fill="#2b1627"/>
            <ellipse cx="32" cy="56" rx="4.5" ry="2.6" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="68" cy="56" rx="4.5" ry="2.6" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="50" cy="57" rx="3.5" ry="2.4" fill="#5c3728"/>
            <path d="M45 62C47 64.5 53 64.5 55 62" stroke="#5c3728" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
    bunny: `
        <svg viewBox="0 0 100 110" fill="none">
            <ellipse cx="37" cy="26" rx="8" ry="22" transform="rotate(-12 37 26)" fill="#fff8f9"/>
            <ellipse cx="37" cy="26" rx="4.2" ry="15" transform="rotate(-12 37 26)" fill="#ffb5a7"/>
            <ellipse cx="63" cy="26" rx="8" ry="22" transform="rotate(14 63 26)" fill="#fff8f9"/>
            <ellipse cx="63" cy="26" rx="4.2" ry="15" transform="rotate(14 63 26)" fill="#ffb5a7"/>
            <ellipse cx="50" cy="64" rx="26" ry="23" fill="#fff8f9"/>
            <circle cx="40" cy="61" r="3" fill="#2b1627"/>
            <circle cx="60" cy="61" r="3" fill="#2b1627"/>
            <ellipse cx="33" cy="67" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="67" cy="67" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <path d="M48 66L52 66L50 69Z" fill="#ff8fab"/>
            <path d="M46 71C47.8 72.8 49.5 72 50 70.5C50.5 72 52.2 72.8 54 71" stroke="#5c3728" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
    kitten: `
        <svg viewBox="0 0 100 100" fill="none">
            <path d="M24 46L29 18L47 36Z" fill="#f7d99c"/>
            <path d="M29 41L31 25L43 36Z" fill="#ffb5a7"/>
            <path d="M76 46L71 18L53 36Z" fill="#f7d99c"/>
            <path d="M71 41L69 25L57 36Z" fill="#ffb5a7"/>
            <ellipse cx="50" cy="56" rx="27" ry="23" fill="#f7d99c"/>
            <circle cx="40" cy="53" r="3" fill="#2b1627"/>
            <circle cx="60" cy="53" r="3" fill="#2b1627"/>
            <ellipse cx="33" cy="59" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="67" cy="59" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="50" cy="58" rx="2.8" ry="2" fill="#ff8fab"/>
            <path d="M46 62C47.8 63.8 49.5 63 50 61.5C50.5 63 52.2 63.8 54 62" stroke="#5c3728" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
    panda: `
        <svg viewBox="0 0 100 100" fill="none">
            <circle cx="27" cy="30" r="11" fill="#3d2c3e"/>
            <circle cx="73" cy="30" r="11" fill="#3d2c3e"/>
            <ellipse cx="50" cy="55" rx="28" ry="24" fill="#fff8f9"/>
            <ellipse cx="38" cy="53" rx="8" ry="6.5" transform="rotate(-18 38 53)" fill="#3d2c3e"/>
            <ellipse cx="62" cy="53" rx="8" ry="6.5" transform="rotate(18 62 53)" fill="#3d2c3e"/>
            <circle cx="39" cy="52" r="2.5" fill="#fff8f9"/>
            <circle cx="61" cy="52" r="2.5" fill="#fff8f9"/>
            <ellipse cx="30" cy="61" rx="4.5" ry="2.6" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="70" cy="61" rx="4.5" ry="2.6" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="50" cy="60" rx="3.4" ry="2.2" fill="#3d2c3e"/>
            <path d="M46 64C48 66 52 66 54 64" stroke="#3d2c3e" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
    puppy: `
        <svg viewBox="0 0 100 100" fill="none">
            <ellipse cx="23" cy="52" rx="9" ry="18" transform="rotate(16 23 52)" fill="#cdb4db"/>
            <ellipse cx="77" cy="52" rx="9" ry="18" transform="rotate(-16 77 52)" fill="#cdb4db"/>
            <ellipse cx="50" cy="53" rx="26" ry="23" fill="#fff1e6"/>
            <circle cx="40" cy="49" r="3" fill="#2b1627"/>
            <circle cx="60" cy="49" r="3" fill="#2b1627"/>
            <ellipse cx="33" cy="56" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="67" cy="56" rx="4.5" ry="2.5" fill="#ff8fab" fill-opacity="0.65"/>
            <ellipse cx="50" cy="55" rx="3.8" ry="2.6" fill="#3d2c3e"/>
            <path d="M46 60C48 62.5 52 62.5 54 60" stroke="#3d2c3e" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
    pawHeart: `
        <svg viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="50" rx="14" ry="11" fill="#ff8fab" fill-opacity="0.8"/>
            <circle cx="23" cy="33" r="6" fill="#ffb5a7" fill-opacity="0.85"/>
            <circle cx="34" cy="25" r="6" fill="#f7d99c" fill-opacity="0.85"/>
            <circle cx="46" cy="25" r="6" fill="#f7d99c" fill-opacity="0.85"/>
            <circle cx="57" cy="33" r="6" fill="#ffb5a7" fill-opacity="0.85"/>
        </svg>`
};

function initAmbientCuteAnimals() {
    const layer = document.getElementById("ambientAnimalsLayer");
    if (!layer) return;
    layer.innerHTML = "";

    // Positioned thoughtfully around screen margins so they peek around the centered glass cards
    const placements = [
        { type: "teddy", top: "6%", left: "4%", size: 78, dur: "7.5s", delay: "0s", rotStart: "-6deg", rotEnd: "5deg" },
        { type: "bunny", top: "14%", right: "5%", size: 74, dur: "8.2s", delay: "0.8s", rotStart: "5deg", rotEnd: "-6deg" },
        { type: "pawHeart", top: "28%", left: "8%", size: 46, dur: "6.4s", delay: "1.2s", rotStart: "-10deg", rotEnd: "8deg" },
        { type: "kitten", top: "38%", right: "4%", size: 76, dur: "7.8s", delay: "0.4s", rotStart: "-5deg", rotEnd: "6deg" },
        { type: "panda", top: "54%", left: "3%", size: 80, dur: "8.6s", delay: "1.5s", rotStart: "4deg", rotEnd: "-5deg" },
        { type: "pawHeart", top: "64%", right: "9%", size: 48, dur: "6.8s", delay: "0.6s", rotStart: "8deg", rotEnd: "-9deg" },
        { type: "puppy", top: "76%", left: "6%", size: 74, dur: "7.4s", delay: "1.1s", rotStart: "-6deg", rotEnd: "4deg" },
        { type: "teddy", top: "84%", right: "5%", size: 72, dur: "8.0s", delay: "0.3s", rotStart: "5deg", rotEnd: "-5deg" },
        { type: "bunny", top: "46%", left: "14%", size: 54, dur: "9.0s", delay: "1.9s", rotStart: "-4deg", rotEnd: "5deg" },
        { type: "kitten", top: "22%", right: "15%", size: 52, dur: "8.5s", delay: "1.4s", rotStart: "6deg", rotEnd: "-4deg" }
    ];

    placements.forEach((item) => {
        const wrapper = document.createElement("div");
        wrapper.className = "floating-critter";
        wrapper.style.width = `${item.size}px`;
        wrapper.style.height = `${item.size}px`;
        if (item.top) wrapper.style.top = item.top;
        if (item.left) wrapper.style.left = item.left;
        if (item.right) wrapper.style.right = item.right;
        wrapper.style.setProperty("--dur", item.dur);
        wrapper.style.setProperty("--delay", item.delay);
        wrapper.style.setProperty("--rot-start", item.rotStart);
        wrapper.style.setProperty("--rot-end", item.rotEnd);
        wrapper.innerHTML = CUTE_ANIMAL_SVGS[item.type] || "";
        layer.appendChild(wrapper);
    });

    // Subtle mouse parallax depth for desktop
    window.addEventListener("mousemove", (e) => {
        const xRatio = (e.clientX / window.innerWidth - 0.5) * -18;
        const yRatio = (e.clientY / window.innerHeight - 0.5) * -18;
        layer.style.transform = `translate3d(${xRatio}px, ${yRatio}px, 0)`;
    }, { passive: true });
}

/**
 * ============================================================================
 * 0C. INTERACTIVE CUTE PASSCODE LOCK SCREEN LOGIC
 * ============================================================================
 */
function initPasscodeLockScreen() {
    const lockScreen = document.getElementById("passcodeLockScreen");
    const peekingTeddy = document.getElementById("peekingTeddy");
    const lockStatusMsg = document.getElementById("lockStatusMsg");
    const hintTextEl = document.getElementById("passcodeHintText");
    const pinDots = document.querySelectorAll("#pinDotsRow .pin-dot");
    const digitButtons = document.querySelectorAll(".keypad-btn[data-digit]");
    const clearBtn = document.getElementById("keypadClearBtn");
    const backBtn = document.getElementById("keypadBackBtn");

    hintTextEl.textContent = CONFIG.passcodeHint;

    // Wiggle teddy's ears when tapped
    peekingTeddy.addEventListener("click", () => {
        peekingTeddy.classList.remove("wiggle");
        void peekingTeddy.offsetWidth;
        peekingTeddy.classList.add("wiggle");
        if (navigator.vibrate) {
            try { navigator.vibrate(15); } catch (e) {}
        }
    });

    function updatePinUI(isError = false) {
        pinDots.forEach((dot, idx) => {
            dot.classList.remove("filled", "error");
            if (isError) {
                dot.classList.add("error");
            } else if (idx < state.enteredPin.length) {
                dot.classList.add("filled");
            }
        });

        // Teddy covers eyes shyly while user enters digits
        if (state.enteredPin.length > 0 && state.enteredPin.length < 4 && !isError) {
            peekingTeddy.classList.add("covering-eyes");
        } else {
            peekingTeddy.classList.remove("covering-eyes");
        }
    }

    function handleDigitInput(digit) {
        if (state.isUnlocked || state.enteredPin.length >= 4) return;

        state.enteredPin += String(digit);
        updatePinUI(false);

        if (navigator.vibrate) {
            try { navigator.vibrate(14); } catch (e) {}
        }

        if (state.enteredPin.length === 4) {
            setTimeout(verifyPasscode, 180);
        }
    }

    function handleBackspace() {
        if (state.isUnlocked || state.enteredPin.length === 0) return;
        state.enteredPin = state.enteredPin.slice(0, -1);
        updatePinUI(false);
    }

    function handleClear() {
        if (state.isUnlocked) return;
        state.enteredPin = "";
        lockStatusMsg.textContent = "Unlock your private little corner of the internet";
        lockStatusMsg.classList.remove("text-rose-300");
        updatePinUI(false);
    }

    function verifyPasscode() {
        if (state.enteredPin === String(CONFIG.passcode)) {
            // Correct PIN! Teddy cheers, music fades in, and lock screen opens
            state.isUnlocked = true;
            peekingTeddy.classList.remove("covering-eyes");
            peekingTeddy.classList.add("cheer-bounce");
            lockStatusMsg.textContent = "Yay! Welcome in, Bestie ✨";
            lockStatusMsg.classList.add("text-champagne");

            if (navigator.vibrate) {
                try { navigator.vibrate([30, 25, 60]); } catch (e) {}
            }

            if (typeof window.startBackgroundMusicWithFade === "function") {
                window.startBackgroundMusicWithFade();
            }

            triggerCuteCelebrationBurst();

            setTimeout(() => {
                lockScreen.classList.add("unlocked-exit");
                document.body.classList.remove("locked");
                document.body.classList.add("unlocked");
            }, 520);
        } else {
            // Wrong PIN! Gentle head-shake and reset
            peekingTeddy.classList.remove("covering-eyes", "head-shake");
            void peekingTeddy.offsetWidth;
            peekingTeddy.classList.add("head-shake");
            lockStatusMsg.textContent = "Oops! Try the secret code again 🧸";
            lockStatusMsg.classList.add("text-rose-300");
            updatePinUI(true);

            if (navigator.vibrate) {
                try { navigator.vibrate([40, 30, 40]); } catch (e) {}
            }

            setTimeout(() => {
                state.enteredPin = "";
                updatePinUI(false);
            }, 550);
        }
    }

    digitButtons.forEach((btn) => {
        btn.addEventListener("click", () => handleDigitInput(btn.dataset.digit));
    });

    clearBtn.addEventListener("click", handleClear);
    backBtn.addEventListener("click", handleBackspace);

    // Physical keyboard number support
    window.addEventListener("keydown", (e) => {
        if (state.isUnlocked) return;
        if (e.key >= "0" && e.key <= "9") {
            const matchingBtn = document.querySelector(`.keypad-btn[data-digit="${e.key}"]`);
            if (matchingBtn) {
                matchingBtn.classList.add("pressed");
                setTimeout(() => matchingBtn.classList.remove("pressed"), 140);
            }
            handleDigitInput(e.key);
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Escape") {
            handleClear();
        }
    });
}

/**
 * ============================================================================
 * 1. INITIALIZE HERO & FOOTER
 * ============================================================================
 */
function initHeroAndFooter() {
    document.getElementById("heroBadge").textContent = CONFIG.hero.badge;
    document.getElementById("heroTitle").innerHTML = `
        ${CONFIG.hero.titlePrefix}<span class="italic font-normal text-champagne">${CONFIG.hero.titleHighlight}</span>${CONFIG.hero.titleSuffix}
    `;
    document.getElementById("heroSubtitle").textContent = CONFIG.hero.subtitle;
    document.getElementById("footerNote").textContent = CONFIG.footerNote;
}

/**
 * ============================================================================
 * 2. INITIALIZE INTERACTIVE STORY CARD ("The Unfiltered Truth")
 * ============================================================================
 */
function initStoryCard() {
    const headingEl = document.getElementById("storyHeading");
    const containerEl = document.getElementById("storyContainer");
    const counterEl = document.getElementById("secretCounter");
    const revealAllBtn = document.getElementById("revealAllBtn");

    headingEl.textContent = CONFIG.storyRevealItems.heading;
    containerEl.innerHTML = "";
    state.unlockedSecrets = 0;
    state.totalSecrets = 0;

    const secretElements = [];

    CONFIG.storyRevealItems.paragraphs.forEach((segments) => {
        const p = document.createElement("p");

        segments.forEach((seg) => {
            if (seg.type === "text") {
                p.appendChild(document.createTextNode(seg.content));
            } else if (seg.type === "secret") {
                state.totalSecrets++;
                const pill = document.createElement("button");
                pill.type = "button";
                pill.className = "secret-pill";
                pill.textContent = seg.pill;
                pill.dataset.revealed = "false";
                pill.setAttribute("aria-label", "Tap to reveal secret text");

                const revealSecret = () => {
                    if (pill.dataset.revealed === "true") return;
                    pill.dataset.revealed = "true";
                    pill.textContent = seg.reveal;
                    pill.classList.add("revealed");
                    state.unlockedSecrets++;
                    updateSecretCounter();

                    if (navigator.vibrate) {
                        try { navigator.vibrate(20); } catch (e) {}
                    }
                };

                pill.addEventListener("click", revealSecret);
                secretElements.push(revealSecret);
                p.appendChild(pill);
            }
        });

        containerEl.appendChild(p);
    });

    function updateSecretCounter() {
        counterEl.textContent = `${state.unlockedSecrets} of ${state.totalSecrets} secrets unlocked`;
        if (state.unlockedSecrets === state.totalSecrets) {
            counterEl.classList.add("border-champagne/50", "text-champagne", "bg-champagne/15");
            revealAllBtn.textContent = "All revealed ✨";
            revealAllBtn.disabled = true;
            revealAllBtn.classList.add("opacity-60", "no-underline", "cursor-default");
        }
    }

    updateSecretCounter();

    revealAllBtn.addEventListener("click", () => {
        secretElements.forEach((fn, idx) => {
            setTimeout(fn, idx * 140);
        });
    });
}

/**
 * ============================================================================
 * 3. INITIALIZE "OPEN WHEN..." MOOD LETTER BOX
 * ============================================================================
 */
function initMoodLetters() {
    const headingEl = document.getElementById("moodHeading");
    const subheadingEl = document.getElementById("moodSubheading");
    const buttonsGrid = document.getElementById("moodButtonsGrid");
    const letterCard = document.getElementById("letterCard");
    const headerTag = document.getElementById("letterHeaderTag");
    const bodyText = document.getElementById("letterBodyText");
    const signatureEl = document.getElementById("letterSignature");
    const anotherBtn = document.getElementById("anotherNoteBtn");

    headingEl.textContent = CONFIG.moodNotes.heading;
    subheadingEl.textContent = CONFIG.moodNotes.subheading;
    bodyText.textContent = CONFIG.moodNotes.defaultPrompt;
    signatureEl.textContent = `— ${CONFIG.senderRole}`;
    buttonsGrid.innerHTML = "";

    function displayMoodNote(moodObj) {
        state.selectedMoodId = moodObj.id;

        // Update active pill styling
        Array.from(buttonsGrid.children).forEach((btn) => {
            if (btn.dataset.moodId === moodObj.id) {
                btn.classList.add("bg-white/25", "border-champagne/60", "text-white", "shadow-md");
                btn.classList.remove("bg-white/10", "border-white/20", "text-rose-100");
            } else {
                btn.classList.remove("bg-white/25", "border-champagne/60", "text-white", "shadow-md");
                btn.classList.add("bg-white/10", "border-white/20", "text-rose-100");
            }
        });

        // Select a different note index if cycling
        let nextIdx = Math.floor(Math.random() * moodObj.notes.length);
        if (moodObj.notes.length > 1 && nextIdx === state.currentNoteIndex) {
            nextIdx = (nextIdx + 1) % moodObj.notes.length;
        }
        state.currentNoteIndex = nextIdx;

        // Smoothly transition letter card
        letterCard.classList.add("letter-transition");
        setTimeout(() => {
            headerTag.textContent = moodObj.tag;
            bodyText.textContent = moodObj.notes[nextIdx];
            anotherBtn.classList.remove("hidden");
            anotherBtn.classList.add("inline-flex");
            letterCard.classList.remove("letter-transition");
        }, 220);
    }

    CONFIG.moodNotes.moods.forEach((mood) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.moodId = mood.id;
        btn.className = "px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-rose-100 text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between active:scale-[0.98]";
        btn.innerHTML = `<span>${mood.label}</span>`;
        btn.addEventListener("click", () => displayMoodNote(mood));
        buttonsGrid.appendChild(btn);
    });

    anotherBtn.addEventListener("click", () => {
        if (!state.selectedMoodId) return;
        const activeMood = CONFIG.moodNotes.moods.find((m) => m.id === state.selectedMoodId);
        if (activeMood) displayMoodNote(activeMood);
    });
}

/**
 * ============================================================================
 * 4. INITIALIZE TACTILE HOLD-TO-UNLOCK KEEPSAKE PASS
 * ============================================================================
 */
function initKeepsakePass() {
    const headingEl = document.getElementById("voucherHeading");
    const subheadingEl = document.getElementById("voucherSubheading");
    const holdSection = document.getElementById("holdSection");
    const holdBtn = document.getElementById("holdUnlockBtn");
    const holdFill = document.getElementById("holdFillBar");
    const holdBtnText = document.getElementById("holdBtnText");
    const vipPassCard = document.getElementById("vipPassCard");
    const passIssuedDate = document.getElementById("passIssuedDate");
    const passTitle = document.getElementById("passTitle");
    const passSubtitle = document.getElementById("passSubtitle");
    const passPerksGrid = document.getElementById("passPerksGrid");
    const passCodeText = document.getElementById("passCodeText");
    const copyPassBtn = document.getElementById("copyPassBtn");
    const copyBtnLabel = document.getElementById("copyBtnLabel");

    headingEl.textContent = CONFIG.vipPassDetails.heading;
    subheadingEl.textContent = CONFIG.vipPassDetails.subheading;
    holdBtnText.textContent = CONFIG.vipPassDetails.holdButtonText;

    const HOLD_TIME_MS = 2000;
    let startTime = null;
    let rafId = null;
    let holding = false;

    function createPassCode() {
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${CONFIG.vipPassDetails.codePrefix}-${randomPart}`;
    }

    function revealVipPass() {
        if (state.passUnlocked) return;
        state.passUnlocked = true;

        if (navigator.vibrate) {
            try { navigator.vibrate([35, 30, 70]); } catch (e) {}
        }

        // Trigger warm pastel hearts, paws & gold confetti burst
        triggerCuteCelebrationBurst();

        const today = new Date();
        passIssuedDate.textContent = today.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        passTitle.textContent = CONFIG.vipPassDetails.passTitle;
        passSubtitle.textContent = CONFIG.vipPassDetails.passSubtitle;

        passPerksGrid.innerHTML = "";
        CONFIG.vipPassDetails.perks.forEach((perk) => {
            const div = document.createElement("div");
            div.className = "flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-rose-50";
            div.innerHTML = `
                <span class="text-champagne font-bold">&#10022;</span>
                <span>${perk}</span>
            `;
            passPerksGrid.appendChild(div);
        });

        state.generatedPassCode = createPassCode();
        passCodeText.textContent = state.generatedPassCode;

        holdSection.classList.add("hidden");
        vipPassCard.classList.remove("hidden");
    }

    function stepHold(timestamp) {
        if (!holding || state.passUnlocked) return;
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const pct = Math.min((elapsed / HOLD_TIME_MS) * 100, 100);
        holdFill.style.width = `${pct}%`;

        if (pct > 15 && pct < 100) {
            holdBtnText.classList.add("text-plum");
        }

        if (pct >= 100) {
            holding = false;
            revealVipPass();
        } else {
            rafId = requestAnimationFrame(stepHold);
        }
    }

    function beginHold(e) {
        if (state.passUnlocked) return;
        if (e.type === "mousedown" && e.button !== 0) return;
        holding = true;
        startTime = null;
        rafId = requestAnimationFrame(stepHold);
    }

    function endHold() {
        if (!holding || state.passUnlocked) return;
        holding = false;
        if (rafId) cancelAnimationFrame(rafId);
        holdFill.style.width = "0%";
        holdBtnText.classList.remove("text-plum");
    }

    holdBtn.addEventListener("mousedown", beginHold);
    holdBtn.addEventListener("touchstart", beginHold, { passive: true });
    window.addEventListener("mouseup", endHold);
    window.addEventListener("touchend", endHold);
    window.addEventListener("touchcancel", endHold);
    holdBtn.addEventListener("mouseleave", endHold);

    // Copy Pass Code with reliable execCommand fallback
    copyPassBtn.addEventListener("click", () => {
        const copyPayload = `${state.generatedPassCode} — ${CONFIG.vipPassDetails.passTitle}`;
        const helperArea = document.createElement("textarea");
        helperArea.value = copyPayload;
        helperArea.style.position = "fixed";
        helperArea.style.opacity = "0";
        document.body.appendChild(helperArea);
        helperArea.select();

        try {
            document.execCommand("copy");
            copyBtnLabel.textContent = "Copied!";
            showToast("Pass code copied! Send it to claim your treat.");
            setTimeout(() => {
                copyBtnLabel.textContent = "Copy Pass Code";
            }, 2500);
        } catch (err) {
            console.error("Clipboard copy error:", err);
        } finally {
            document.body.removeChild(helperArea);
        }
    });
}

function showToast(message) {
    const toast = document.getElementById("toastBanner");
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-3");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-3");
        toast.classList.remove("opacity-100", "translate-y-0");
    }, 3000);
}

/**
 * ============================================================================
 * 5. PASTEL HEARTS, PAWS & CHAMPAGNE GOLD CELEBRATION BURST
 * ============================================================================
 */
function drawMiniHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.35, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.35, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

function triggerCuteCelebrationBurst() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const palette = ["#ff8fab", "#ffb5a7", "#f7d99c", "#cdb4db", "#fff8f9"];
    const particles = [];

    for (let i = 0; i < 95; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height * 0.52,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 1.1) * 15 - 2,
            size: Math.random() * 7 + 5,
            color: palette[Math.floor(Math.random() * palette.length)],
            gravity: 0.24,
            alpha: 1,
            shape: Math.random() > 0.45 ? "heart" : "circle"
        });
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = 0;

        particles.forEach((p) => {
            if (p.alpha <= 0) return;
            alive++;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.985;
            p.alpha -= 0.011;

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            if (p.shape === "heart") {
                drawMiniHeart(ctx, p.x, p.y, p.size * 1.45);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        if (alive > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animateConfetti();
}

/**
 * ============================================================================
 * INITIALIZE ON WINDOW LOAD
 * ============================================================================
 */
window.onload = function () {
    try {
        initMusicPlayer();
        initAmbientCuteAnimals();
        initPasscodeLockScreen();
        initHeroAndFooter();
        initStoryCard();
        initMoodLetters();
        initKeepsakePass();
    } catch (error) {
        console.error("Failed to initialize keepsake experience:", error);
    }
};
