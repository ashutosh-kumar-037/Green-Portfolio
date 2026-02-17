/**
 * Utility to load external SVGs and inject them into the DOM
 */
const SVGLoader = {
    /**
     * Loads an SVG file and injects it into the target container
     * @param {string} url - Path to the SVG file
     * @param {string} targetSelector - CSS selector for the container
     * @returns {Promise<SVGElement>}
     */
    async load(url, targetSelector) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load SVG: ${url}`);

            const svgText = await response.text();
            const container = document.querySelector(targetSelector);

            if (container) {
                container.innerHTML += svgText;
                return container.lastElementChild;
            }
        } catch (error) {
            console.error('SVGLoader Error:', error);
        }
    },

    /**
     * Initializes all dynamic SVGs based on data attributes or predefined mapping
     */
    init() {
        // Mapping of section titles to their respective SVG backgrounds
        const svgMapping = [
            { url: 'assets/svg/vine-hero.svg', target: '#home h1.title-vines-wrapper' },
            { url: 'assets/svg/vine-about.svg', target: '#about h2.title-vines-wrapper' },
            { url: 'assets/svg/vine-skills.svg', target: '#skills h2.title-vines-wrapper' },
            { url: 'assets/svg/vine-education.svg', target: '#education h2.title-vines-wrapper' },
            { url: 'assets/svg/vine-projects.svg', target: '#projects h2.title-vines-wrapper' },
            { url: 'assets/svg/vine-contact.svg', target: '#contact h2.title-vines-wrapper' }
        ];

        // Load all SVGs and trigger a custom event once finished
        const loads = svgMapping.map(item => this.load(item.url, item.target));

        Promise.all(loads).then(() => {
            // Dispatch event for other scripts (like GSAP or nature.js) to know SVGs are ready
            document.dispatchEvent(new CustomEvent('svgsLoaded'));
        });
    }
};

// Export to global scope for other modules
window.SVGLoader = SVGLoader;
