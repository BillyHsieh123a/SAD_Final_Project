// 設定測試資料
const Transaction = [
    { 
        orderid: 12234567,    
        firstName: 'John',
        lastName: 'Doe', 
        price: 340,    
        mobile: '1234567890',
        address: '123 Main St, City, Country', 
        date: "" 
    },
];

const today = new Date();

// 格式化日期
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

// 插入訂單編號和日期
document.getElementById("orderNumber").textContent = Transaction[0].orderid;
document.getElementById("orderDate").textContent = formattedDate;

// 插入顧客詳細資訊
const customerInfo = document.getElementById("customerInfo");
customerInfo.innerHTML = `
  <p>Name: ${Transaction[0].firstName} ${Transaction[0].lastName}</p>
  <p>Phone: ${Transaction[0].mobile}</p>
  <p>Address: ${Transaction[0].address}</p>
  <p>Price: $${Transaction[0].price}</p>
`;

// 點擊顯示/隱藏詳細訊息
document.getElementById("detailsButton").addEventListener("click", () => {
  if (customerInfo.classList.contains("hidden")) {
    customerInfo.classList.remove("hidden");
    document.getElementById("detailsButton").textContent = "▲";
  } else {
    customerInfo.classList.add("hidden");
    document.getElementById("detailsButton").textContent = "▼";
  }
});
