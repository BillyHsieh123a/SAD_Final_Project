// Selectors
const navButtons = document.querySelectorAll(".nav-btn");
const categoriesSection = document.getElementById("categories");
const itemGrid = document.getElementById("item-grid");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category");

const products = {
    woman: {
        tops: [
            { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" }
        ],
        bottoms: [
            { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" }
        ],
        outerwear: [
            { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" }
        ],
        dresses: [
            { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" }
        ]
    },
    man: {
        tops: [
            { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" }
        ],
        bottoms: [
            { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" }
        ],
        outerwear: [
            { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" }
        ],
        activewear: [
            { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" }
        ]
    }
};


// Store current selected gender and category
let selectedGender = null;
let selectedCategory = null;

// Function to toggle welcome picture visibility
function toggleWelcomePicture() {
    const welcomePicture = document.getElementById("welcome-picture");
    const itemGrid = document.getElementById("item-grid");

    if ((selectedGender || selectedCategory || searchInput.value.trim() !== "")) {
        welcomePicture.classList.add("hidden");
        itemGrid.classList.remove("hidden");
    } else {
        welcomePicture.classList.remove("hidden");
        itemGrid.classList.add("hidden");
    }
}

// Add event listener to gender buttons
navButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Existing logic for selecting gender
        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedGender = button.dataset.gender;

        // Show categories section
        categoriesSection.classList.remove("hidden");

        // Toggle welcome picture and display products
        toggleWelcomePicture();
        displayProducts();
    });
});

// Add event listener to category buttons
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Existing logic for selecting category
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedCategory = button.dataset.category;

        // Toggle welcome picture and display products
        toggleWelcomePicture();
        displayProducts();
    });
});

// Event listener for search input
searchInput.addEventListener("input", function () {
    // Re-display products with search filter applied
    toggleWelcomePicture();
    if (selectedGender) {
        displayProducts();
    }
});

function displayProducts() {
    itemGrid.innerHTML = ""; // Clear current products

    // If gender is selected
    if (selectedGender) {
        const genderProducts = products[selectedGender];

        // If category is selected, filter by category
        if (selectedCategory && genderProducts[selectedCategory]) {
            const filteredProducts = genderProducts[selectedCategory].filter(product => {
                const searchText = searchInput.value.toLowerCase();
                return product.name.toLowerCase().includes(searchText);
            });

            // Display filtered products
            filteredProducts.forEach(product => {
                const card = document.createElement("div");
                card.className = "item-card";
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" class="product-image" data-product-name="${product.name}" data-product-price="${product.price}" data-product-img="${product.img}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                `;
                itemGrid.appendChild(card);
            });

            // If no products match
            if (filteredProducts.length === 0) {
                itemGrid.innerHTML = "<p>No items available in this category.</p>";
            }
        } else {
            // Display all products for the selected gender
            let allProducts = [];
            for (const category in genderProducts) {
                allProducts = allProducts.concat(genderProducts[category]);
            }

            const filteredProducts = allProducts.filter(product => {
                const searchText = searchInput.value.toLowerCase();
                return product.name.toLowerCase().includes(searchText);
            });

            filteredProducts.forEach(product => {
                const card = document.createElement("div");
                card.className = "item-card";
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" class="product-image" data-product-name="${product.name}" data-product-price="${product.price}" data-product-img="${product.img}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                `;
                itemGrid.appendChild(card);
            });

            // If no products match
            if (filteredProducts.length === 0) {
                itemGrid.innerHTML = "<p>No products found matching your search.</p>";
            }
        }
    }

    // Add event listener to product images for redirection
    const productImages = document.querySelectorAll(".product-image");
    productImages.forEach(image => {
        image.addEventListener("click", function () {
            // Get product details from data attributes
            const productName = image.dataset.productName;
            const productPrice = image.dataset.productPrice;
            const productImg = image.dataset.productImg;

            // Redirect to item.html with product details (query parameters)
            window.location.href = `item.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(productPrice)}&img=${encodeURIComponent(productImg)}`;
        });
    });
}
