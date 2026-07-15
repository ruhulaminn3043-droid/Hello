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
    const wrappers = [];

    if (!container) return;

    // 1. Create words stacked in the center
    for (let i = 0; i < totalWords; i++) {
        // The wrapper handles the big 3D math positions
        const wrapper = document.createElement('div');
        wrapper.className = 'word-wrapper';
        
        // The text span handles the chaotic floating animation
        const text = document.createElement('span');
        text.className = 'word-text';
        text.innerText = wordsList[i % wordsList.length];
        
        // Randomize the animation delay so they don't pulse together
        text.style.animationDelay = `-${Math.random() * 2}s`;
        
        wrapper.appendChild(text);
        container.appendChild(wrapper);
        wrappers.push({ wrapper, text });
    }

    // 2. The Big Bang: Explode outward into the galaxy
    setTimeout(() => {
        wrappers.forEach(item => {
            item.text.style.opacity = '1';
            
            // Massive random spread
            const rx = (Math.random() - 0.5) * 200; // viewport width spread
            const ry = (Math.random() - 0.5) * 200; // viewport height spread
            const rz = (Math.random() - 0.5) * 1200; // deep 3D space spread
            
            item.wrapper.style.transform = `translate(-50%, -50%) translate3d(${rx}vw, ${ry}vh, ${rz}px)`;
        });
    }, 100);

    // 3. Assemble the 3D heart
    setTimeout(() => {
        // Change the class to calm down the gas particle floating
        container.classList.add('heart-phase');

        wrappers.forEach((item, i) => {
            const t = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI * 2;

            // Heart Math
            const x2d = 16 * Math.pow(Math.sin(t), 3);
            const y2d = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            // Map to 3D Sphere
            const x = x2d * Math.cos(theta);
            const z = x2d * Math.sin(theta);
            const y = y2d;

            item.wrapper.style.transform = `translate(-50%, -50%) translate3d(${x * 2.2}vmin, ${y * 2.2}vmin, ${z * 2.2}vmin)`;
        });
    }, 5500); // Wait 5.5s for the bang to finish

    // 4. Blur the spinning heart, show message box
    setTimeout(() => {
        container.classList.add('blurred'); 
        
        const dialogBox = document.getElementById('dialog-box');
        if(dialogBox) dialogBox.classList.add('show');
        
        // Start typing shortly after box appears
        setTimeout(typeWriter, 1000);
    }, 10500);

    // 5. Typewriter effect
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
        } else {
            // Show the pull-to-refresh hint when typing finishes
            document.getElementById('refresh-hint').classList.add('show');
        }
    }

    // ==========================================
    // PULL TO REFRESH LOGIC (Mobile Friendly)
    // ==========================================
    let startY = 0;
    let isPulling = false;

    // Detect when touch starts
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isPulling = true;
    }, { passive: true });

    // Detect downward pull
    document.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        const currentY = e.touches[0].clientY;
        const distancePulled = currentY - startY;

        // If pulled down by more than 150px, trigger reload
        if (distancePulled > 150) {
            isPulling = false;
            window.location.reload();
        }
    }, { passive: true });

    // Reset pulling state on touch end
    document.addEventListener('touchend', () => {
        isPulling = false;
    }, { passive: true });
});
