// ============================================================
//  TAMIL ISLAMIC VOICE - Radio Player JavaScript
// ============================================================

// ---------- DOM REFS ----------
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const stationNameEl = document.getElementById('stationName');
const stationStatus = document.getElementById('stationStatus');
const listenerCount = document.getElementById('listenerCount');
const liveTime = document.getElementById('liveTime');
const stationPlayBtns = document.querySelectorAll('.station-play-btn');
const stationCards = document.querySelectorAll('.station-card');

// ---------- AUDIO CONTEXT ----------
let audio = null;
let currentStation = {
    url: 'https://stream.zeno.fm/v6mwdn1kcd0uv',
    name: 'Tamil Islamic Voice'
};

// ---------- INITIALIZE AUDIO ----------
function initAudio(url) {
    if (audio) {
        audio.pause();
        audio.src = '';
        audio = null;
    }
    audio = new Audio(url);
    audio.volume = parseFloat(volumeSlider.value);
    audio.autoplay = true;

    // Update status when playing
    audio.addEventListener('playing', () => {
        stationStatus.textContent = '▶ Playing now...';
        stationStatus.style.color = '#7bed9f';
    });
    audio.addEventListener('pause', () => {
        stationStatus.textContent = '⏸ Paused';
        stationStatus.style.color = '#ffb142';
    });
    audio.addEventListener('error', () => {
        stationStatus.textContent = '⚠ Connection error. Retrying...';
        stationStatus.style.color = '#ff6b6b';
        // Retry after 3 seconds
        setTimeout(() => {
            if (audio) {
                audio.load();
                audio.play().catch(() => {});
            }
        }, 3000);
    });
    // Auto-reconnect on ended (for streams that may drop)
    audio.addEventListener('ended', () => {
        if (audio) {
            audio.load();
            audio.play().catch(() => {});
        }
    });
}

// ---------- PLAY / STOP ----------
function playStation(url, name) {
    if (!url) return;
    currentStation.url = url;
    currentStation.name = name || 'Tamil Islamic Voice';
    stationNameEl.textContent = currentStation.name;

    // Highlight active station
    stationCards.forEach(card => {
        card.classList.remove('active');
        const btn = card.querySelector('.station-play-btn');
        if (btn && btn.dataset.url === url) {
            card.classList.add('active');
        }
    });

    initAudio(url);
    audio.play().catch(err => {
        console.warn('Autoplay blocked?', err);
        stationStatus.textContent = '⚠ Click play to start';
        stationStatus.style.color = '#ffb142';
    });
    stationStatus.textContent = '⏳ Connecting...';
    stationStatus.style.color = '#f9ca24';
}

function stopStation() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        stationStatus.textContent = '⏹ Stopped';
        stationStatus.style.color = '#aaa';
        stationCards.forEach(c => c.classList.remove('active'));
    }
}

// ---------- EVENT: Play Button ----------
playBtn.addEventListener('click', () => {
    if (audio) {
        audio.play().catch(() => {
            // if failed, re-init
            playStation(currentStation.url, currentStation.name);
        });
    } else {
        playStation(currentStation.url, currentStation.name);
    }
});

// ---------- EVENT: Stop Button ----------
stopBtn.addEventListener('click', stopStation);

// ---------- EVENT: Volume ----------
volumeSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    if (audio) audio.volume = vol;
    // Update icon
    if (vol === 0) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (vol < 0.5) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

// ---------- EVENT: Station Play Buttons ----------
stationPlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.url;
        const name = btn.dataset.name;
        if (url) {
            // Stop current, play new
            if (audio) {
                audio.pause();
                audio.src = '';
                audio = null;
            }
            playStation(url, name);
        }
    });
});

// ---------- AUTO-PLAY ON PAGE LOAD ----------
document.addEventListener('DOMContentLoaded', () => {
    // Start with main station
    playStation('https://stream.zeno.fm/v6mwdn1kcd0uv', 'Tamil Islamic Voice');

    // Set initial volume icon
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';

    // Live time updater
    function updateClock() {
        const now = new Date();
        liveTime.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Random listener count simulation (just for fun)
    setInterval(() => {
        const base = 120;
        const variation = Math.floor(Math.random() * 30) - 10;
        listenerCount.textContent = Math.max(20, base + variation);
    }, 8000);
});

// ---------- MOBILE MENU TOGGLE ----------
const menuToggle = document.getElementById('menuToggle');
const navUl = document.querySelector('nav ul');
if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
    });
}

// ---------- CONTACT FORM (simple handler) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon. Insha\'Allah.');
        contactForm.reset();
    });
}

// ---------- KEYBOARD SHORTCUTS ----------
document.addEventListener('keydown', (e) => {
    // Space = play/pause
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
        e.preventDefault();
        if (audio && !audio.paused) {
            audio.pause();
            stationStatus.textContent = '⏸ Paused';
            stationStatus.style.color = '#ffb142';
        } else if (audio) {
            audio.play().catch(() => playStation(currentStation.url, currentStation.name));
        } else {
            playStation(currentStation.url, currentStation.name);
        }
    }
});

console.log('🎙️ Tamil Islamic Voice - Radio Player loaded successfully!');