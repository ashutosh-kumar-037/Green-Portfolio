function initScrollLogic() {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced Card Transitions (Entry/Exit with Blur)
    gsap.utils.toArray('.glass-card').forEach((card) => {
        gsap.set(card, {
            filter: "blur(15px)",
            opacity: 0,
            scale: 0.95,
            y: 30
        });

        ScrollTrigger.create({
            trigger: card,
            start: "top 92%",
            end: "bottom 8%",
            onEnter: () => gsap.to(card, {
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true
            }),
            onLeave: () => gsap.to(card, {
                filter: "blur(15px)",
                opacity: 0,
                scale: 0.95,
                y: -30,
                duration: 0.5,
                ease: "power2.in",
                overwrite: true
            }),
            onEnterBack: () => gsap.to(card, {
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true
            }),
            onLeaveBack: () => gsap.to(card, {
                filter: "blur(15px)",
                opacity: 0,
                scale: 0.95,
                y: 30,
                duration: 0.5,
                ease: "power2.in",
                overwrite: true
            })
        });
    });

    // Scroll Spy: Update Navbar Active State
    gsap.utils.toArray('.section').forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                if (self.isActive) {
                    const id = section.getAttribute('id');
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            }
        });
    });

    // Dedicated Scroll Indicator Fade Out
    gsap.to(".scroll-indicator", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "100px top",
            scrub: true,
        },
        opacity: 0,
        y: 50,
        pointerEvents: "none"
    });

    // Handle Scroll for 3D Growth
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        if (mainVineMesh) {
            const totalIndices = mainVineMesh.geometry.index.count;
            mainVineMesh.geometry.setDrawRange(0, Math.floor(scrollPercent * totalIndices));
        }

        camera.position.y = -scrollPercent * 60 + 5;

        flowerMeshes.forEach(f => {
            if (scrollPercent >= f.t) {
                gsap.to(f.mesh.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(2)" });
            } else {
                gsap.to(f.mesh.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
            }
        });
    });
}
