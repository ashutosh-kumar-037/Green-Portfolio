// js/ui/typing.js

document.addEventListener('DOMContentLoaded', () => {
    const roles = ["Fullstack Developer", "Fresher", "College Student"];
    const typingTexts = document.querySelectorAll('.typing-text');

    // Add cursor styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .typing-cursor {
            font-weight: bold;
            color: var(--accent);
            margin-left: 2px;
            animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    let roleIndex = 0;
    let charIndex = roles[0].length; // Start fully typed for the first role
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentRole = roles[roleIndex];

        // Update all typing elements concurrently
        typingTexts.forEach(el => {
            el.textContent = currentRole.substring(0, charIndex);
        });

        // Determine what to do next
        if (!isDeleting && charIndex === currentRole.length) {
            // Word is perfectly typed, pause and then start deleting
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of word
        }
        else if (isDeleting && charIndex === 0) {
            // Word is perfectly deleted, pause and then type next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        else {
            // Continue typing or deleting
            if (isDeleting) {
                charIndex--;
                typingSpeed = 50; // Faster deleting
            } else {
                charIndex++;
                typingSpeed = 100 + Math.random() * 50; // Normal typing with variance
            }
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect initially
    if (typingTexts.length > 0) {
        // First delay before it starts deleting the initial text
        setTimeout(() => {
            isDeleting = true;
            charIndex--; // begin deleting the first char
            typingSpeed = 50;
            type();
        }, 2000);
    }
});
