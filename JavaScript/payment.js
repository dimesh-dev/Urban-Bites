document.addEventListener("DOMContentLoaded", function () {
    // Get the total amount from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const totalAmount = urlParams.get("total");

    // Update the Order Summary section
    if (totalAmount) {
        document.getElementById("subtotal").textContent = `Rs. ${totalAmount}`;
        const deliveryCharge = 200;
        const finalAmount = parseFloat(totalAmount) + deliveryCharge;
        document.getElementById("total-amount").textContent = `Rs. ${finalAmount}`;
        document.getElementById("delivery-charge").textContent = `Rs. ${deliveryCharge}`;
    } else {
        alert("No total amount found. Please return to the cart.");
        window.location.href = 'orderpage.html'; // Redirect back to order page if no total
    }

    // Handle the form submission and display a success message
    document.getElementById("card-payment-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
    // Payment Successful Alert 
        alert("Payment was successful and the order has been placed. Thank you for shopping with us!");
        
    // Redirect to homepage
        window.location.href = 'homepage.html';
    });
});