// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = urlParams.get('price');
const productImg = urlParams.get('img');
const productClothID = urlParams.get('clothes_id');
const productColor = urlParams.get('color');

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

// Handle "Add to Bag" button
document.getElementById("add-to-bag").addEventListener("click", function () {
    addItemToBag(productName, productPrice, productImg, productClothID, productColor);
});

// Handle "Add to Favorite" button
document.getElementById("add-to-favorite").addEventListener("click", function () {
    addItemToFavorite(productName, productPrice, productImg, productClothID, productColor);
});

// Function to handle adding item to the bag
async function addItemToBag(name, price, img, clothes_id, color) {
    try {
        // Prepare the data to be sent in the POST request
        const productData = {
            name: name,
            price: price,
            img: img,
            clothes_id: clothes_id,
            color: color
        };

        // Send a POST request to the server to add the item to the bag
        const response = await fetch(`${serverURL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        // Check if the response is successful
        if (response.ok) {
            alert(`${name} has been added to your bag!`);
        } else {
            alert("Failed to add item to your bag. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while adding the item to your bag.");
    }
}

// Function to handle adding item to the favorites
async function addItemToFavorite(name, price, img, clothes_id, color) {
    try {
        // Prepare the data to be sent in the POST request
        const productData = {
            name: name,
            price: price,
            img: img,
            clothes_id: clothes_id,
            color: color
        };

        // Send a POST request to the server to add the item to the favorites
        const response = await fetch(`${serverURL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        // Check if the response is successful
        if (response.ok) {
            alert(`${name} has been added to your favorites!`);
        } else {
            alert("Failed to add item to your favorites. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while adding the item to your favorites.");
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

