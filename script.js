const wordsList = ["Forever", "Love", "Fight", "Always", "Trust", "Eternity", "Together", "Destiny", "Zinia", "Cherish", "Promise", "Mine"];
const totalWords = 60; // Total words to make a solid heart outline
const container = document.getElementById('word-container');
const elements = [];

// Step 1: Create the words at the exact center of the screen
for (let i = 0; i < totalWords; i++) {
    const el = document.createElement('div');
    el.className = 'word';
    el.innerText = wordsList[i % wordsList.length];
    
    // Start at 50% (center of the container)
    el.style.left = '50%';
    el.style.top = '50%';
    
    container.appendChild(el);
    elements.push(el);
}

// Step 2: Explode them outward randomly
setTimeout(() => {
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.transform = `translate(-50%, -50%) scale(${Math.random() + 0.5})`;
    });
}, 100);

// Step 3: Math perfectly moves them into a heart shape using percentages
setTimeout(() => {
    elements.forEach((el, i) => {
        const t = (i / totalWords) * Math.PI * 2;
        // Mathematical equation for a heart
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

        // Multiply by 2.5 to scale it, add 50 to center it in the 0-100% grid
        el.style.left = `${50 + (x * 2.5)}%`;
        el.style.top = `${50 + (y * 2.5)}%`;
        el.style.transform = `translate(-50%, -50%) scale(1)`;
    });
}, 2500);

// Step 4: Spin the whole heart
setTimeout(() => {
    // Add 360deg rotation to the existing translate to keep it centered
    container.style.transform = 'translate(-50%, -50%) rotate(360deg)';
}, 5000);

// Step 5: Dim the heart, reveal the centered box, and type the message
setTimeout(() => {
    container.style.opacity = '0.2'; // Dim the background heart
    const dialogBox = document.getElementById('dialog-box');
    dialogBox.classList.add('show');
    
    // Start typing slightly after the box appears
    setTimeout(typeWriter, 1000);
}, 7500);

// Typewriter logic
const message = "Dear Zinia,\n\nI want to fight for us, love you forever, and cherish every single day together.\n\nWill you be mine?";
let charIndex = 0;

function typeWriter() {
    if (charIndex < message.length) {
        const char = message.charAt(charIndex);
        const textContainer = document.getElementById('typewriter');
        
        // Convert newlines to HTML breaks
        if (char === '\n') {
            textContainer.innerHTML += '<br>';
        } else {
            textContainer.innerHTML += char;
        }
        
        charIndex++;
        setTimeout(typeWriter, 60); // Speed of typing
    }
}
