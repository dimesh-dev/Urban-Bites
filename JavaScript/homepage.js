document.addEventListener("DOMContentLoaded", function () {
    // === 1. Preloader ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { preloader.classList.add('hide'); }, 2500);
    }

    // === 2. Custom Cursor ===
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    // Check pointer type but allow fallback
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    // Logic enabled for all, but optimized for mouse
    let pCursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', (e) => {
        pCursor.x = e.clientX;
        pCursor.y = e.clientY;

        if (cursorDot) {
            cursorDot.style.top = pCursor.y + 'px';
            cursorDot.style.left = pCursor.x + 'px';
        }
    });

    let outlineX = pCursor.x;
    let outlineY = pCursor.y;

    function animateCursor() {
        // INCREASED SPEED: 0.15 -> 0.5 for snappy response
        outlineX += (pCursor.x - outlineX) * 0.5;
        outlineY += (pCursor.y - outlineY) * 0.5;

        if (cursorOutline) {
            cursorOutline.style.top = outlineY + 'px';
            cursorOutline.style.left = outlineX + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const targets = document.querySelectorAll('.hover-target, a, button');
    targets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
            }
            if (cursorDot) cursorDot.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(255,255,255,0.5)';
            }
            if (cursorDot) cursorDot.style.opacity = '1';
        });
    });

    // === 3. Magnetic Button ===
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xMove = (x - rect.width / 2) * 0.3;
            const yMove = (y - rect.height / 2) * 0.3;
            btn.style.transform = `translate(${xMove}px, ${yMove}px)`;
            const span = btn.querySelector('span');
            if (span) span.style.transform = `translate(${xMove * 0.2}px, ${yMove * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            const span = btn.querySelector('span');
            if (span) span.style.transform = 'translate(0px, 0px)';
        });
    });

    // === 4. Scroll Reveal ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-text, .reveal-text-delay, .reveal-fade, .reveal-side-left, .reveal-side-right').forEach(el => observer.observe(el));

    // === 5. Header Scroll Effect ===
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === 6. Parallax Hero Background ===
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            heroBg.style.transform = `translateY(${scrollVal * 0.5}px)`;
        });
    }

    // === 7. Hamburger Menu ===
    window.toggleMobileMenu = function () {
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        nav.classList.toggle('nav-active');

        // Animate Links
        document.querySelectorAll('.nav-links li').forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    };
});

// Popups
function openTermsPopup() { document.getElementById("termsPopup").style.display = "block"; }
function closeTermsPopup() { document.getElementById("termsPopup").style.display = "none"; }
function openPrivacyPopup() { document.getElementById("privacyPopup").style.display = "block"; }
function closePrivacyPopup() { document.getElementById("privacyPopup").style.display = "none"; }

window.onclick = function (event) {
    if (event.target == document.getElementById("termsPopup")) closeTermsPopup();
    if (event.target == document.getElementById("privacyPopup")) closePrivacyPopup();
};