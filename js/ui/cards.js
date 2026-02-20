function initCardEffects() {
    // Individual Card Tilt on Hover
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Skip tilt effect for profile modal card to avoid animation conflicts
            if (card.closest('#profile-card-modal')) return;

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

    // Water Splash Click Effect
    document.addEventListener('mousedown', (e) => {
        // 1. Create Ripple
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        document.body.appendChild(ripple);

        gsap.set(ripple, {
            left: e.clientX,
            top: e.clientY,
            width: 0,
            height: 0,
            opacity: 1
        });

        gsap.to(ripple, {
            width: 200,
            height: 200,
            opacity: 0,
            duration: 0.8,
            ease: "power1.out",
            onComplete: () => ripple.remove()
        });

        // 2. Create Splash Droplets
        const dropletCount = 8;
        for (let i = 0; i < dropletCount; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'water-splash';
            document.body.appendChild(droplet);

            const size = 6 + Math.random() * 12;
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 80;
            const destX = e.clientX + Math.cos(angle) * distance;
            const destY = e.clientY + Math.sin(angle) * distance;

            gsap.set(droplet, {
                left: e.clientX,
                top: e.clientY,
                width: size,
                height: size,
                opacity: 1
            });

            gsap.to(droplet, {
                left: destX,
                top: destY,
                width: 0,
                height: 0,
                opacity: 0,
                duration: 0.5 + Math.random() * 0.3,
                ease: "power2.out",
                onComplete: () => droplet.remove()
            });
        }
    });
}
