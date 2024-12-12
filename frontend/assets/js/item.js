// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = urlParams.get('price');
const productImg = urlParams.get('img');
const productClothID = urlParams.get('cloth_id');

// Update HTML elements with product details
document.getElementById("product-name").textContent = productName;
document.getElementById("product-price").textContent = productPrice;
document.getElementById("product-img").src = productImg;
document.getElementById("product-img").alt = productName;

// Get the image element
const productImgElement = document.getElementById("product-img");

// Adjust image dimensions
productImgElement.style.width = "500px";  // Set the width to 400px
productImgElement.style.height = "600px";  // Set the height to 600px
productImgElement.style.objectFit = "cover";  // Crop and fill the box

document.getElementById("add-to-bag").addEventListener("click", function () {
    // Get the selected color and size
    const selectedColor = document.getElementById("color").value;
    const selectedSize = document.getElementById("size").value;
    const selectedNum = document.getElementById("num").value;

    // Pass the selected options to the function
    addItemToBag(get_user_id(), productClothID, selectedColor, selectedSize, selectedNum);
});

document.getElementById("add-to-favorite").addEventListener("click", function () {
    // Get the selected color and size
    const selectedColor = document.getElementById("color").value;

    // Pass the selected options to the function
    addItemToFavorite(get_user_id(), productClothID, selectedColor);
});


async function addItemToBag(user_id, clothes_id, color, size, quantity) {
    try {
        const productData = {
            user_id: user_id,
            clothes_id: clothes_id,
            color: color[0].toUpperCase(),
            size: size,
            quantity: quantity
        };

        const response = await fetch(`${serverURL}/favorite_add_item_to_bag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            // alert(`${name} (${color}, ${size}) has been added to your bag!`);
        } else {
            alert("Failed to add item to your bag. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while adding the item to your bag.");
    }
}

// Handle "Try On" button
document.getElementById("try-on").addEventListener("click", function () {
    // Redirect to the try-on page
    window.location.href = "try-on";
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
const goBackButton = document.querySelector(".go-back-btn");

// Add an event listener to handle the click event
goBackButton.addEventListener("click", function () {
    // Navigate back to category
    window.location.href = "category";
});