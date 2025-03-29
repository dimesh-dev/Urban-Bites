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

    // Function to display error messages on the page
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const fieldElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
        }
        if (fieldElement) {
            fieldElement.classList.add("invalid");
        }
    }

    // Function to clear all error messages and invalid styles
    function clearErrors() {
        const errorElements = document.querySelectorAll(".error");
        const invalidElements = document.querySelectorAll(".invalid");
        errorElements.forEach(element => {
            element.textContent = "";
        });
        invalidElements.forEach(element => {
            element.classList.remove("invalid");
        });
    }

    // Handle the form submission and display a success message
    document.getElementById("card-payment-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission 

        // Validation: Check fields with specific rules
        let isValid = true;
        let errorMessage = ""; // For the alert

        // Clear previous errors
        clearErrors();

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

        // Validate Card Number 
        if (!cardNumber) {
            displayError("card-number", "Card Number is required.");
            errorMessage += "Card Number is required.\n";
            isValid = false;
        } else if (!/^\d{16}$|^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber)) {
            displayError("card-number", "Card Number must be 16 digits (e.g., 1234567890123456 or 1234-5678-9012-3456).");
            errorMessage += "Card Number must be 16 digits (e.g., 1234567890123456 or 1234-5678-9012-3456).\n";
            isValid = false;
        }

        // Validate Name on Card (required, at least 2 characters, only letters and spaces)
        if (!cardName) {
            displayError("card-name", "Name on Card is required.");
            errorMessage += "Name on Card is required.\n";
            isValid = false;
        } else if (cardName.length < 2) {
            displayError("card-name", "Name on Card must be at least 2 characters long.");
            errorMessage += "Name on Card must be at least 2 characters long.\n";
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(cardName)) {
            displayError("card-name", "Name on Card can only contain letters and spaces.");
            errorMessage += "Name on Card can only contain letters and spaces.\n";
            isValid = false;
        }

        // Validate Expiry Date (required, format MM/YY, not expired)
        if (!expiryDate) {
            displayError("expiry-date", "Expiry Date is required.");
            errorMessage += "Expiry Date is required.\n";
            isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            displayError("expiry-date", "Expiry Date must be in MM/YY format (e.g., 12/25).");
            errorMessage += "Expiry Date must be in MM/YY format (e.g., 12/25).\n";
            isValid = false;
        } else {
            // Check if the date is expired (current date: March 28, 2025)
            const [month, year] = expiryDate.split("/").map(Number);
            const expiry = new Date(2000 + year, month - 1, 1); // First day of the expiry month
            const currentDate = new Date(2025, 2, 28); // March 28, 2025
            if (expiry <= currentDate) {
                displayError("expiry-date", "Card has expired.");
                errorMessage += "Card has expired.\n";
                isValid = false;
            }
        }

        // Validate CVV (required, 3 digits)
        if (!cvv) {
            displayError("cvv", "CVV is required.");
            errorMessage += "CVV is required.\n";
            isValid = false;
        } else if (!/^\d{3}$/.test(cvv)) {
            displayError("cvv", "CVV must be a 3-digit number (e.g., 123).");
            errorMessage += "CVV must be a 3-digit number (e.g., 123).\n";
            isValid = false;
        }

        // If validation fails, show the alert with all errors and stop
        if (!isValid) {
            alert("Please correct the following errors:\n" + errorMessage);
            return;
        }

        // Payment Successful Alert 
        alert("Payment was successful and the order has been placed. Thank you for shopping with us!");
        
        // Redirect to homepage
        window.location.href = 'homepage.html';
    });
});