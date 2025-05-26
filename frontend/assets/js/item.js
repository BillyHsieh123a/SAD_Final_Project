// Get query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = urlParams.get('price');
const productImg = urlParams.get('img');
const productClothID = urlParams.get('cloth_id');
const productInitColor = urlParams.get('color');

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

document.addEventListener('DOMContentLoaded', () => {
    getClothesColorsAndDescription().then(() => {
        // Now colors loaded, you can run favorite status check and setup
        setupFavoriteToggle();
    });
});

function setupFavoriteToggle() {
    const favoriteButton = document.getElementById("add-to-favorite");

    async function initFavorite() {
        const selectedColor = getSelectedColor();
        if (!selectedColor) {
            toggleFavoriteIcon(false);
            return;
        }
        const isFav = await checkFavoriteStatus(productClothID, selectedColor);
        toggleFavoriteIcon(isFav);
    }

    initFavorite();

    favoriteButton.addEventListener('click', () => {
        const selectedColor = getSelectedColor();
        if (!selectedColor) {
            alert("Please select a color first!");
            return;
        }
        handleFavoriteToggle(productClothID, selectedColor);
    });

    // If user changes color selection, update favorite icon accordingly
    const colorSelect = document.getElementById("color");
    if (colorSelect) {
        colorSelect.addEventListener("change", initFavorite);
    }
}

document.getElementById("color").addEventListener("change", () => {
    const selectedColor = document.getElementById("color").value.toUpperCase();

    checkFavoriteStatus(productClothID, selectedColor)
        .then(isFavorite => {
            toggleFavoriteIcon(isFavorite);
        });
});

document.getElementById("add-to-favorite").addEventListener("click", function () {
    const selectedColor = document.getElementById("color").value.toUpperCase();

    checkFavoriteStatus(productClothID, selectedColor)
        .then(isFavorite => {
            if (isFavorite) {
                // Remove from favorite
                fetch(`/api/item/favorite`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clothes_id: productClothID,
                        color: selectedColor
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 1) {
                        console.log(`${productName} (${selectedColor}) has been removed from your favorites.`);
                        toggleFavoriteIcon(false);
                    } else {
                        console.log(data.message || "Failed to remove from favorites.");
                    }
                });
            } else {
                // Add to favorite
                fetch(`/api/item/favorite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clothes_id: productClothID,
                        color: selectedColor
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 0) {
                        console.log(`${productName} (${selectedColor}) has been added to your favorites.`);
                        toggleFavoriteIcon(true);
                    } else {
                        console.log(`Failed to add ${productName} (${selectedColor}) to favorites.`);
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error checking favorite status:", error);
            console.log("An error occurred while checking favorite status.");
        });
});

function addItemToBag() {
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("num").value;

    fetch(`/api/item/bag`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: get_user_id(),
            clothes_id: productClothID,
            color: color.toUpperCase(),
            size: size,
            quantity: quantity
        })
    })
    .then(response => {
        if (!response.ok) {
            console.log("Failed to add item to your bag. Please try again.");
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if(data.success === -2)  // insufficient stock
            alert(`${productName} (${color}, ${size}) has only ${data.quantity} stocks remaining. Sorry :(`);
        else if(data.success === -1)  // duplicate bag add
            alert(`You already added ${productName} (${color}, ${size}) into your bag!`);
        else if(data.success === 0)
            alert(`${productName} (${color}, ${size}) has been added to your bag!`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while adding the item to your bag.");
    });
}

function getSelectedColor() {
    const colorSelect = document.getElementById("color");
    if (!colorSelect) return null;
    const val = colorSelect.value;
    if (!val) return null;
    return val.toUpperCase();
}

function toggleFavoriteIcon(isFavorite) {
    const icon = document.getElementById("favorite-icon");
    if (!icon) return;
    if (isFavorite) {
        icon.classList.remove("far");
        icon.classList.add("fas");
    } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
    }
}

function checkFavoriteStatus(clothes_id, color) {
    return fetch(`/api/item/favorite?clothes_id=${clothes_id}&color=${color}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => data.isFavorite)
    .catch(error => {
        console.error("Error checking favorite status:", error);
        return false;
    });
}

function handleFavoriteToggle(clothes_id, color) {
    const icon = document.getElementById("favorite-icon");
    if (!icon) return;

    const isFavorite = icon.classList.contains("fas");

    if (isFavorite) {
        // remove from favorite
        fetch('/api/item/favorite', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: get_user_id(), clothes_id, color })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === 1) {
                toggleFavoriteIcon(false);
            } else {
                console.log("Failed to remove favorite");
            }
        })
        .catch(e => console.log("Error removing favorite"));
    } else {
        // add to favorite
        fetch('/api/item/favorite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: get_user_id(), clothes_id, color })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === 0) {
                toggleFavoriteIcon(true);
            } else if (data.success === -1) {
                alert("Already in favorites");
            } else {
                console.log("Failed to add favorite");
            }
        })
        .catch(e => console.log("Error adding favorite"));
    }
}

