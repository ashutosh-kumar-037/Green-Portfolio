function initApp() {
    SVGLoader.init();
    initScene();
    initLights();
    initFireflies();

    // UI components that don't depend on title SVGs
    initMobileMenu();
    initScrollLogic();
    initCardEffects();
    initSkillsSystem();
    initEducation();
    initProjects();
    initContactForm();
    initLaptopBurst();

    if (window.lucide) {
        lucide.createIcons();
    }

    animate();
}

// Logic that depends on external SVGs (like hanging vines in nature.js)
document.addEventListener('svgsLoaded', () => {
    initVines();
    initFlowers();
});

document.addEventListener('DOMContentLoaded', initApp);

function initLaptopBurst() {
    const source = document.getElementById('laptop-burst-source');
    if (!source) return;

    const allIcons = [];
    Object.values(skillsData).forEach(cat => {
        cat.icons.forEach(icon => {
            if (!allIcons.includes(icon)) allIcons.push(icon);
        });
    });

    function createSingleIcon() {
        if (!document.getElementById('laptop-burst-source')) return;
        const colors = ['#4A7A28', '#81C784', '#FFD54F', '#4FC3F7', '#BA68C8', '#FF8A65', '#EF5350'];
        const iconName = allIcons[Math.floor(Math.random() * allIcons.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const burstEl = document.createElement('div');
        burstEl.className = 'skill-icon-burst';
        burstEl.style.color = color;
        burstEl.innerHTML = `<i data-lucide="${iconName}"></i>`;
        const rect = source.getBoundingClientRect();
        burstEl.style.left = `${rect.left + window.scrollX - 10}px`;
        burstEl.style.top = `${rect.top + window.scrollY}px`;
        burstEl.style.transform = 'translate(-50%, -50%)';
        burstEl.style.position = 'absolute';
        burstEl.style.zIndex = '20000';
        document.body.appendChild(burstEl);
        lucide.createIcons();
        const angle = (Math.random() - 0.5) * 1.5;
        const distance = 100 + Math.random() * 150;
        const destX = Math.sin(angle) * distance;
        const destY = -Math.abs(Math.cos(angle) * distance) - 80;
        gsap.set(burstEl, { scale: 0.1, opacity: 0, x: 0, y: 0, rotation: 0 });
        const tl = gsap.timeline({ onComplete: () => burstEl.remove() });
        tl.to(burstEl, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })
            .to(burstEl, { x: destX, y: destY, scale: 1.8, rotation: (Math.random() - 0.5) * 90, duration: 2, ease: "power1.out" }, 0)
            .to(burstEl, { opacity: 0, scale: 2.2, duration: 1, ease: "power2.in" }, "-=1");
        setTimeout(createSingleIcon, 500 + Math.random() * 800);
    }
    createSingleIcon();
    setTimeout(createSingleIcon, 400);
}