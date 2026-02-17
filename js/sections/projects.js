const projectsData = [
    {
        title: "Sudoku Solver",
        description: "An advanced algorithmic solver designed to tackle complex 9x9 Sudoku puzzles. It implements an optimized backtracking engine with intelligent pruning to achieve near-instantaneous solutions.",
        icon: "grid-3x3",
        image: "assets/images/projects/sudoku_solver.png",
        tech: ["Python", "Recursion", "Algorithms"],
        github: "https://github.com/ashutosh-kumar-037/sudoku",
        live: "https://sudoku9.netlify.app/"
    },
    {
        title: "AI Agent",
        description: "A sophisticated autonomous agent powered by LLMs. Capable of reasoning through complex requests, orchestrating multi-step workflows, and integrating with external data sources for dynamic problem-solving.",
        icon: "bot",
        image: "assets/images/projects/ai_agent.png",
        tech: ["OpenAI", "LangChain", "Node.js"],
        github: "#",
        live: "#"
    },
    {
        title: "Car Rental System",
        description: "A full-stack reservation management platform. Features include a dynamic inventory system, secure payment integration, user dashboard, and automated scheduling for vehicle maintenance and availability.",
        icon: "car-front",
        image: "assets/images/projects/car_rental.png",
        tech: ["React", "PostgreSQL", "Express"],
        github: "#",
        live: "#"
    },
    {
        title: "Green Portfolio",
        description: "A high-performance personal portfolio featuring procedural 3D vines and leaf systems. Built with a focus on creative coding, smooth GSAP transitions, and a premium \"Nature-in-Code\" aesthetic.",
        icon: "layout-template",
        image: "assets/images/projects/green_portfolio.png",
        tech: ["Three.js", "GSAP", "Tailwind"],
        github: "#",
        live: "#"
    }
];

function initProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    let html = '';
    projectsData.forEach(project => {
        html += `
            <div class="project-card-container">
                <div class="project-card-inner">
                    <!-- Front Face -->
                    <div class="project-card-front">
                        <div class="project-image-wrapper">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-image-overlay"></div>
                        </div>
                        <div class="project-title-front">
                            <h3>${project.title}</h3>
                            <div class="accent-line"></div>
                        </div>
                    </div>
                    
                    <!-- Back Face -->
                    <div class="project-card-back glass-card">
                        <div class="flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <div class="p-3 rounded-xl bg-accent/10 border border-accent/20">
                                    <i data-lucide="${project.icon}" class="w-8 h-8 text-accent"></i>
                                </div>
                                <div class="project-actions">
                                    <a href="${project.github}" class="btn-icon" target="_blank" title="View Source Code">
                                        <i data-lucide="github" class="w-5 h-5"></i>
                                    </a>
                                    <a href="${project.live}" class="btn-icon" target="_blank" title="Live Demo">
                                        <i data-lucide="external-link" class="w-5 h-5"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <h3 class="accent text-2xl font-extrabold mb-4">${project.title}</h3>
                            <p class="project-desc">
                                ${project.description}
                            </p>
                            
                            <div class="tech-tags mt-auto pt-6 border-t border-glass-border">
                                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Handle card flip on mobile/tablet (click instead of hover)
    const cards = container.querySelectorAll('.project-card-container');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the click was on a link or inside project-actions, don't flip
            if (e.target.closest('.project-actions') || e.target.closest('a')) {
                return;
            }

            card.classList.toggle('is-flipped');
        });
    });

    if (window.lucide) {
        lucide.createIcons();
    }
}