// Handle "Try On" button
document.getElementById("try-on").addEventListener("click", function () {
    const productImg = document.getElementById("product-img");
    // Redirect to the try-on page
    var tryOnLink = `try-on?`
    tryOnLink += `cloth_id=${productClothID}&`
    tryOnLink += `color=${colorSelect.value}&`
    tryOnLink += `img=${productImg.src}`
    window.location.href = tryOnLink;
});

// Get the Go Back button
const goBackButton = document.querySelector(".go-back-btn");

// Add an event listener to handle the click event
goBackButton.addEventListener("click", function () {
    // Navigate back to category
    window.location.href = "category";
});


// when page is loaded, fetch colors from db
var colorSelect = document.getElementById("color");
const colorvalColornameMap = {
    "B": "Blue", "G": "Green", "SM": "Smoke", "W": "White",
    "BL": "Black", "BR": "Brown", "TA": "Tan", "GR": "Gray",
    "R": "Red", "P": "Pink"
};

document.addEventListener('DOMContentLoaded', getClothesColorsAndDescription);
function getClothesColorsAndDescription() {
    return new Promise((resolve, reject) => {
        colorSelect.innerText = '';

        fetch(`/api/item/color`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clothes_id: productClothID
            })
        })
        .then(response => {
            if (!response.ok) {
                reject(new Error(`HTTP error! status: ${response.status}`));
                return;
            }
            return response.json();
        })
        .then(data => {
            const colors = data.colors;
            for (var i = 0; i < colors.length; i++) {
                var option = document.createElement("option");
                option.value = colors[i][0];
                option.text = colorvalColornameMap[colors[i][0]];
                if (colors[i][0] === productInitColor)  // initially selected color
                    option.selected = true;
                colorSelect.appendChild(option);
            }
            document.getElementById("product-description").innerText = data.descr;

            getClothesSizes();  // after getting colors, sizes needed to be fetched once

            resolve();  // signal that colors are loaded
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}


// when clothes color change, change image 
colorSelect.addEventListener("change", changeClothesImage);
function changeClothesImage(){
    fetch(`/api/item/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clothes_id: productClothID,
            color: colorSelect.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {;
        var productImg = document.getElementById("product-img");
        productImg.src = data["image_src"];
    })
    .catch(error => {
        console.error('Error:', error);
        console.log("An error occurred while loading clothes image.");
    });
}


var sizeSelect = document.getElementById("size");
colorSelect.addEventListener("change", getClothesSizes);
function getClothesSizes(){
    sizeSelect.innerText = '';

    fetch(`/api/item/size`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clothes_id: productClothID,
            color: colorSelect.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const sizes = data.sizes
        for(var i = 0; i < sizes.length; i++){
            var option = document.createElement("option");
            option.value = sizes[i];
            option.text = sizes[i];
            sizeSelect.appendChild(option);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}