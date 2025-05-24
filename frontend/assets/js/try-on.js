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

// 根據選擇的 tab 顯示收藏的衣服
async function loadFavorites(category) {
    const container = document.getElementById("recommendation-list");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${serverURL}/favorite_load_favorite_clothes?user_id=${get_user_id()}`);
        if (!response.ok) throw new Error("Request failed");
        
        let favorites = await response.json();

        console.log("🔍 原始收藏資料：", favorites);
        console.log("🔍 目前點擊的分類：", category);
        console.log("🔍 所有 part 值：", favorites.map(f => f.part));

        // 篩選 top / bottom
        if (category === "top") {
            favorites = favorites.filter(item => item.part === "T");
            console.log("✅ 篩選後 top：", favorites);
        } else if (category === "bottom") {
            favorites = favorites.filter(item => item.part === "B");
            console.log("✅ 篩選後 bottom：", favorites);
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
                <p style="font-size:12px;color:#888;">part: ${product.part}</p> <!-- 顯示 part 方便除錯 -->
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("❌ 錯誤發生：", error);
        container.innerHTML = "<p>載入失敗。</p>";
    }
}
