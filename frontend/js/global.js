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

// Select the icons
const profileIcon = document.getElementById("profile-icon");
const likeIcon = document.getElementById("like-icon");
const bagIcon = document.getElementById("bag-icon");

// Wrap each icon with an <a> tag and set the href attribute
function wrapIconWithLink(icon, href) {
    const link = document.createElement("a");
    link.href = href;

    // Insert the link before the icon and move the icon inside it
    icon.parentNode.insertBefore(link, icon);
    link.appendChild(icon);
}

// Add links to each icon
wrapIconWithLink(profileIcon, "user_account_base.html");
wrapIconWithLink(likeIcon, "favorite.html");
wrapIconWithLink(bagIcon, "bag.html");