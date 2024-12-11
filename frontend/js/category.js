// Selectors
const navButtons = document.querySelectorAll(".nav-btn");
const categoriesSection = document.getElementById("categories");
const itemGrid = document.getElementById("item-grid");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category");
const serverURL = "http://127.0.0.1:5000"
// const products = {
//     woman: {
//         tops: [
//             { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "T-shirt", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweater", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Tank Top", price: "50 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blouse", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Crop Top", price: "70 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Button-down Shirt", price: "90 NTD", img: "https://via.placeholder.com/150" } // New product
//         ],
//         bottoms: [
//             { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Skirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leggings", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "140 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Wide-leg Pants", price: "110 NTD", img: "https://via.placeholder.com/150" } // New product
//         ],
//         outerwear: [
//             { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Leather Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Denim Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trench Coat", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cardigan", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer Jacket", price: "210 NTD", img: "https://via.placeholder.com/150" } // New product
//         ],
//         dresses: [
//             { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Summer Dress", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Party Dress", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Maxi Dress", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cocktail Dress", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bodycon Dress", price: "200 NTD", img: "https://via.placeholder.com/150" } // New product
//         ]
//     },
//     man: {
//         tops: [
//             { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shirt", price: "80 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatshirt", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Polo Shirt", price: "100 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Henley Shirt", price: "110 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Hoodie", price: "130 NTD", img: "https://via.placeholder.com/150" }, // New product
//             { name: "Graphic Tee", price: "75 NTD", img: "https://via.placeholder.com/150" } // New product, // New product
//         ],
//         bottoms: [
//             { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jeans", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Chinos", price: "150 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Cargo Pants", price: "170 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Shorts", price: "60 NTD", img: "https://via.placeholder.com/150" } // New product
//         ],
//         outerwear: [
//             { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Bomber Jacket", price: "220 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Blazer", price: "250 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Windbreaker", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Parka", price: "300 NTD", img: "https://via.placeholder.com/150" } // New product
//         ],
//         activewear: [
//             { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Gym Shorts", price: "90 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sweatpants", price: "120 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Track Jacket", price: "180 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Sports T-shirt", price: "70 NTD", img: "https://via.placeholder.com/150" },
//             { name: "Compression Tights", price: "130 NTD", img: "https://via.placeholder.com/150" } // New product
//         ]
//     }
// };

products = {}
window.onload = async function () {
    try {
        const response = await fetch(`${serverURL}/category_load_clothes_data`);
        const result = await response.json();
        products = result
        console.log(result); // Log the response from Flask
    } catch (error) {
        console.error('Error:', error);
    }
};

// Store current selected gender and category
let selectedGender = null;
let selectedCategory = null;

// Function to toggle welcome picture visibility
function toggleWelcomePicture() {
    const welcomePicture = document.getElementById("welcome-picture");
    const itemGrid = document.getElementById("item-grid");

    // Check if gender or category or search query is set
    if (selectedGender || selectedCategory || searchInput.value.trim() !== "") {
        welcomePicture.classList.add("hidden");
        itemGrid.classList.remove("hidden");
        categoriesSection.classList.remove("hidden");  // Ensure categories section is shown if gender is selected
    } else {
        welcomePicture.classList.remove("hidden");
        itemGrid.classList.add("hidden");
        categoriesSection.classList.add("hidden");  // Hide categories section if no gender is selected
    }
}


// Add event listener to gender buttons
navButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Existing logic for selecting gender
        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedGender = button.dataset.gender;

        // Show categories section based on the selected gender
        updateCategoryButtons();

        // Save the state to sessionStorage
        saveState();

        // Toggle welcome picture and display products
        toggleWelcomePicture();
        displayProducts();
    });
});

// Function to update category buttons based on selected gender
function updateCategoryButtons() {
    // Get all category buttons
    const categoryButtons = document.querySelectorAll(".category");

    // Clear all existing categories
    categoryButtons.forEach(button => button.classList.add("hidden"));

    // Get category buttons for the selected gender
    const genderCategories = selectedGender === 'woman' ? ['tops', 'bottoms', 'outerwear', 'dresses'] : ['tops', 'bottoms', 'outerwear', 'activewear'];

    // Show only the categories relevant to the selected gender
    genderCategories.forEach(category => {
        const categoryButton = document.querySelector(`.category[data-category="${category}"]`);
        if (categoryButton) {
            categoryButton.classList.remove("hidden");
        }
    });
}

// Add event listener to category buttons
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Existing logic for selecting category
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedCategory = button.dataset.category;

        // Save the state to sessionStorage
        saveState();

        // Toggle welcome picture and display products
        toggleWelcomePicture();
        displayProducts();
    });
});

// Event listener for search input
searchInput.addEventListener("input", function () {
    // Re-display products with search filter applied
    saveState();
    toggleWelcomePicture();
    if (selectedGender) {
        displayProducts();
    }
});

// Save current filter state to sessionStorage
function saveState() {
    const state = {
        selectedGender,
        selectedCategory,
        searchQuery: searchInput.value.trim(),
    };
    sessionStorage.setItem("filtersState", JSON.stringify(state));
}

// Function to display products based on selected filters
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
                    <img src="${product.img}" alt="${product.name}" class="product-image" data-product-name="${product.name}" data-product-price="${product.price}" data-product-img="${product.img}, data-product-clothes_id="${product.clothes_id}, data-product-color="${product.color}">
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
                    <img src="${product.img}" alt="${product.name}" class="product-image" data-product-name="${product.name}" data-product-price="${product.price}" data-product-img="${product.img}, data-product-clothes_id="${product.clothes_id}, data-product-color="${product.color}">
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
            // Save the current state in sessionStorage
            const state = {
                selectedGender,
                selectedCategory,
                searchQuery: searchInput.value.trim(),
            };
            sessionStorage.setItem("filtersState", JSON.stringify(state));

            // Get product details from data attributes
            const productName = image.dataset.productName;
            const productPrice = image.dataset.productPrice;
            const productImg = image.dataset.productImg;
            const productClothID = image.dataset.productClothID;
            const productColor = image.dataset.productColor;

            // Redirect to item.html with product details (query parameters)
            window.location.href = `item.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(productPrice)}&img=${encodeURIComponent(productImg)}&cloth_id=${encodeURIComponent(productClothID)}&color=${encodeURIComponent(productColor)}`;
        });
    });
}

// Restore state from sessionStorage
window.addEventListener("load", function () {
    const savedState = JSON.parse(sessionStorage.getItem("filtersState"));

    if (savedState) {
        // Restore gender
        selectedGender = savedState.selectedGender;
        if (selectedGender) {
            const activeGenderButton = document.querySelector(`.nav-btn[data-gender="${selectedGender}"]`);
            if (activeGenderButton) activeGenderButton.classList.add("active");

            // Update the categories based on the selected gender
            updateCategoryButtons();
        }

        // Restore category
        selectedCategory = savedState.selectedCategory;
        if (selectedCategory) {
            const activeCategoryButton = document.querySelector(`.category[data-category="${selectedCategory}"]`);
            if (activeCategoryButton) activeCategoryButton.classList.add("active");
        }

        // Restore search input
        searchInput.value = savedState.searchQuery || "";

        // Display products based on restored state
        toggleWelcomePicture();
        displayProducts();
    }
});

