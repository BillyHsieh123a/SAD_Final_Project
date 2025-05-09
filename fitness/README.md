# 健身夥伴應用

這是一個使用React和Tailwind CSS構建的共同健身系統，允許用戶創建和追蹤健身計劃，並與朋友分享進度。

## 如何運行此應用

### 先決條件

確保您的電腦上已經安裝了：

- Node.js (推薦版本14+)
- npm (隨Node.js一起安裝)

### 安裝步驟

1. **克隆或下載此項目到本地**

2. **安裝依賴項**
   在項目根目錄下打開命令行終端，執行：

   ```bash
   npm install
   ```

   這將安裝所有必要的依賴項，包括React、Tailwind CSS和Lucide React圖標庫。

3. **啟動開發服務器**
   在項目根目錄下執行：

   ```bash
   npm start
   ```

   這將啟動開發服務器，並自動在默認瀏覽器中打開應用。通常地址為：http://localhost:3000

4. **構建生產版本**
   當您準備部署應用時，運行：

   ```bash
   npm run build
   ```

   這將在`build`文件夾中創建優化的生產版本。

## 應用功能

- **主頁面**：顯示所有健身任務，可標記完成狀態
- **添加任務**：選擇健身項目、設置時間和目標
- **好友系統**：查看朋友的健身計劃和進度

## 文件結構

- `src/components/FitnessBuddyApp.jsx` - 主要應用組件
- `src/App.js` - 應用入口點
- `src/index.js` - React應用渲染點
- `public/index.html` - HTML模板

## 技術堆棧

- React - 前端框架
- Tailwind CSS - 用於樣式
- Lucide React - 圖標庫

## 自定義和擴展

您可以通過編輯以下文件來自定義應用：

- 修改 `src/components/FitnessBuddyApp.jsx` 中的健身選項和好友數據
- 調整 `tailwind.config.js` 以自定義主題顏色和其他Tailwind設置
- 在 `src/index.css` 中添加自定義CSS樣式