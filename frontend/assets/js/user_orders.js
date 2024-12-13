document.querySelectorAll(".save-change").forEach((button) => {
    button.addEventListener("click", () => {
        const status = button.id; // 直接使用按鈕的 id 作為 status
        LoadOrders(status);
    });
});


window.onload = LoadOrders("p");
 
//     try {
        
//         const response = await fetch(`/user_orders_load_orders?user_id=${get_user_id()}&status=${'p'}`, {
//             method: 'GET',
//         });

//         if (response.ok) {
//             const orders = await response.json();
//             console.log(orders); // 用於測試的輸出
//             RenderOrders(orders); // 渲染訂單資料到頁面
//         } else {
//             console.error(`Failed to load orders: ${response.status} - ${response.statusText}`);
//         }
//     } catch (error) {
//         console.error("Error loading orders:", error);
//     }
// }

async function LoadOrders(status) {
    try {
        const userId = sessionStorage.getItem("user_id"); // 假設用 sessionStorage 儲存用戶 ID
        if (!userId) {
            console.error("User ID not found.");
            return;
        }

        const response = await fetch(`/user_orders_load_orders?user_id=${get_user_id()}&status=${status}`, {
            method: 'GET',
        });

        if (response.ok) {
            const orders = await response.json();
            console.log(orders); // 用於測試的輸出
            RenderOrders(orders); // 渲染訂單資料到頁面
        } else {
            console.error(`Failed to load orders: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // console.error("Error loading orders:", error);
    }
}

function RenderOrders(orders) {
    const ordersContainer = document.getElementById("order-list"); // 假設你有一個容器來顯示訂單
    ordersContainer.innerHTML = ""; // 清空舊內容

    orders.forEach(order => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-card");
        orderElement.innerHTML = `
            <img src="{{url_for('static', filename='${order.path}')}}" alt="${order.name}">
            <div class="order-details">
                <p>${order.order_id}</p>
                <h2>${order.name}</h2>
                <p>size: ${order.size}</p>
                <p>color: ${order.color}</p>
                <p>order date: ${order.order_date}</p>
                <p>ideal received date: ${order.ideal_rcv_date}</p>
                <p>price: ${order.price}</p>
                <p>purchase quantity: ${order.purchase_qty}</p>
                <p class="price">${order.sub_total}</p>
                <!-- 隱藏的內文 -->
                <div id="full-details">
                <p>payment type: ${order.payment_type}</p>
                <p>shipping fee: ${order.shipping_fee}</p>
                <p>description: ${order.description}</p>
                </div>
                <button class="more-details">More Details</button>
            </div>
        `;
    });
}
