document.addEventListener("DOMContentLoaded", function () {
    // Get the total amount from the URL parameter (this is the FINAL total, including delivery charge)
    const urlParams = new URLSearchParams(window.location.search);
    let total = urlParams.get("total");

    // Log the raw totalAmount for debugging
    console.log("Raw totalAmount from URL:", total);

    // Check if totalAmount is present and not empty
    if (!total || total.trim() === "") {
        alert("No total amount found. Please return to the cart.");
        window.location.href = 'orderpage.html'; // Redirect back to order page if no total
        return;
    }

    // Parse the totalAmount and validate
    total = parseFloat(total);
    console.log("Parsed totalAmount:", total);

    if (isNaN(total) || total <= 0) {
        alert("Invalid total amount. Please return to the cart.");
        window.location.href = 'orderpage.html'; // Redirect if total is invalid
        return;
    }

    // Update the Order Summary section
    const deliveryCharge = 200; // Must match DELIVERY_CHARGE in orderpage.js
    const subtotal = total - deliveryCharge; // Calculate the subtotal by subtracting the delivery charge

    // Update the DOM elements with error handling
    const subtotalElement = document.getElementById("subtotal");
    const totalAmountElement = document.getElementById("total-amount");

    if (!subtotalElement || !totalAmountElement) {
        console.error("One or more order summary elements not found in the DOM:", {
            subtotalElement,
            totalAmountElement
        });
        alert("Error: Order summary elements are missing. Please check the page structure.");
        return;
    }

    subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
    totalAmountElement.textContent = `Rs. ${total.toFixed(2)}`;

    // Handle the form submission and display a success message
    document.getElementById("card-payment-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission (e.g., page reload)

        // Validation: Check if fields are non-empty
        let isValid = true;
        let errorMessage = "";

        // Get form fields
        const cardNumberField = document.getElementById("card-number");
        const cardNameField = document.getElementById("card-name");
        const expiryDateField = document.getElementById("expiry-date");
        const cvvField = document.getElementById("cvv");

        // Check if fields exist
        if (!cardNumberField || !cardNameField || !expiryDateField || !cvvField) {
            console.error("One or more form fields not found in the DOM");
            alert("Error: Form fields are missing. Please check the page structure.");
            return;
        }

        const cardNumber = cardNumberField.value.trim();
        const cardName = cardNameField.value.trim();
        const expiryDate = expiryDateField.value.trim();
        const cvv = cvvField.value.trim();

        // Validate each field (only check if non-empty)
        if (!cardNumber) {
            errorMessage += "Card Number is required.\n";
            isValid = false;
        }
        if (!cardName) {
            errorMessage += "Name on Card is required.\n";
            isValid = false;
        }
        if (!expiryDate) {
            errorMessage += "Expiry Date is required.\n";
            isValid = false;
        }
        if (!cvv) {
            errorMessage += "CVV is required.\n";
            isValid = false;
        }

        // If validation fails, show the error message and stop
        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Payment Successful Alert 
        alert("Payment was successful and the order has been placed. Thank you for shopping with us!");
        
        // Redirect to homepage
        window.location.href = 'homepage.html';
    });
});