let mainVineMesh;
const mainVinePoints = [];

// Create points for the main vertical vine path
for (let i = 0; i < 50; i++) {
    mainVinePoints.push(new THREE.Vector3(
        Math.sin(i * 0.5) * 2,
        -i * 1.5 + 5,
        Math.cos(i * 0.5) * 1
    ));
}

const mainVineCurve = new THREE.CatmullRomCurve3(mainVinePoints);

function initVines() {
    const geometry = new THREE.TubeGeometry(mainVineCurve, 100, 0.05, 8, false);
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a3c1a,
        roughness: 0.8,
        emissive: 0x0a220a
    });
    mainVineMesh = new THREE.Mesh(geometry, material);
    scene.add(mainVineMesh);
    mainVineMesh.geometry.setDrawRange(0, 0);

    // Initial Laptop Skill Burst
    initLaptopBurst();

    // Synchronize Hero Image and Hanging Vines Sway
    initHeroSyncSway();
}

function initHeroSyncSway() {
    const avatar = document.querySelector('.hero-img');
    const vineLeft = document.getElementById('hanging-vine-left');
    const vineRight = document.getElementById('hanging-vine-right');

    if (!avatar || !vineLeft || !vineRight) return;

    // Kill any existing sways to avoid conflicts on resize
    gsap.killTweensOf([avatar, vineLeft, vineRight]);

    const isMobile = window.innerWidth < 1024;

    // Set initial positions and paths based on screen size
    if (isMobile) {
        // Mobile: Avatar is static and vines are hidden via CSS
        gsap.set(avatar, { x: 0 });
    } else {
        // Desktop: Connect from title to avatar
        gsap.set(avatar, { x: -25 });
        gsap.set(vineLeft, { attr: { d: "M650,50 Q625,300 630,340" } });
        gsap.set(vineRight, { attr: { d: "M830,70 Q805,350 800,340" } });

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(avatar, { x: 25, duration: 4, ease: "power1.inOut" }, 0);
        tl.to(vineLeft, { attr: { d: "M650,50 Q675,300 680,340" }, duration: 4, ease: "power1.inOut" }, 0);
        tl.to(vineRight, { attr: { d: "M830,70 Q850,350 850,340" }, duration: 4, ease: "power1.inOut" }, 0);
    }
}

// Add listener to handle screen orientation/size changes
window.addEventListener('resize', () => {
    // Debounce or just call directly for responsiveness
    initHeroSyncSway();
});


