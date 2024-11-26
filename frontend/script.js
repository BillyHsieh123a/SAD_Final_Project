// script.js

// Selectors
const navButtons = document.querySelectorAll(".nav-btn");
const categoriesSection = document.getElementById("categories");
const itemGrid = document.getElementById("item-grid");

// Mock Data
const products = {
  woman: [
    { name: "Blazer", price: "100 NTD", img: "https://via.placeholder.com/150" },
    { name: "Dress", price: "120 NTD", img: "https://via.placeholder.com/150" },
  ],
  man: [
    { name: "Jacket", price: "200 NTD", img: "https://via.placeholder.com/150" },
    { name: "Trousers", price: "150 NTD", img: "https://via.placeholder.com/150" },
  ],
};

// Show Categories and Filter Products
navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const gender = button.dataset.gender;

    // Show categories
    categoriesSection.classList.remove("hidden");

    // Display products
    displayProducts(gender);
  });
});

// Function to Display Products
function displayProducts(gender) {
  itemGrid.innerHTML = ""; // Clear current products

  products[gender].forEach(product => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
    `;
    itemGrid.appendChild(card);
  });
}
