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
