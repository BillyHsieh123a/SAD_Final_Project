// Event listener for logo click to reset the state
const logoLink = document.querySelector(".logo a");

logoLink.addEventListener("click", function (event) {
    // Prevent default behavior of the link (navigation)
    event.preventDefault();

    // Reset the selected gender, category, and search input
    selectedGender = null;
    selectedCategory = null;
    searchInput.value = "";

    // Clear sessionStorage to reset filters
    sessionStorage.removeItem("filtersState");

    // Remove active classes from gender and category buttons
    navButtons.forEach(button => button.classList.remove("active"));
    categoryButtons.forEach(button => button.classList.remove("active"));

    // Hide category section and show the welcome picture
    categoriesSection.classList.add("hidden");
    toggleWelcomePicture();

    // Reset the display of products (or show welcome message if no filters)
    displayProducts();
});
