
/* =========================================
   1. PRELOADER
========================================= */

const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("hide");
    }, 900);
});


/* =========================================
   2. TYPING EFFECT
========================================= */

const typingText = document.getElementById("typingText");

const words = [
    "Student",
    "Web Developer",
    "Technology Enthusiast",
    "Data Analyst Learner",
    "Cyber Security Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    const speed = deleting ? 45 : 90;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================================
   3. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   4. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================================
   5. ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );

                });

            }

        });

    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================
   6. DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Aktifkan dark mode" : "Aktifkan light mode"
    );
}

// Load saved theme
const savedTheme = localStorage.getItem("noufal-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const currentTheme =
        document.body.classList.contains("light-mode")
            ? "light"
            : "dark";

    localStorage.setItem("noufal-theme", currentTheme);

    updateThemeIcon();

});


/* =========================================
   7. BACKGROUND MUSIC
========================================= */

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

music.volume = 0.25;

musicToggle.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

            musicToggle.classList.add("playing");
            musicToggle.textContent = "♫";

        } catch (error) {

            console.warn("Musik belum dapat diputar:", error);

            alert(
                "Musik belum dapat diputar. Pastikan file assets/music.mp3 tersedia."
            );

        }

    } else {

        music.pause();

        musicToggle.classList.remove("playing");
        musicToggle.textContent = "♪";

    }

});

music.addEventListener("ended", () => {
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♪";
});


/* =========================================
   8. ANIMATED PARTICLES BACKGROUND
========================================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};

function resizeCanvas() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createParticles();
}

function createParticles() {

    particles = [];

    const total = Math.min(
        65,
        Math.floor(window.innerWidth / 18)
    );

    for (let i = 0; i < total; i++) {

        particles.push({

            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,

            radius: Math.random() * 2 + 0.5,

            speedX: (Math.random() - 0.5) * 0.45,
            speedY: (Math.random() - 0.5) * 0.45

        });

    }

}

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    const lightMode =
        document.body.classList.contains("light-mode");

    const particleColor = lightMode
        ? "100, 80, 180"
        : "167, 139, 250";

    particles.forEach((particle, index) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(${particleColor}, 0.65)`;

        ctx.fill();

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {

            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) {

                ctx.beginPath();

                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(${particleColor}, ${0.12 * (1 - distance / 115)})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();

            }

        }

    });

    requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawParticles();


/* =========================================
   9. PROJECT DETAILS MODAL
========================================= */

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

const projectData = {

    personal: {
        title: "Personal Website",
        description:
            "Proyek website personal yang dibuat menggunakan HTML, CSS, dan JavaScript. Website ini digunakan untuk memperkenalkan profil, kemampuan, pendidikan, dan proyek pribadi."
    },

    student: {
        title: "Student Data System",
        description:
            "Konsep proyek aplikasi pengelolaan data siswa. Sistem ini direncanakan memiliki fitur input data, pengelolaan informasi, dan penyajian data."
    },

    cyber: {
        title: "Cyber Security Study",
        description:
            "Proyek dokumentasi pembelajaran mengenai keamanan informasi, perlindungan data, keamanan akun, dan pemahaman dasar keamanan digital."
    }

};

document.querySelectorAll(".project-button").forEach(button => {

    button.addEventListener("click", () => {

        const project = projectData[button.dataset.project];

        if (!project) return;

        modalTitle.textContent = project.title;

        modalDescription.textContent = project.description;

        projectModal.classList.add("show");

        projectModal.setAttribute("aria-hidden", "false");

    });

});

function closeModal() {

    projectModal.classList.remove("show");

    projectModal.setAttribute("aria-hidden", "true");

}

modalClose.addEventListener("click", closeModal);

projectModal.addEventListener("click", event => {

    if (event.target === projectModal) {
        closeModal();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================
   10. CURRENT YEAR
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   11. NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.12)";

    } else {

        navbar.style.boxShadow = "none";

    }

});
