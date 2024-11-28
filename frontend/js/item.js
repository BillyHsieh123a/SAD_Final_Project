// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = urlParams.get('price');
const productImg = urlParams.get('img');

// Update HTML elements with product details
document.getElementById("product-name").textContent = productName;
document.getElementById("product-price").textContent = productPrice;
document.getElementById("product-img").src = productImg;
document.getElementById("product-img").alt = productName;

// Get the image element
const productImgElement = document.getElementById("product-img");

// Adjust image dimensions
productImgElement.style.width = "400px";  // Set the width to 400px
productImgElement.style.height = "600px";  // Set the height to 600px
productImgElement.style.objectFit = "cover";  // Crop and fill the box

// Handle "Add to Bag" button
document.getElementById("add-to-bag").addEventListener("click", function () {
    alert(`${productName} has been added to your bag!`);
});

// Handle "Try On" button
document.getElementById("try-on").addEventListener("click", function () {
    alert(`You are trying on the ${productName}.`);
});

// Handle "Add to Favorite" button (heart icon)
document.getElementById("add-to-favorite").addEventListener("click", function () {
    this.classList.toggle("active");  // Toggle the heart icon (favorite or not)
    if (this.classList.contains("active")) {
        alert(`${productName} has been added to your favorites.`);
    } else {
        alert(`${productName} has been removed from your favorites.`);
    }
});

// Get the Go Back button
const goBackButton = document.querySelector(".nav-btn");

// Add an event listener to handle the click event
goBackButton.addEventListener("click", function () {
    // Navigate back to category.html
    window.location.href = "category.html";
});
