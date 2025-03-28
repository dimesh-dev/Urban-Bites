document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const viewCartBtn = document.getElementById("view-cart-btn");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const proceedToPaymentBtn = document.getElementById("proceed-to-payment");
    const totalDisplay = document.querySelector(".total");

    const DELIVERY_CHARGE = 200; // Constant for delivery charge

    // Function to update the cart
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        // Display each cart item
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>RS.${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Display delivery fee as a separate line
        const deliveryFeeItem = document.createElement("div");
        deliveryFeeItem.className = "cart-item delivery-fee";
        deliveryFeeItem.innerHTML = `
            <span>Delivery Fee</span>
            <span>RS.${DELIVERY_CHARGE.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(deliveryFeeItem);

        // Calculate and display subtotal and final total
        const total = subtotal + DELIVERY_CHARGE;
        cartTotal.innerHTML = `
            Subtotal: RS.${subtotal.toFixed(2)}<br>
            Delivery Fee: RS.${DELIVERY_CHARGE.toFixed(2)}<br>
            Total: RS.${total.toFixed(2)}
        `;
        if (totalDisplay) totalDisplay.textContent = `Total: RS.${total.toFixed(2)}`;
    }

    // Function to add item to cart
    function addToCart(name, price, quantity) {
        const existingItem = cart.find((item) => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    }

    // Function to remove item from cart
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Event listeners for checkboxes and quantity inputs
    document.querySelectorAll(".menu-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const menuItem = this.closest(".menu-item");
            const name = menuItem.querySelector("label").textContent;
            const price = parseFloat(this.dataset.price);
            const quantity = parseInt(menuItem.querySelector(".quantity").value);

            if (this.checked) {
                addToCart(name, price, quantity);
            } else {
                const itemIndex = cart.findIndex((item) => item.name === name);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    updateCart();
                }
            }
        });
    });

    // Event listener for quantity changes
    document.querySelectorAll(".quantity").forEach((input) => {
        input.addEventListener("change", function () {
            const menuItem = this.closest(".menu-item");
            const checkbox = menuItem.querySelector(".menu-checkbox");
            if (checkbox.checked) {
                const name = menuItem.querySelector("label").textContent;
                const price = parseFloat(checkbox.dataset.price);
                const quantity = parseInt(this.value);

                const itemIndex = cart.findIndex((item) => item.name === name);
                if (itemIndex !== -1) {
                    cart[itemIndex].quantity = quantity;
                    updateCart();
                }
            }
        });
    });

    // Open modal when "View Cart" is clicked
    viewCartBtn.addEventListener("click", function () {
        cartModal.style.display = "block";
    });

    // Close modal when "x" is clicked
    closeModal.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Close modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // Manual form validation function (only check required fields)
    function validateOrderForm() {
        let isValid = true;
        let errorMessage = "";

        // Get form fields
        const nameField = document.getElementById("names");
        const addressField = document.getElementById("address");
        const phoneField = document.getElementById("phone");
        const emailField = document.getElementById("email");

        // Check if fields exist
        if (!nameField || !addressField || !phoneField || !emailField) {
            console.error("One or more form fields not found in the DOM");
            alert("Error: Form fields are missing. Please check the page structure.");
            return false;
        }

        const name = nameField.value.trim();
        const address = addressField.value.trim();
        const phone = phoneField.value.trim();
        const email = emailField.value.trim();

        // Validate name (required)
        if (!name) {
            errorMessage += "Name is required.\n";
            isValid = false;
        }

        // Validate address (required)
        if (!address) {
            errorMessage += "Address is required.\n";
            isValid = false;
        }

        // Validate phone (required)
        if (!phone) {
            errorMessage += "Phone number is required.\n";
            isValid = false;
        }

        // Validate email (required)
        if (!email) {
            errorMessage += "Email is required.\n";
            isValid = false;
        }

        // If validation fails, show the error message
        if (!isValid) {
            alert(errorMessage);
        }

        return isValid;
    }

    // Proceed to payment (with form validation)
    proceedToPaymentBtn.addEventListener("click", function () {
        // Validate the order form before proceeding
        if (!validateOrderForm()) {
            return; // Stop if form validation fails
        }

        // Proceed with payment logic if form is valid
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value;
        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        const rawTotal = cartTotal.textContent.split("Total: RS.")[1]?.trim();
        const totalAmount = parseFloat(rawTotal);

        if (isNaN(totalAmount) || totalAmount <= 0) {
            alert("Invalid total amount. Please check your cart.");
            return;
        }

        if (selectedPayment === 'card') {
            window.location.href = `payment.html?total=${totalAmount.toFixed(2)}`;
        } else if (selectedPayment === 'cod') {
            alert(`Order placed successfully! Total: RS.${totalAmount.toFixed(2)} will be collected on delivery.`);
            cartModal.style.display = "none";
            cart.length = 0;
            updateCart();
            window.location.href = 'homepage.html';
        }
    });

    // Update total with delivery charge
    function updateTotal() {
        let subtotal = 0;
        document.querySelectorAll(".menu-item").forEach(item => {
            let checkbox = item.querySelector(".menu-checkbox");
            let quantity = item.querySelector(".quantity");
            let subtotalElem = item.querySelector(".subtotal");

            if (checkbox.checked) {
                let price = parseFloat(checkbox.getAttribute("data-price"));
                let itemSubtotal = price * parseInt(quantity.value);
                subtotalElem.innerText = `RS.${itemSubtotal.toFixed(2)}`;
                subtotal += itemSubtotal;
            } else {
                subtotalElem.innerText = "RS.0.00";
            }
        });
        const total = subtotal + DELIVERY_CHARGE;
        if (cartTotal) cartTotal.innerHTML = `
            Subtotal: RS.${subtotal.toFixed(2)}<br>
            Delivery Fee: RS.${DELIVERY_CHARGE.toFixed(2)}<br>
            Total: RS.${total.toFixed(2)}
        `;
        if (totalDisplay) totalDisplay.textContent = `Total: RS.${total.toFixed(2)}`;
    }

    document.querySelectorAll(".menu-checkbox, .quantity").forEach(elem => {
        elem.addEventListener("change", updateTotal);
    });

    updateTotal();
});

// Terms Popup
function openTermsPopup() {
    document.getElementById("termsPopup").style.display = "block";
}

function closeTermsPopup() {
    document.getElementById("termsPopup").style.display = "none";
}

// Privacy Popup
function openPrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "block";
}

function closePrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "none";
}

// Close popups when clicking outside
window.onclick = function (event) {
    var termsPopup = document.getElementById("termsPopup");
    var privacyPopup = document.getElementById("privacyPopup");
    if (event.target == termsPopup) {
        termsPopup.style.display = "none";
    }
    if (event.target == privacyPopup) {
        privacyPopup.style.display = "none";
    }
};
