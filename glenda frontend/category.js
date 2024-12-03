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
            { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" } // New product
        ],
        bottoms: [
            { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
            { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
            { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
            { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
            { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" } // New product
        ],
        outerwear: [
            { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
            { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" } // New product
        ],
        dresses: [
            { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" } // New product
        ]
    },
    man: {
        tops: [
            { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
            { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
            { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
            { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" } // New product, // New product
        ],
        bottoms: [
            { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
            { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
            { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" } // New product
        ],
        outerwear: [
            { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
            { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
            { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
            { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
            { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" } // New product
        ],
        activewear: [
            { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
            { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
            { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
            { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
            { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
            { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
            { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
            { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" } // New product
        ]
    }
};

// Store current selected gender and category
let selectedGender = null;
let selectedCategory = null;
let searchQuery = "";
// Function to toggle welcome picture visibility
function toggleWelcomePicture() {
    if (selectedGender || selectedCategory || searchQuery.trim() !== "") {
        welcomePicture.classList.add("hidden");
        itemGrid.classList.remove("hidden");
        categoriesSection.classList.remove("hidden");
    } else {
        welcomePicture.classList.remove("hidden");
        itemGrid.classList.add("hidden");
        categoriesSection.classList.add("hidden");
    }
}

// Function to update category buttons based on selected gender
function updateCategoryButtons() {
    const categoryButtons = document.querySelectorAll(".category");
    categoryButtons.forEach(button => button.classList.add("hidden"));

    const genderCategories = selectedGender === 'woman' ? ['tops', 'bottoms', 'outerwear', 'dresses'] : ['tops', 'bottoms', 'outerwear', 'activewear'];

    genderCategories.forEach(category => {
        const categoryButton = document.querySelector(`.category[data-category="${category}"]`);
        if (categoryButton) categoryButton.classList.remove("hidden");
    });
}

// Function to update the URL with selected filters
function updateURL() {
    const url = new URL(window.location.href);

    // Update gender, category, and search query in the URL
    if (selectedGender) {
        url.searchParams.set('gender', selectedGender);
    } else {
        url.searchParams.delete('gender');
    }

    if (selectedCategory) {
        url.searchParams.set('category', selectedCategory);
    } else {
        url.searchParams.delete('category');
    }

    if (searchQuery) {
        url.searchParams.set('search', searchQuery);
    } else {
        url.searchParams.delete('search');
    }

    // Update the URL without reloading the page
    window.history.pushState({}, '', url);
}

// Add event listener to gender buttons
navButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Update selected gender
        selectedGender = button.dataset.gender;

        // Update the URL with the selected gender
        updateURL();

        // Update category buttons and display products
        updateCategoryButtons();
        toggleWelcomePicture();
        displayProducts();
    });
});

// Add event listener to category buttons
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Update selected category
        selectedCategory = button.dataset.category;

        // Update the URL with the selected category
        updateURL();

        // Display products based on selected category
        toggleWelcomePicture();
        displayProducts();
    });
});

// Event listener for search input
searchInput.addEventListener("input", function () {
    // Update search query
    searchQuery = searchInput.value.trim();

    // Update the URL with the current search query
    updateURL();

    // Re-display products with the new search filter applied
    toggleWelcomePicture();
    displayProducts();
});

// Function to display products based on selected filters
function displayProducts() {
    itemGrid.innerHTML = ""; // Clear current products

    // If gender is selected, filter products by gender and category
    if (selectedGender) {
        const genderProducts = products[selectedGender];

        // Filter by selected category if specified
        const filteredProducts = (selectedCategory && genderProducts[selectedCategory] ? genderProducts[selectedCategory] : Object.values(genderProducts).flat()).filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
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

// Load page with filters based on URL parameters
window.addEventListener("load", function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get gender, category, and search query from the URL
    const gender = urlParams.get('gender');
    const category = urlParams.get('category');
    const searchQueryFromURL = urlParams.get('search') || "";

    // Set selected gender, category, and search query from the URL
    selectedGender = gender || null;
    selectedCategory = category || null;
    searchQuery = searchQueryFromURL;

    // Restore the search input value if there is a search query
    if (searchInput) {
        searchInput.value = searchQuery;
    }

    // Update category buttons based on the selected gender
    if (selectedGender) {
        updateCategoryButtons();
    }

    // Toggle visibility based on selected gender, category, and search query
    toggleWelcomePicture();

    // Display products based on selected filters
    displayProducts();
});