// 商品數據
const cartItems = [
  { id: 1, name: "Blazer", color: "White", size: "M", price: 100, quantity: 2 },
  { id: 2, name: "Blazer", color: "Black", size: "M", price: 80, quantity: 1 },
  { id: 3, name: "Blazer", color: "red", size: "M", price: 100, quantity: 2 },
  { id: 4, name: "Blazer", color: "pink", size: "M", price: 80, quantity: 1 },
];

// 初始化購物車
const cartContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");

function renderCart() {
cartContainer.innerHTML = ""; // 清空購物車
let subtotal = 0;

cartItems.forEach((item) => {
  subtotal += item.price * item.quantity;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
    <div class="item-details">
      <img src="https://via.placeholder.com/50" alt="${item.name}">
      <ul>
        <li>ITEM NAME: ${item.name}</li>
        <li>ITEM STYLE: (${item.color}, ${item.size})</li>
        <li>QTY: ${item.quantity}</li>
      </ul>
    </div>
    <div class="item-actions">
      <p>NTD ${item.price}</p>
      <button class="remove-btn" data-id="${item.id}">X</button>
    </div>
  `;
  cartContainer.appendChild(cartItem);
});

subtotalElement.textContent = subtotal;
}

// 移除商品功能
cartContainer.addEventListener("click", (e) => {
if (e.target.classList.contains("remove-btn")) {
  const id = parseInt(e.target.dataset.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1); // 移除商品
    renderCart();
  }
}
});

// 初始化購物車畫面
renderCart();
document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html"; // 這裡將導向結帳頁面
});