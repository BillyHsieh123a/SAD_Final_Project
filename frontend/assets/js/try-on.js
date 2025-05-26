document.addEventListener('DOMContentLoaded', () => {
  setupUploadButtons();
  loadFavoritesTop();
  loadFavoritesBottom();
});

// 綁定所有 Upload 按鈕點擊行為
function setupUploadButtons() {
  document.querySelectorAll('.upload-btn').forEach(label => {
    label.addEventListener('click', () => {
      const input = label.nextElementSibling;
      if (input && input.type === 'file') {
        input.click();
      }
    });
  });
}

// 紀錄選擇狀態
let selectedTopProduct = null;
let selectedTopCard = null;
let selectedBottomProduct = null;
let selectedBottomCard = null;

async function loadFavoritesTop() {
  await loadFavoritesByPart("T", "top-list", "top");
}

async function loadFavoritesBottom() {
  await loadFavoritesByPart("B", "bottom-list", "bottom");
}

async function loadFavoritesByPart(partCode, containerId, categoryKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`${serverURL}/api/favorite/allitem?user_id=${get_user_id()}`);
    if (!response.ok) throw new Error("Request failed");

    let favorites = await response.json();
    favorites = favorites.filter(item => item.part === partCode);

    if (favorites.length === 0) {
      container.innerHTML = "<p>目前沒有符合的收藏商品。</p>";
      return;
    }

    container.innerHTML = "";

    favorites.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${".." + product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} NTD</p>
      `;

      // 若為選中項目，自動加上 selected 樣式
      const isSelected = (categoryKey === "top" && selectedTopProduct?.id === product.id) ||
                         (categoryKey === "bottom" && selectedBottomProduct?.id === product.id);

      if (isSelected) {
        card.classList.add("selected");
        if (categoryKey === "top") selectedTopCard = card;
        else selectedBottomCard = card;
      }

      card.addEventListener("click", () => {
        const wasSelected = card.classList.contains("selected");

        // 清除舊選擇
        if (categoryKey === "top") {
          if (selectedTopCard) selectedTopCard.classList.remove("selected");
          selectedTopProduct = wasSelected ? null : product;
          selectedTopCard = wasSelected ? null : card;
        } else {
          if (selectedBottomCard) selectedBottomCard.classList.remove("selected");
          selectedBottomProduct = wasSelected ? null : product;
          selectedBottomCard = wasSelected ? null : card;
        }

        if (!wasSelected) card.classList.add("selected");
        else card.classList.remove("selected");

        console.log(`🔘 ${categoryKey.toUpperCase()} 選擇：`, wasSelected ? null : product);
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error("❌ 載入錯誤：", error);
    container.innerHTML = "<p>載入失敗。</p>";
  }
}
