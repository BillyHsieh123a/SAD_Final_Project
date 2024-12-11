// 選取所有 "More Details" 按鈕
// const detailButtons = document.querySelectorAll('.more-details');

// // 迭代按鈕並添加點擊事件
// detailButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     // 找到對應的隱藏內文
//     const details = button.nextElementSibling;
//     if (details) {
//       // 切換顯示與隱藏
//       details.classList.toggle('hidden');
//       // 切換按鈕文字
//       button.textContent = details.classList.contains('hidden') ? 'More Details' : 'Hide Details';
//     }
//   });
// });

const detailButtons = document.querySelectorAll('.more-details');
    detailButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const details = button.previousElementSibling;
        const isHidden = details.style.display === 'none' || details.style.display === '';
        
        if (isHidden) {
          details.style.display = 'block'; // 顯示內文
          button.textContent = 'Hide Details';
        } else {
          details.style.display = 'none'; // 隱藏內文
          button.textContent = 'More Details';
        }
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll(".save-change");
      const orderList = document.getElementById("order-list");
      const noOrdersMessage = document.getElementById("no-orders-message");
  
      // Function to fetch and display orders based on status
      const fetchOrders = async (status) => {
          try {
              // Clear current orders
              orderList.innerHTML = "";
  
              // Fetch orders from the backend
              const response = await fetch(`/api/orders?status=${status}`);
              if (!response.ok) throw new Error("Failed to fetch orders");
  
              const orders = await response.json();
  
              // Display orders or show "no orders" message
              if (orders.length === 0) {
                  noOrdersMessage.style.display = "block";
              } else {
                  noOrdersMessage.style.display = "none";
                  orders.forEach(order => {
                      const orderCard = document.createElement("div");
                      orderCard.className = "order-card";
                      orderCard.innerHTML = `
                          <img src="${order.image}" alt="${order.name}">
                          <div class="order-details">
                              <h2>${order.name}</h2>
                              <p>Size: ${order.size}</p>
                              <p>Color: ${order.color}</p>
                              <p>Order Date: ${order.orderDate}</p>
                              <p>Ideal Received Date: ${order.receivedDate}</p>
                              <p class="price">$ ${order.price} × ${order.quantity}</p>
                              <button class="more-details" data-id="${order.id}">More Details</button>
                          </div>
                      `;
                      orderList.appendChild(orderCard);
                  });
              }
          } catch (error) {
              console.error(error);
              noOrdersMessage.style.display = "block";
              noOrdersMessage.textContent = "Error fetching orders. Please try again later.";
          }
      };
  
      // Add click event listeners to tabs
      tabs.forEach(tab => {
          tab.addEventListener("click", () => {
              const status = tab.getAttribute("data-status");
              fetchOrders(status);
          });
      });
  
      // Load "In Progress" orders by default
      fetchOrders("in-progress");
  });