
// --- FLOATING WEB PARTICLES (Canvas) ---
const canvas = document.getElementById('web-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null, radius: (canvas.height / 80) * (canvas.width / 80) };

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse interaction (Web Pull)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = 'rgba(120, 120, 120, 0.3)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(120, 120, 120,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    initParticles();
});

initParticles();
animateParticles();


// --- MULTIVERSE GLITCH TOGGLE ---
const body = document.body;
function handleThemeToggle(event) {
    // Trigger Glitch
    body.classList.add('glitch-active');

    setTimeout(() => {
        toggleTheme();
        body.classList.remove('glitch-active');
    }, 300); // Wait for glitch to peak
}

function toggleTheme() {
    body.classList.toggle('peter-parker-theme');
    const isPeter = body.classList.contains('peter-parker-theme');
    localStorage.setItem('spidy-theme', isPeter ? 'peter-parker' : 'miles-morales');
    updateToggleUI(isPeter);
}

// Initialize UI based on saved preference
const savedTheme = localStorage.getItem('spidy-theme');
if (savedTheme === 'peter-parker') {
    body.classList.add('peter-parker-theme');
    updateToggleUI(true);
}

function updateToggleUI(isPeter) {
    const desktopText = document.querySelector('#suitToggle span');
    const desktopIcon = document.querySelector('#suitToggle i');

    if (isPeter) {
        if (desktopText) desktopText.innerText = "ACTIVATE MILES";
        if (desktopIcon) desktopIcon.className = "fas fa-moon";
    } else {
        if (desktopText) desktopText.innerText = "ACTIVATE PETER";
        if (desktopIcon) desktopIcon.className = "fas fa-sun";
    }
}

// --- TYPEWRITER EFFECT (NEW) ---
const phrases = [
    "Friendly Neighborhood Developer",
    "Learning by building real projects",
    "Turning Ideas Into Interfaces"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 40;
const pauseTime = 2000;
const typewriterElement = document.getElementById('typewriter');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    // Safety check for typewriter element
    if (!typewriterElement) return;

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeDelay = pauseTime; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeDelay = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typeDelay);
}

// --- INIT ANIMATIONS ---
window.addEventListener('load', () => {
    initSignalAnimation();
    typeEffect(); // Start typing
    animateOrigin(); // Initial call for Origin Animation
});

// --- PARALLAX EFFECT (Wrapped in DOMContentLoaded for safety) ---
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const heroContent = document.querySelector('.hero-content');
            const webBg = document.querySelector('.web-bg'); // Select the new ring bg

            // Calculate distance from center
            const x = (window.innerWidth - e.pageX * 2) / 100; // Small factor
            const y = (window.innerHeight - e.pageY * 2) / 100;

            // Apply slight shift
            if (heroContent) heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;

            // Background moves slower for depth
            if (webBg) {
                webBg.style.transform = `translateX(${x / 2}px) translateY(${y / 2}px)`;
            }
        });
    }
});

// --- SCROLL ANIMATIONS (Standard Reveal for other sections) ---
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// --- NEW STICKY SCROLL LOGIC ---
// This function calculates how far the user has scrolled WITHIN the #about section
// and maps that to the horizontal movement of the text/image.
function animateOrigin() {
    const section = document.querySelector('#about');
    const text = document.querySelector('.origin-text-box');
    const img = document.querySelector('.origin-image-container');

    if (!section) return;

    // UPDATED: Check for Mobile
    if (window.innerWidth <= 900) {
        // If on mobile, clear inline styles so CSS transitions take over
        if (text) { text.style.transform = ''; text.style.opacity = ''; }
        if (img) { img.style.transform = ''; img.style.opacity = ''; }
        return;
    }

    // Get section position relative to viewport
    const rect = section.getBoundingClientRect();

    // rect.top starts positive (below screen), becomes 0 (at top), then negative (scrolled past)
    // We want to know how far "into" the section we are.
    // Since the sticky container is at the top of the section, 
    // the animation happens while rect.top is negative.

    const distanceScrolled = -rect.top;
    const totalDistance = section.offsetHeight - window.innerHeight;

    if (totalDistance <= 0) return; // Safety check

    // Progress goes from 0 (start of sticky) to 1 (end of sticky section)
    let progress = distanceScrolled / totalDistance;

    // Clamp between 0 and 1
    progress = Math.min(Math.max(progress, 0), 1);

    // ANIMATION LOGIC:
    // At progress 0: Elements are far out (Offset = 800px)
    // At progress 1: Elements are at center (Offset = 0px)
    const maxOffset = 800;
    const currentOffset = maxOffset * (1 - progress);

    // Opacity Logic: Fade in quickly as they start moving
    const opacity = Math.min(progress * 3, 1);

    if (text) {
        text.style.transform = `translateX(${-currentOffset}px)`;
        text.style.opacity = opacity;
    }

    if (img) {
        img.style.transform = `translateX(${currentOffset}px)`;
        img.style.opacity = opacity;
    }
}

