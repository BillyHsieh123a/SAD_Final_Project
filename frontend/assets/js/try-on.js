document.addEventListener('DOMContentLoaded', () => {
    setupTabButtons();
});

// 綁定 tab 行為
function setupTabButtons() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            loadFavorites(category); // ← 根據選取的類別載入收藏
        });
    });

    // 預設自動點 All
    const defaultTab = document.querySelector('.tab-btn[data-category="all"]');
    if (defaultTab) defaultTab.click();
}

let selectedProduct = null; // Stores selected product
let selectedCard = null;    // Stores the selected DOM element

async function loadFavorites(category) {
    const container = document.getElementById("recommendation-list");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${serverURL}//api/favorite/allitem?user_id=${get_user_id()}`);
        if (!response.ok) throw new Error("Request failed");

        let favorites = await response.json();

        if (category === "top") {
            favorites = favorites.filter(item => item.part === "T");
        } else if (category === "bottom") {
            favorites = favorites.filter(item => item.part === "B");
        }

        if (favorites.length === 0) {
            container.innerHTML = "<p>沒有符合的收藏商品。</p>";
            return;
        }

        container.innerHTML = "";
        favorites.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${".." + product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            // Toggle selection on click
            card.addEventListener("click", () => {
                const isSelected = card.classList.contains('selected');

                // Deselect if already selected
                if (isSelected) {
                    card.classList.remove('selected');
                    selectedProduct = null;
                    selectedCard = null;
                    console.log("🟡 取消選擇");
                } else {
                    // Deselect previous
                    if (selectedCard) selectedCard.classList.remove('selected');

                    // Select current
                    card.classList.add('selected');
                    selectedProduct = product;
                    selectedCard = card;
                    console.log("🟢 選擇的商品：", selectedProduct);
                }
            });

            container.appendChild(card);
        });

    } catch (error) {
        console.error("❌ 錯誤發生：", error);
        container.innerHTML = "<p>載入失敗。</p>";
    }
}
