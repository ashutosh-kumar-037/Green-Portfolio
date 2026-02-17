function initCardEffects() {
    // Individual Card Tilt on Hover
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 100;
            const rotateY = (centerX - x) / 100;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
                overwrite: true
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                overwrite: true
            });
        });
    });

    // Magnetic Buttons Effect
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
                overwrite: true
            });
        });
    });

    // Petal Burst Click Effect
    document.addEventListener('mousedown', (e) => {
        const petalCount = 12;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal-burst';
            document.body.appendChild(petal);

            const angle = (Math.PI * 2 / petalCount) * i + (Math.random() * 0.5);
            const distance = 60 + Math.random() * 120;
            const destX = e.clientX + Math.cos(angle) * distance;
            const destY = e.clientY + Math.sin(angle) * distance + (Math.random() * 50);

            gsap.set(petal, {
                x: e.clientX,
                y: e.clientY,
                scale: 0.3 + Math.random() * 0.7,
                rotation: Math.random() * 360
            });

            gsap.to(petal, {
                x: destX,
                y: destY,
                opacity: 0,
                rotation: "+=" + (90 + Math.random() * 180),
                scale: 0.1,
                duration: 1.5 + Math.random(),
                ease: "power1.out",
                onComplete: () => petal.remove()
            });
        }
    });
}
