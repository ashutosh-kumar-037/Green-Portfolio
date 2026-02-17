const skillsData = {
    frontend: {
        labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap'],
        values: [90, 85, 80, 75, 88, 70],
        icons: ['file-code', 'palette', 'braces', 'atom', 'wind', 'layout']
    },
    backend: {
        labels: ['Node.js', 'Python', 'FastAPI', 'Express', 'Auth', 'APIs'],
        values: [85, 80, 75, 82, 78, 88],
        icons: ['server', 'terminal', 'zap', 'cpu', 'lock', 'share-2']
    },
    languages: {
        labels: ['JavaScript', 'Python', 'C++', 'Java', 'SQL', 'TypeScript'],
        values: [92, 88, 70, 75, 85, 82],
        icons: ['code-2', 'terminal', 'file-code', 'coffee', 'database', 'shield-check']
    },
    databases: {
        labels: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase', 'SQLite'],
        values: [88, 82, 75, 80, 78, 70],
        icons: ['database', 'layers', 'zap', 'hard-drive', 'flame', 'file-box']
    }
};

let skillsChart;

function getCategoryIcon(cat) {
    const icons = { frontend: 'layout', backend: 'server', languages: 'code-2', databases: 'database' };
    return icons[cat];
}

function initSkillsSystem() {
    const tabs = document.querySelectorAll('.skill-tab');
    if (!tabs.length) return;

    updateSkillsUI('frontend');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active', 'border-accent/30', 'text-accent');
                t.classList.add('border-glass-border', 'text-text');
            });
            tab.classList.remove('border-glass-border', 'text-text');
            tab.classList.add('active', 'border-accent/30', 'text-accent');
            updateSkillsUI(tab.dataset.category);
        });
    });

    ScrollTrigger.create({
        trigger: "#skills",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
            const activeTab = document.querySelector('.skill-tab.active');
            if (activeTab) updateSkillsUI(activeTab.dataset.category);
        },
        onEnterBack: () => {
            const activeTab = document.querySelector('.skill-tab.active');
            if (activeTab) updateSkillsUI(activeTab.dataset.category);
        }
    });
}

function updateSkillsUI(category) {
    const data = skillsData[category];
    const container = document.getElementById('skills-container');
    if (!container) return;

    gsap.to(container, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
            let html = `<h3 class="text-accent text-xl font-bold mb-6 capitalize flex items-center gap-2">
                            <i data-lucide="${getCategoryIcon(category)}"></i> ${category} Skills
                        </h3>`;

            data.labels.forEach((label, i) => {
                html += `
                    <div class="skill-item-new group">
                        <div class="flex justify-between items-center mb-2">
                            <span class="flex items-center gap-2 font-semibold">
                                <i data-lucide="${data.icons[i]}" class="w-4 h-4 text-accent transition-transform group-hover:scale-110"></i> ${label}
                            </span>
                            <span class="text-xs text-accent font-bold count-up" data-value="${data.values[i]}">0%</span>
                        </div>
                        <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                            <div class="skill-progress-bar h-full rounded-full transition-all duration-1000 ease-out" style="width: 0%" data-value="${data.values[i]}"></div>
                        </div>
                    </div>`;
            });

            container.innerHTML = html;
            lucide.createIcons();

            container.querySelectorAll('.skill-item-new').forEach((item, i) => {
                const bar = item.querySelector('.skill-progress-bar');
                const pctText = item.querySelector('.count-up');
                const target = data.values[i];
                setTimeout(() => { bar.style.width = target + '%'; }, 100);
                let countObj = { val: 0 };
                gsap.to(countObj, {
                    val: target,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => { pctText.innerText = Math.floor(countObj.val) + '%'; }
                });
            });

            gsap.to(container, { opacity: 1, y: 0, duration: 0.4 });
        }
    });

    updateRadarChart(data);
}

function updateRadarChart(data) {
    const canvas = document.getElementById('skillsRadarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 150);
    gradient.addColorStop(0, 'rgba(124, 179, 66, 0.8)');
    gradient.addColorStop(1, 'rgba(56, 142, 60, 0.9)');

    if (skillsChart) {
        skillsChart.data.datasets[0].data = data.values.map(() => 0);
        skillsChart.update('none');
        skillsChart.data.labels = data.labels;
        skillsChart.data.datasets[0].data = data.values;
        skillsChart.data.datasets[0].backgroundColor = gradient;
        skillsChart.update();
    } else {
        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Proficiency',
                    data: data.values,
                    backgroundColor: gradient,
                    borderColor: '#558B2F',
                    borderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#558B2F',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: '#f0fff0',
                            font: { family: 'Outfit', size: window.innerWidth < 768 ? 12 : 15 }
                        },
                        ticks: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}
