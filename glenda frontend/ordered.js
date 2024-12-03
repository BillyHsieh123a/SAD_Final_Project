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
document.addEventListener("DOMContentLoaded", function () {
  // 處理 Logo 點擊事件
  const logoLink = document.querySelector(".logo a");
  if (logoLink) {
      logoLink.addEventListener("click", function (event) {
          event.preventDefault(); // 防止默認行為，測試是否能手動控制跳轉
          const targetUrl = logoLink.getAttribute("href");
          if (targetUrl) {
              window.location.href = targetUrl; // 手動跳轉到目標頁面
          } else {
              console.error("連結沒有指定目標頁面");
          }
      });
  } else {
      console.error("找不到 .logo a 元素");
  }
  const wButton = document.querySelector(".nav-btn[data-gender='woman']"); 
  if (wButton) {
      wButton.addEventListener("click", function() {
          console.log("女性按鈕被點擊");
          window.location.href = `category.html?gender=woman`;  
      });
  } else {
      console.error("找不到女性性別按鈕");
  }

  const mButton = document.querySelector(".nav-btn[data-gender='man']");
  if (mButton) {
      mButton.addEventListener("click", function() {
          console.log("男性按鈕被點擊");
          window.location.href = `category.html?gender=man`;
      });
  } else {
      console.error("找不到男性性別按鈕");
  }
});


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
