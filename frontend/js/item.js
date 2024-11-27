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

// Handle "Add to Bag" button
document.getElementById("add-to-bag").addEventListener("click", function () {
    alert(`${productName} has been added to your bag!`);
});

// Handle "Try On" button
document.getElementById("try-on").addEventListener("click", function () {
    alert(`You are trying on the ${productName}.`);
});

// Handle "Add to Favorite" button (heart icon)
document.getElementById("favorite-icon").addEventListener("click", function () {
    this.classList.toggle("active");  // Toggle the heart icon (favorite or not)
    if (this.classList.contains("active")) {
        alert(`${productName} has been added to your favorites.`);
    } else {
        alert(`${productName} has been removed from your favorites.`);
    }
});
