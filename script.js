// Wait for the HTML to fully load before running the animation
document.addEventListener('DOMContentLoaded', () => {
    
    const wordsList = [
        "Forever", "Love", "Always", "Trust", "Eternity", "Together", 
        "Destiny", "Zinia", "Cherish", "Promise", "Mine", "Adore", 
        "Soulmate", "Passion", "Beautiful", "Endless", "Devotion", 
        "Happiness", "Romance", "Care", "Heart", "Journey", "Dream", 
        "Angel", "Sweetheart", "Magic", "Everything"
    ];
    
    const totalWords = 250; 
    const container = document.getElementById('word-container');
    const elements = [];

    if (!container) return; // Failsafe in case HTML is missing

    // 1. Stack words in the center
    for (let i = 0; i < totalWords; i++) {
        const el = document.createElement('div');
        el.className = 'word';
        el.innerText = wordsList[i % wordsList.length];
        el.style.left = '50%';
        el.style.top = '50%';
        container.appendChild(el);
        elements.push(el);
    }

    // 2. Explode outward
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = '1';
            const rx = (Math.random() - 0.5) * 150; 
            const ry = (Math.random() - 0.5) * 150;
            const rz = (Math.random() - 0.5) * 800;
            el.style.transform = `translate(-50%, -50%) translate3d(${rx}vw, ${ry}vh, ${rz}px)`;
        });
    }, 100);

    // 3. Assemble the 3D heart
    setTimeout(() => {
        elements.forEach((el, i) => {
            const t = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI * 2;

            const x2d = 16 * Math.pow(Math.sin(t), 3);
            const y2d = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            const x = x2d * Math.cos(theta);
            const z = x2d * Math.sin(theta);
            const y = y2d;

            el.style.transform = `translate(-50%, -50%) translate3d(${x * 2.2}vmin, ${y * 2.2}vmin, ${z * 2.2}vmin)`;
        });
    }, 4500);

    // 4. Start the spin
    setTimeout(() => {
        container.classList.add('spinning');
    }, 7800);

    // 5. Dim the heart and show message box
    setTimeout(() => {
        container.style.opacity = '0.15'; 
        const dialogBox = document.getElementById('dialog-box');
        if(dialogBox) dialogBox.classList.add('show');
        setTimeout(typeWriter, 1000);
    }, 11000);

    // 6. Typewriter effect
    const message = "Dear Zinia,\n\nYou are the most beautiful part of my life. You are my greatest adventure and my safest place. I want to stand by your side, love you forever, and cherish every single day together.\n\nWill you be mine?";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < message.length) {
            const char = message.charAt(charIndex);
            const textContainer = document.getElementById('typewriter');
            
            if (textContainer) {
                if (char === '\n') {
                    textContainer.innerHTML += '<br>';
                } else {
                    textContainer.innerHTML += char;
                }
            }
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
});
