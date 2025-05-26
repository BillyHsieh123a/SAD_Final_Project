document.addEventListener('DOMContentLoaded', () => {
    setupTabButtons();
});

// 綁定 tab 行為
function setupTabButtons() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 清除所有 tab 的 active 樣式
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            loadFavorites(category); // 根據選取的類別載入收藏
        });
    });

    // 預設自動點 Top
    const defaultTab = document.querySelector('.tab-btn[data-category="top"]');
    if (defaultTab) defaultTab.click();
}

let selectedProduct = null; // 存選中的商品資料
let selectedCard = null;    // 存選中的 DOM 卡片

async function loadFavorites(category) {
    const container = document.getElementById("recommendation-list");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${serverURL}/api/favorite/allitem?user_id=${get_user_id()}`);
        if (!response.ok) throw new Error("Request failed");

        let favorites = await response.json();

        // 類別過濾
        if (category === "top") {
            favorites = favorites.filter(item => item.part === "T");
        } else if (category === "bottom") {
            favorites = favorites.filter(item => item.part === "B");
        }

        // 無商品時顯示訊息
        if (favorites.length === 0) {
            container.innerHTML = "<p>沒有符合的收藏商品。</p>";
            return;
        }

        // 顯示商品卡片
        container.innerHTML = "";
        favorites.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${".." + product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} NTD</p>
            `;

            // 點擊選取商品卡片
            card.addEventListener("click", () => {
                const isSelected = card.classList.contains('selected');

                if (isSelected) {
                    card.classList.remove('selected');
                    selectedProduct = null;
                    selectedCard = null;
                    console.log("🟡 取消選擇");
                } else {
                    if (selectedCard) selectedCard.classList.remove('selected');

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