// Attach specialized scroll listener
window.addEventListener('scroll', animateOrigin);


// --- FORM HANDLING ---
function initSignalAnimation() {
    setInterval(() => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            if (Math.random() > 0.6) {
                bar.classList.toggle('active');
            }
        });
    }, 800);
}

function selectTopic(chip, topic) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const topicInput = document.getElementById('topicInput');
    if (topicInput) topicInput.value = topic;

    const msgArea = document.getElementById('messageArea');
    if (msgArea && (msgArea.value === "" || msgArea.value.startsWith("Subject:"))) {
        msgArea.value = `Subject: ${topic} - \n\nHi SpidyDev, I'd like to discuss...`;
    }
}

function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const text = textElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
        if (btn) {
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check" style="color: var(--primary-red)"></i>';
            btn.style.borderColor = 'var(--primary-red)';
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.borderColor = '';
            }, 2000);
        }
    });
}

// Safety check for contact form listener
// document.addEventListener('DOMContentLoaded', () => {
//     const contactForm = document.getElementById('contactForm');
//     if (contactForm) {
//         contactForm.addEventListener('submit', function (e) {
//             e.preventDefault();

//             // Simple Spidey-Sense Validation
//             const inputs = this.querySelectorAll('input, textarea');
//             let isValid = true;

//             inputs.forEach(input => {
//                 if (!input.value.trim()) {
//                     isValid = false;
//                     input.classList.add('danger');
//                     setTimeout(() => input.classList.remove('danger'), 500); // Remove shaking
//                 }
//             });

//             if (!isValid) return;

//             const btn = this.querySelector('button[type="submit"]');
//             const overlay = document.getElementById('successOverlay');
//             const originalText = btn.innerHTML;
//             btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thwip...';
//             btn.style.opacity = '0.8';

//             setTimeout(() => {
//                 if (overlay) overlay.classList.add('active');
//                 btn.innerHTML = originalText;
//                 btn.style.opacity = '1';
//             }, 1500);
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const sendBtn = document.getElementById("sendBtn");
    const afterBtns = document.getElementById("afterSendBtns");
    const resetBtn = document.getElementById("resetBtn");

    form.addEventListener("submit", async function(e){

        e.preventDefault();

        const formData = new FormData(form);

        try {

            await fetch("/contact/", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            });

            // Animate button swap
            sendBtn.style.opacity = "0";
            sendBtn.style.transform = "translateY(-10px)";

            setTimeout(() => {
                sendBtn.style.display = "none";
                afterBtns.classList.add("show");
            }, 300);

        } catch(err){
            console.error(err);
        }

    });

    resetBtn.addEventListener("click", () => {

        form.reset();

        afterBtns.classList.remove("show");

        setTimeout(() => {
            sendBtn.style.display = "block";
            sendBtn.style.opacity = "1";
            sendBtn.style.transform = "translateY(0)";
        }, 300);

    });

});

function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) form.reset();

    const overlay = document.getElementById('successOverlay');
    if (overlay) overlay.classList.remove('active');

    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
}

// Updated Reveal Logic to include origin elements on mobile
const mobileReveal = () => {
    if (window.innerWidth > 900) return; // Only run on mobile

    const originElements = document.querySelectorAll('.origin-text-box, .origin-image-container');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    originElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', mobileReveal);
mobileReveal(); // Initial check