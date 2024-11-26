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

// Function to display products for a given gender
function displayProducts(gender) {
  itemGrid.innerHTML = ""; // Clear current products

  if (products[gender]) {
    // Iterate over the products and create cards
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
}

// Add click event listener to each navigation button
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle 'active' class to the clicked button
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Get gender from button's data attribute
    const gender = button.dataset.gender;

    // Show categories section
    categoriesSection.classList.remove("hidden");

    // Display products based on selected gender
    displayProducts(gender);
  });
});
