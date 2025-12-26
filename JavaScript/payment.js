document.addEventListener("DOMContentLoaded", function () {
    // Get the total amount from the URL parameter (this is the FINAL total, including delivery charge)
    const urlParams = new URLSearchParams(window.location.search);
    let total = urlParams.get("total");

    // Check if totalAmount is present and not empty
    if (!total || total.trim() === "") {
        console.warn("No total amount via URL, checking localStorage if user navigated manually");
        // Optional: you could redirect, but for dev robustness we'll allow it or check cart
    }

    // Parse the totalAmount and validate
    total = parseFloat(total);
    if (isNaN(total) || total <= 0) {
        // Fallback or default
        total = 0;
    }

    // Update the Order Summary section
    const deliveryCharge = 350; // Updated to match new Order Page
    const subtotal = total > 0 ? total - deliveryCharge : 0;

    // Update the DOM elements with error handling
    const subtotalElement = document.getElementById("subtotal");
    const totalAmountElement = document.getElementById("total-amount");

    if (subtotalElement) subtotalElement.textContent = `Rs ${subtotal.toFixed(2)}`;
    if (totalAmountElement) totalAmountElement.textContent = `Rs ${total.toFixed(2)}`;

    function displayError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const fieldElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = message;
        if (fieldElement) fieldElement.classList.add("input-invalid");
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.textContent = "");
        document.querySelectorAll("input").forEach(el => el.classList.remove("input-invalid"));
    }

    document.getElementById("card-payment-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;
        clearErrors();

        const cardNumber = document.getElementById("card-number").value.replace(/\s/g, '');
        const cardName = document.getElementById("card-name").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Basic Validation
        if (!/^\d{16}$/.test(cardNumber)) {
            displayError("card-number", "Card Number must be 16 digits.");
            isValid = false;
        }

        if (cardName.length < 3) {
            displayError("card-name", "Name required.");
            isValid = false;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            displayError("expiry-date", "Format MM/YY required.");
            isValid = false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            displayError("cvv", "Invalid CVV.");
            isValid = false;
        }

        if (!isValid) return;

        // Success
        alert("Payment Successful! Your order has been placed.");
        localStorage.removeItem('urbanBitesCart'); // Clear cart
        window.location.href = 'index.html';
    });
});