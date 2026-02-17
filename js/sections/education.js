const educationData = [
    {
        title: "MCA (Master of Computer Applications)",
        period: "2024-2026",
        institution: "Graphic Era University, Dehradun, Uttarakhand",
        status: "Currently Pursuing...",
        icon: "open-book.svg"
    },
    {
        title: "BCA (Bachelor of Computer Applications)",
        period: "2021-2024",
        institution: "Patliputra University, Patna, Bihar",
        score: "Percentage: 71.2%",
        icon: "graduation-cap.svg"
    },
    {
        title: "Intermediate (12th)",
        period: "2018-2020",
        institution: "Magadh University, Bodh Gaya, Bihar",
        score: "Percentage: 64.6%",
        icon: "close-book.svg"
    },
    {
        title: "Matriculation (10th)",
        period: "2017-2018",
        institution: "Magadh University, Bodh Gaya, Bihar",
        score: "Percentage: 64.6%",
        icon: "pencil.svg"
    }
];

function initEducation() {
    const container = document.getElementById('education-list');
    if (!container) return;

    let html = '';
    educationData.forEach((item, index) => {
        const isLast = index === educationData.length - 1;

        // Handle score formatting if present
        let scoreHTML = '';
        if (item.score) {
            const parts = item.score.split(': ');
            if (parts.length === 2) {
                scoreHTML = `<p class="text-accent font-semibold">${parts[0]}: <span class="text-text opacity-70 font-normal">${parts[1]}</span></p>`;
            } else {
                scoreHTML = `<p class="text-accent font-semibold">${item.score}</p>`;
            }
        }

        html += `
            <div class="edu-item ${isLast ? 'border-l-0' : 'border-l-4 border-accent/60'} ml-4 pl-8 md:pl-12 relative ${isLast ? '' : 'pb-8'}">
                <div class="absolute flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent 
                    ${isLast ? '-left-[14px] md:-left-[18px]' : '-left-[18px] md:-left-[22px]'} top-0 z-10 edu-icon-pulse">
                    <img src="assets/icons/${item.icon}" class="w-5 h-5 md:w-6 md:h-6 invert opacity-80" alt="${item.title}">
                </div>
                <div class="flex flex-col md:flex-row md:justify-between md:items-start w-full gap-1 md:gap-4">
                    <h3 class="accent text-lg md:text-xl font-bold italic leading-tight">${item.title}</h3>
                    <span class="text-text opacity-60 text-xs md:text-sm font-semibold whitespace-nowrap">${item.period}</span>
                </div>
                <p class="text-text opacity-80 text-sm md:text-base mt-2 md:mt-0">${item.institution}</p>
                ${item.status ? `<p class="text-text opacity-70 font-semibold mt-1">${item.status}</p>` : ''}
                ${scoreHTML ? `<div class="mt-1">${scoreHTML}</div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}
