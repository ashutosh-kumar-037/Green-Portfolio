# 🌿 Green Portfolio: Nature In Code

A premium, high-performance personal portfolio featuring procedural 3D vines, leaf systems, and immersive animations. Built with a "Nature-in-Code" aesthetic, focusing on organic movement and clean modular architecture.

## ✨ Key Features

- **Procedural 3D Elements**: Interconnected vine systems and blooming flowers powered by **Three.js** and **GSAP**.
- **Modular Architecture**: Clean separation of concerns with dedicated files for each section's data and logic.
- **Dynamic Asset Loading**: External SVG injection system to keep `index.html` lightweight and manageable.
- **Glassmorphic UI**: Modern, premium design with vibrant colors, smooth gradients, and interactive cards.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile experiences.

## 📂 Project Structure

```text
Green-Portfolio/
├── index.html              # Main entrance (Semantic HTML5)
│
├── assets/                 # Media and static assets
│   ├── images/             # Avatars and project covers
│   ├── icons/              # Functional SVG icons (Lucide)
│   └── svg/                # Decorative vine SVGs for titles
│
├── css/                    # Modular Styling System
│   ├── base/               # Reset, Typography, and CSS Variables
│   ├── layout/             # Section spacing and container grids
│   ├── components/         # Glass cards, skill bars, and buttons
│   ├── effects/            # Animations, glows, and nature sways
│   └── main.css            # Central hub for importing all modules
│
├── js/                     # Modular Scripting Architecture
│   ├── core/               # App entry (main.js) and config
│   ├── three/              # 3D Scene, Lights, Render, and Fireflies
│   ├── nature/             # Vine growth, bloom logic, and wind effects
│   ├── sections/           # Section data & logic (Skills, Projects, Edu)
│   ├── ui/                 # Navbar, Scroll logic, and Card interactions
│   └── utils/              # SVG Loader and general helpers
│
└── README.md               # Project documentation
```

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **3D Engine**: Three.js
- **Animation**: GSAP (GreenSock Animation Platform)
- **Styling Framework**: Tailwind CSS (via CDN for rapid utility classes)
- **Icons**: Lucide Icons

## 🛠️ Modularity & Maintenance

This project is built for easy updates. If you want to change your details:

- **Skills**: Edit `js/sections/skills.js`
- **Projects**: Edit `js/sections/projects.js`
- **Education**: Edit `js/sections/education.js`
- **Contact Info**: Update the HTML links in `index.html`

## 🎨 Aesthetic Philosophy

The design blends organic nature with digital precision. Every animation—from the swaying vines in the hero section to the bursting skill icons—is synchronized to create a cohesive, living ecosystem.

---
Created with ❤️ by **Ashutosh Kumar**
