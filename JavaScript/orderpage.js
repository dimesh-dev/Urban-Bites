document.addEventListener("DOMContentLoaded", function () {
    // === Logic handles calculation ===
    const checkboxes = document.querySelectorAll('.menu-checkbox');
    const quantities = document.querySelectorAll('.quantity');
    const subtotalDisplay = document.getElementById('summary-subtotal');
    const totalDisplay = document.getElementById('summary-total');
    const deliveryFee = 200;

    function calculateTotal() {
        let subtotal = 0;
        checkboxes.forEach((box, index) => {
            if (box.checked) {
                const price = parseFloat(box.dataset.price);
                const qty = parseInt(quantities[index].value);
                subtotal += price * qty;
            }
        });

        subtotalDisplay.textContent = `Rs ${subtotal.toFixed(2)}`;
        totalDisplay.textContent = `Rs ${(subtotal + deliveryFee).toFixed(2)}`;
    }

    checkboxes.forEach(box => box.addEventListener('change', calculateTotal));
    quantities.forEach(qty => qty.addEventListener('input', calculateTotal));

    // Form Submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert("Thank you for your order! It has been secured.");
            // In a real app, send data to server here
        });
    }

    // === Visual Effects (Cursor & Reveal) ===

    // Custom Cursor
    const pCursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

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
        outlineX += (pCursor.x - outlineX) * 0.15;
        outlineY += (pCursor.y - outlineY) * 0.15;
        if (cursorOutline) {
            cursorOutline.style.top = outlineY + 'px';
            cursorOutline.style.left = outlineX + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover Scaling
    function attachCursorListeners() {
        if (!cursorOutline) return;
        const targets = document.querySelectorAll('.hover-target, a, button, input, select, textarea, label');
        targets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                if (cursorDot) cursorDot.style.opacity = '0';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                if (cursorDot) cursorDot.style.opacity = '1';
            });
        });
    }
    attachCursorListeners();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-text, .reveal-fade').forEach(el => observer.observe(el));
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
