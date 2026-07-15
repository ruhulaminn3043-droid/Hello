const wordsList = [
    "Forever", "Love", "Fight", "Always", "Trust", "Eternity", 
    "Together", "Destiny", "Soulmate", "Passion", "Adore", "Cherish", 
    "Endless", "Promise", "Beautiful", "Us", "Devotion", "Happiness", 
    "Romance", "Care", "Mine", "Heart", "Journey"
];

// Generate 60 words for a dense heart shape
const words = [];
for (let i = 0; i < 60; i++) {
    words.push(wordsList[i % wordsList.length]);
}

const container = document.getElementById('heart-container');
const elements = [];

// Step 1: Spawn words randomly off-screen or scattered
words.forEach((word) => {
    const el = document.createElement('div');
    el.className = 'word';
    el.innerText = word;
    
    // Start at completely random positions and rotations
    el.style.left = (Math.random() * window.innerWidth) + 'px';
    el.style.top = (Math.random() * window.innerHeight) + 'px';
    el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 720 - 360}deg) scale(0.1)`;
    
    // Random shades of pink/red/white
    const colors = ['#ff69b4', '#ff1493', '#fff0f5', '#ffb6c1'];
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(el);
    elements.push(el);
});

// Step 2: Assemble them into a heart shape
setTimeout(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Scale heart size based on screen width/height
    const scale = Math.min(window.innerWidth, window.innerHeight) / 45;

    elements.forEach((el, i) => {
        // Parametric equation for a heart
        const t = (i / elements.length) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

        // Move to heart coordinates and spin into place
        el.style.left = (centerX + x * scale) + 'px';
        el.style.top = (centerY + y * scale) + 'px';
        el.style.opacity = '1';
        el.style.transform = `translate(-50%, -50%) rotate(360deg) scale(1)`;
    });
}, 500);

// Step 3: Spin the entire assembled heart
setTimeout(() => {
    container.classList.add('spin-heart');
}, 3500);

// Step 4: Dim the heart, show the dialog, and start the typewriter
setTimeout(() => {
    // Make the heart fade slightly into the background
    elements.forEach(el => el.style.opacity = '0.15');
    
    const dialog = document.getElementById('dialog-box');
    dialog.style.display = 'block';
    
    // Small delay to allow display:block to register before opacity transition
    setTimeout(() => {
        dialog.classList.remove('hidden');
        typeWriter();
    }, 50);
}, 6500);

// The Typewriter Logic
const message = "Dear Zinia,\n\nFrom the moment you walked into my life, everything made sense. I want to fight for us, love you forever, and cherish every single day together.\n\nWill you be mine?";
let charIndex = 0;

function typeWriter() {
    if (charIndex < message.length) {
        const char = message.charAt(charIndex);
        const textContainer = document.getElementById('typewriter-text');
        
        // Handle line breaks
        if (char === '\n') {
            textContainer.innerHTML += '<br>';
        } else {
            textContainer.innerHTML += char;
        }
        
        charIndex++;
        
        // Slight randomization in typing speed for realism (between 40ms and 90ms)
        const typeSpeed = Math.random() * 50 + 40;
        setTimeout(typeWriter, typeSpeed);
    }
}
