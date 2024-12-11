const Transaction = [
    { 
        orderid: "",
        firstName: 'John',
        lastName: 'Doe',     
        price: "",   
        mobile: '1234567890', 
        address: "", 
        date: "" 
    },
];

// Function to fetch order data from the backend
window.onload = async function () {
    try {
        const response = await fetch(`${serverURL}/ordered?ordered_id=${ordered_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Log the response status
        console.log("Response Status: ", response.status);

        // Check if the response is successful (status code 200)
        if (response.ok) {
            console.log("Response successful, processing data...");
            const data = await response.json();
            console.log("Fetched Data: ", data);

            // Update the Transaction array with the data from the response
            Transaction[0] = {
                orderid: data.order_id,      // Order ID
                price: data.sub_total + data.shipping_fee,       // Price (sub_total + shipping_fee)
                address: data.address,       // Address
                date: data.order_date        // Date
            };

            // Log the updated Transaction data
            console.log("Updated Transaction: ", Transaction);
        } else {
            // Handle error if the order is not found or there's a server error
            console.error("Error fetching order data:", await response.text());
        }
    } catch (error) {
        // Handle any network errors
        console.error("Network error:", error);
    }
}

// Create a Date object for today
const today = new Date();

// Format today's date
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

// Insert order number and date into the HTML
document.getElementById("orderNumber").textContent = Transaction[0].orderid;
document.getElementById("orderDate").textContent = formattedDate;

// Insert customer details into the HTML
const customerInfo = document.getElementById("customerInfo");
customerInfo.innerHTML = `
  <p>Name: ${Transaction[0].firstName} ${Transaction[0].lastName}</p>
  <p>Phone: ${Transaction[0].mobile}</p>
  <p>Address: ${Transaction[0].address}</p>
  <p>Price: $${Transaction[0].price}</p>
`;

document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD
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
          window.location.href = `category?gender=woman`;  
      });
  } else {
      console.error("找不到女性性別按鈕");
  }

  const mButton = document.querySelector(".nav-btn[data-gender='man']");
  if (mButton) {
      mButton.addEventListener("click", function() {
          console.log("男性按鈕被點擊");
          window.location.href = `category?gender=man`;
      });
  } else {
      console.error("找不到男性性別按鈕");
  }
=======
    // Handle Logo click event
    const logoLink = document.querySelector(".logo a");
    if (logoLink) {
        logoLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default action, manually control redirection
            const targetUrl = logoLink.getAttribute("href");
            if (targetUrl) {
                window.location.href = targetUrl; // Manually navigate to target URL
            } else {
                console.error("No target URL specified");
            }
        });
    } else {
        console.error("Logo link not found");
    }

    // Handle Woman button click event
    const wButton = document.querySelector(".nav-btn[data-gender='woman']"); 
    if (wButton) {
        wButton.addEventListener("click", function() {
            console.log("Woman button clicked");
            window.location.href = `category.html?gender=woman`;  
        });
    } else {
        console.error("Woman button not found");
    }

    // Handle Man button click event
    const mButton = document.querySelector(".nav-btn[data-gender='man']");
    if (mButton) {
        mButton.addEventListener("click", function() {
            console.log("Man button clicked");
            window.location.href = `category.html?gender=man`;
        });
    } else {
        console.error("Man button not found");
    }
>>>>>>> 3bfbafc (order)
});

// Toggle the visibility of customer info
document.getElementById("detailsButton").addEventListener("click", () => {
    if (customerInfo.classList.contains("hidden")) {
        customerInfo.classList.remove("hidden");
        document.getElementById("detailsButton").textContent = "▲";  // Change button text
    } else {
        customerInfo.classList.add("hidden");
        document.getElementById("detailsButton").textContent = "▼";  // Change button text
    }
});
