function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-nav');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (menu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
}

function initProfileModal() {
    const trigger = document.getElementById('profile-trigger');
    const modal = document.getElementById('profile-card-modal');
    const overlay = document.querySelector('.profile-modal-overlay');

    // Pre-set initial states for smoother first-time load
    gsap.set(modal, { visibility: 'hidden', opacity: 0 });
    gsap.set(overlay, { opacity: 0 });
    const content = modal.querySelector('.profile-card-content');
    gsap.set(content, { opacity: 0, scale: 0 });

    let isAnimating = false;

    const openModal = () => {
        if (isAnimating) return;
        isAnimating = true;

        const triggerRect = trigger.getBoundingClientRect();

        const triggerX = triggerRect.left + triggerRect.width / 2;
        const triggerY = triggerRect.top + triggerRect.height / 2;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = triggerX - centerX;
        const dy = triggerY - centerY;

        // Force reset any current animations
        gsap.killTweensOf([content, overlay, modal]);

        // Setup initial state
        gsap.set(modal, { visibility: 'visible', opacity: 1, pointerEvents: 'all' });
        gsap.set(overlay, { opacity: 0 });
        gsap.set(content, {
            x: dx,
            y: dy,
            scale: 0.2,
            opacity: 0,
            rotate: -8,
            filter: "blur(5px)",
            pointerEvents: 'none'
        });

        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                gsap.set(content, { pointerEvents: 'all' });
            }
        });

        tl.to(overlay, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        })
            .to(content, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
                filter: "blur(0px)",
                duration: 0.65,
                ease: "back.out(1.1)"
            }, "-=0.25");
    };

    const closeModal = () => {
        if (isAnimating) return;
        isAnimating = true;

        const triggerRect = trigger.getBoundingClientRect();

        const triggerX = triggerRect.left + triggerRect.width / 2;
        const triggerY = triggerRect.top + triggerRect.height / 2;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = triggerX - centerX;
        const dy = triggerY - centerY;

        gsap.killTweensOf([content, overlay, modal]);
        gsap.set(content, { pointerEvents: 'none' });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(modal, { visibility: 'hidden', pointerEvents: 'none' });
                document.body.style.overflow = '';
                isAnimating = false;
            }
        });

        tl.to(content, {
            x: dx,
            y: dy,
            scale: 0.2,
            opacity: 0,
            rotate: 10,
            duration: 0.4,
            ease: "power2.in"
        })
            .to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            }, "-=0.3")
            .to(modal, {
                opacity: 0,
                duration: 0.15
            }, "-=0.15");
    };

    trigger.addEventListener('click', openModal);
    overlay.addEventListener('click', closeModal);

    // Close modal when "Get In Touch" button is clicked
    const getInTouchBtn = modal.querySelector('.profile-btn-primary');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
