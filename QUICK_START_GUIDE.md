# ⚡ 5 分鐘快速開始指南

## 🎯 您現在擁有什麼？

✅ **160 張圖片的完整目錄結構**
```
public/images/words/
├── level1/module1/ ← 4 張示範圖片已生成 ✓
├── level1/module2/ ← 空（待填充）
├── level1/module3/ ← 空（待填充）
└── ... 共 40 個文件夾
```

✅ **AI Prompts 庫（24 個模塊）**
- 📄 `AI_PROMPTS_LIBRARY.json` - 每張圖片的生成指令

✅ **示範圖片套件**
- `level1/module1/intro.svg` - 教學圖示
- `level1/module1/lesson2.svg` - 教學圖示
- `level1/module1/card.svg` - 互動卡片
- `level1/module1/scene.svg` - 背景場景

---

## 🚀 3 種選擇

### 選項 1：最快（推薦）- 用 AI 生成全部

**時間：** 4 小時（3 小時生成 + 1 小時檢查）
**成本：** 免費（用 Stable Diffusion）
**質量：** ⭐⭐⭐⭐⭐

```bash
# 第一步：安裝 Stable Diffusion
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
webui-user.bat

# 第二步：等待模型下載完成（~4GB）

# 第三步：運行生成腳本
python generate_images.py

# 第四步：咖啡 + 等待
```

👉 **立即開始？** 跳到下面的「Stable Diffusion 快速安裝」

---

### 選項 2：手工補充 - 70% AI + 30% 開源資源

**時間：** 3 小時（更靈活）
**成本：** 免費
**質量：** ⭐⭐⭐⭐⭐

1. 用 Stable Diffusion 生成複雜圖片（teaching）
2. 從 Unsplash/Pexels 下載簡單圖片（practice）
3. 手工調整尺寸和色彩

---

### 選項 3：完全手工 SVG - 質量最優

**時間：** 15+ 小時（逐個繪製）
**成本：** 0 元
**質量：** ⭐⭐⭐⭐⭐⭐

使用 Figma 或 Adobe Illustrator 手工設計每張圖片。

---

## ⚡ Stable Diffusion 快速安裝（15分鐘）

### Step 1：下載
```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
```

### Step 2：運行（首次會自動下載模型 4GB）
**Windows：**
```bash
webui-user.bat
```

**Mac/Linux：**
```bash
bash webui.sh
```

### Step 3：訪問
打開瀏覽器，進入：`http://localhost:7860`

### Step 4：測試生成
在 WebUI 中輸入：
```
A cute cartoon child reading a colorful book in a bright classroom, 
vibrant colors, professional children's illustration, high quality
```

點擊 `Generate`，等待 30-60 秒。

---

## 📊 最小可行方案 (MVP)

如果你不想生成全部 160 張，可以先完成最少集合：

### 必要的 16 張（Level 1 全部）
- Level 1, Module 1-4 × 4 張 = 16 張
- 時間：1 小時

### 足夠的 40 張（每級各 4 張）
- 各級 Module 1 × 10 級 = 40 張
- 時間：2-3 小時

### 完整的 160 張
- 所有 40 個模塊 × 4 張 = 160 張
- 時間：4-5 小時

---

## 🎯 建議執行順序

### Week 1（本週）
- [ ] 安裝 Stable Diffusion（1 小時）
- [ ] 生成 Level 1 的 16 張圖片（1 小時）
- [ ] 驗證圖片在 App 中正常加載（30 分鐘）

### Week 2
- [ ] 生成 Level 2-5 的 64 張圖片（2 小時）
- [ ] 質量檢查（1 小時）

### Week 3
- [ ] 生成 Level 6-10 的 80 張圖片（3 小時）
- [ ] 最終檢查和部署（1 小時）

**總時間：** 8-10 小時 ✓ 可在 1-2 週內完成

---

## 🔍 驗證圖片加載

生成完成後，驗證圖片是否在 App 中正確顯示：

```bash
# 啟動 App
npm run dev

# 打開瀏覽器
# http://localhost:3000

# 查看 Lessons 頁面
# 確認圖片正常加載（無損壞、無延遲）
```

---

## ❓ 常見問題

### Q1：沒有 GPU，生成會很慢嗎？
**A：** 會慢 10 倍左右（3-10 分鐘 /張），但仍可行。建議用 CPU 版本或 Google Colab（免費 GPU）。

### Q2：能用其他 AI 工具嗎？
**A：** 可以！
- DALL-E 3（付費，但質量最高）
- Midjourney（付費，質量優）
- Leonardo.AI（免費版，卡通優化）

### Q3：圖片質量不滿意怎麼辦？
**A：** 
1. 調整 prompt（加入更多細節描述）
2. 更換模型（DreamShaper, Chilloutmix）
3. 修改 AI 參數（steps: 40-50, CFG: 7-9）

### Q4：可以混用不同來源的圖片嗎？
**A：** 完全可以！這是方案 B 的核心思想。只要保持：
- 色彩風格一致（飽和度、亮度）
- 尺寸規範（800×600, 300×300）
- 主題協調（兒童教育風格）

---

## 📋 檢查清單

### 生成前
- [ ] Stable Diffusion 已安裝並測試成功
- [ ] `AI_PROMPTS_LIBRARY.json` 已生成
- [ ] `public/images/words/` 目錄結構已建立

### 生成中
- [ ] 開始運行生成腳本
- [ ] 監控磁盤空間（160 張圖片 ~ 1-2GB）
- [ ] 檢查 GPU 記憶體（如有的話）

### 生成後
- [ ] 所有 160 張圖片已保存
- [ ] 檢查圖片質量
- [ ] 調整不滿意的圖片
- [ ] 更新 App 圖片路徑（如需要）

### 部署前
- [ ] 所有圖片在本地 App 中正常加載
- [ ] 沒有損壞或缺失的圖片
- [ ] 色彩和風格一致

---

## 💡 優化建議

### 色彩一致性
如果生成的圖片色彩不一致，使用：
```python
# optimize_images.py (已提供)
# 自動統一色彩飽和度和亮度
python optimize_images.py
```

### 快速生成（如有多個 GPU）
```
修改 generate_images.py：
num_processes = 4  # 並行生成 4 張
```

### 使用免費 GPU（Google Colab）
```python
# 可以在 Google Colab 上運行更快
# https://colab.research.google.com/
# 選擇 "T4 GPU" 運行時
```

---

## 🎉 完成後

生成全部 160 張圖片後：

1. **提交到 Git**
   ```bash
   git add public/images/words/
   git commit -m "chore: add 160 curriculum images for FRY 1000"
   git push
   ```

2. **部署到 Vercel**
   Vercel 自動部署，無需額外操作

3. **驗收檢查**
   - 檢查線上版本
   - 確認所有圖片正確加載

4. **下一步**
   - 可開始錄製語音文件
   - 可優化 App UI/UX
   - 可推送第一個版本

---

## 🚀 立即開始

**推薦執行：**

```bash
# 1. 進入項目目錄
cd /path/to/English\ APP

# 2. 克隆 Stable Diffusion
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui

# 3. 進入目錄
cd stable-diffusion-webui

# 4. 運行（自動下載模型）
webui-user.bat  # Windows
# 或
bash webui.sh   # Mac/Linux

# 5. 打開瀏覽器
# http://localhost:7860

# 6. 測試一張圖片生成
# 確認成功後，回到項目根目錄運行
python generate_images.py
```

---

**⏱️ 預計完成時間：4-5 小時（含首次模型下載）**

**準備好了嗎？開始吧！** 🎨🚀
