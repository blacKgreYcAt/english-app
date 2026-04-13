\# 兒童英文卡牌學習 APP (Kids English Card-Quest)



\## 目錄結構 (Directory Structure)



├── public/

│   ├── images/

│   │   ├── prepositions/      # 介係詞圖像素材

│   │   ├── phonics/           # 發音規則圖解素材

│   │   └── cards/             # 遊戲獎勵卡牌圖片

│   └── audio/                 # 單字與發音語音檔

├── src/

│   ├── components/

│   │   ├── TeachingBoard.jsx  # 初始教學與發音練習元件

│   │   ├── ImagePractice.jsx  # 圖像互動拖曳練習元件

│   │   ├── QuizEngine.jsx     # 隨堂測驗引擎 (含錯誤導師解說)

│   │   └── CardCollection.jsx # 學生卡牌圖鑑元件

│   ├── context/

│   │   └── UserProgress.jsx   # 全域狀態：追蹤學習進度與卡牌

│   ├── data/

│   │   └── curriculum.json    # 核心課程內容資料庫

│   ├── pages/

│   │   ├── Home.jsx           # 首頁 (學習地圖)

│   │   └── LessonPage.jsx     # 學習流程控制器 (Teaching -> Practice -> Quiz)

│   ├── App.jsx

│   └── main.jsx

