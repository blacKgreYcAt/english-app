# 🎨 FRY 1000 英文千詞營 - Option 5 混合方案實施計畫

## 📊 圖片需求統計

### 課程結構分析
- **10 個等級**（Grade 1-10）
- **4 個模塊** × 10 等級 = **40 個模塊**
- **每個模塊需要 4 張圖片**：
  - `intro.png` - 第一課教學圖
  - `lesson2.png` - 第二課教學圖  
  - `card.png` - 互動練習卡片
  - `scene.png` - 互動練習背景場景

### 總計
```
40 模塊 × 4 張圖片 = 160 張圖片
```

### 圖片路徑結構
```
/images/words/
├── level1/
│   ├── module1/ (4 images)
│   ├── module2/ (4 images)
│   ├── module3/ (4 images)
│   └── module4/ (4 images)
├── level2/
│   └── ...（同上）
└── level10/
    └── ...（同上）
```

---

## 🎯 Option 5 混合方案詳解

### 方案構成（按優先級）

#### 1️⃣ **開源資源庫（40% - 64張圖片）**
用於快速填補非核心內容

**推薦來源：**
- **Pexels** (www.pexels.com) - 免費高質量照片
- **Unsplash** (www.unsplash.com) - 攝影素材
- **Pixabay** (www.pixabay.com) - 多媒體資源
- **OpenClipart** (www.openclipart.org) - 開源向量圖
- **Freepik** (免費版) (www.freepik.com) - 卡通插圖

**適用類型：**
- 日常物品（animal, food, furniture）
- 場景圖片（park, school, home）
- 人物動作圖片（running, sleeping, eating）

---

#### 2️⃣ **AI 圖片生成（40% - 64張圖片）**
針對需要特定概念表達的圖片

**推薦工具：**

| 工具 | 優勢 | 免費額度 | 風格 |
|------|------|---------|------|
| **Stable Diffusion** (本地) | 完全免費，高度可控 | 無限 | 多樣化 |
| **DreamStudio** | 質量高，UI友好 | $7 試用額度 | 藝術化 |
| **Leonardo.AI** | 卡通風格優化 | 150次/月 | 卡通友好 |
| **Bing Image Creator** | 基於DALL-E，免費 | 無限（有配額） | 多樣化 |

**推薦方案：使用 Stable Diffusion WebUI**
- 下載：https://github.com/AUTOMATIC1111/stable-diffusion-webui
- 優勢：完全本地運行，可重複使用，無成本
- 風格控制：通過 prompt engineering 保證一致性

**提示詞範本：**
```
A cute cartoon {noun} in a bright {color} style, 
perfect for children's English learning app, 
high quality, detailed, vibrant colors, professional illustration
```

---

#### 3️⃣ **手工改進 SVG（20% - 32張圖片）**
針對核心詞彙和概念需要高度定製

**優先生成清單：**
- **Level 1-2**：基礎詞彙（animal, food, color） - 8張
- **動作詞**：所有等級的 verb illustrations - 16張
- **抽象概念**：時間、情感、方向 - 8張

**已完成示例：**
- ✅ cat_under_table_cartoon.svg
- ✅ chameleon_behind_tree_cartoon.svg
- ✅ magic_e_make_cartoon.svg
- ✅ dog_cartoon.svg
- ✅ box_cartoon.svg

---

## 🎨 視覺風格指南

### 核心設定

| 要素 | 規範 |
|------|------|
| **色彩風格** | 鮮豔飽和度（60-80%），明度 50-80% |
| **線條** | 圓潤邊角，無銳利轉折 |
| **角色風格** | 大眼睛、溫暖表情、簡單五官 |
| **背景** | 簡潔，不喧賓奪主 |
| **字體標籤** | 大號清晰英文+漢語解釋 |

### 配色方案

```
主色系列：
- 紅色系：#FF6B6B, #FF8C42, #FF9F43
- 綠色系：#00C853, #81C784, #00FF88
- 藍色系：#1976D2, #2196F3, #00BCD4
- 黃色系：#FFD700, #FFEB3B, #FFC107

輔色：
- 溫暖肌色：#FFD7B5, #FFB3BA
- 灰色背景：#F5F5F5, #E8F5E9, #F0F4FF
```

### 排版規範

```
教學圖 (intro.png, lesson2.png)：
- 圖片尺寸：800×600px
- 底部文字區：20% 高度預留
- 字體大小：32-48px（標題），20-24px（說明）

練習圖 (card.png, scene.png)：
- 卡片尺寸：300×300px
- 背景尺寸：800×600px
- 可拖曳區域需清晰標示
```

---

## 📋 分階段實施計畫

### Phase 1：基礎設置（2-3小時）

#### Step 1.1：建立目錄結構
```bash
cd public/images/words
# 創建所有 10 × 4 = 40 個文件夾
for level in {1..10}; do
  for module in {1..4}; do
    mkdir -p level$level/module$module
  done
done
```

#### Step 1.2：創建 AI 生成提示詞庫
建立 `PROMPTS_LIBRARY.json`，為每個課程預編寫 prompt

```json
{
  "level1_module1": {
    "intro": {
      "concept": "the, of, and 基礎詞彙",
      "prompt": "A cute cartoon scene with a cat, book, and apple on a table, bright colors, perfect for English learning",
      "style": "colorful cartoon illustration"
    },
    "lesson2": {
      "concept": "in 介詞",
      "prompt": "A cute cartoon book inside a backpack, vibrant colors, professional children's illustration",
      "style": "colorful cartoon"
    }
  }
}
```

---

### Phase 2：快速填補期（1-2週）

#### Step 2.1：批量下載開源圖片（2-3小時）
- 為每個課程關鍵詞搜索開源圖片
- 保存到對應的 module 文件夾
- 統一調整尺寸和色彩平衡

**推薦工具：**
```python
# Python 批量下載腳本（使用 unsplash-py 或 pexels-api）
from pexels_api import PexelsAPI
import requests

api = PexelsAPI('YOUR_API_KEY')
search_term = "cute cat cartoon"
results = api.search(search_term, page=1, per_page=20)
```

#### Step 2.2：使用 Stable Diffusion 生成（3-4小時）
- 使用 WebUI 批量生成 64 張圖片
- 按 prompt_library 系統生成
- 質量檢查和篩選

**批量生成腳本：**
```python
from PIL import Image
import requests
import json

with open('PROMPTS_LIBRARY.json') as f:
    prompts = json.load(f)

for level_module, items in prompts.items():
    for image_type, data in items.items():
        # 調用 SD WebUI API
        response = requests.post(
            'http://127.0.0.1:7860/api/txt2img',
            json={
                "prompt": data['prompt'],
                "steps": 30,
                "cfg_scale": 7.5
            }
        )
        # 保存圖片
        save_path = f"public/images/words/{level_module}/{image_type}.png"
```

---

### Phase 3：定製化改進（1週）

#### Step 3.1：優先改進 Level 1-2 SVG
- 重新繪製 8 張核心動物圖
- 確保色彩一致性和質量

#### Step 3.2：動作詞 SVG 套件
- 創建 16 張基礎動作圖（run, jump, eat, sleep 等）
- 可複用的角色和動作模板

---

### Phase 4：質量檢查與部署（3-5天）

#### Step 4.1：視覺審查
- 檢查色彩一致性
- 檢查尺寸規範
- 檢查清晰度和細節

#### Step 4.2：功能測試
- 所有圖片在 App 中正確加載
- 響應式設計下正常顯示
- 沒有缺失或損壞

---

## 🛠️ 具體工具說明

### 工具 A：Stable Diffusion WebUI 快速上手

```bash
# 1. 克隆倉庫
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui

# 2. 運行（自動安裝依賴）
./webui.sh  # Mac/Linux
webui.bat   # Windows

# 3. 訪問 http://localhost:7860
# 4. 輸入 Prompt，點擊 Generate
```

**最佳設定：**
```
Sampler: DPM++ 2M Karras
Steps: 30-40
CFG Scale: 7-8
Width: 800, Height: 600
```

---

### 工具 B：圖片批量處理

```python
# 使用 Pillow 統一圖片尺寸和色彩

from PIL import Image
import os
import glob

def resize_and_optimize(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    
    for img_path in glob.glob(f"{input_dir}/**/*.png", recursive=True):
        img = Image.open(img_path)
        
        # 統一尺寸
        if "lesson" in img_path:
            img = img.resize((800, 600), Image.Resampling.LANCZOS)
        elif "card" in img_path:
            img = img.resize((300, 300), Image.Resampling.LANCZOS)
        
        # 色彩增強
        from PIL import ImageEnhance
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.2)  # 增加飽和度
        
        # 保存
        output_path = img_path.replace(input_dir, output_dir)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path, quality=95)

resize_and_optimize("raw_images", "public/images/words")
```

---

## 📈 預期進度與時程

| 階段 | 時間 | 完成量 | 質量 |
|------|------|--------|------|
| Phase 1 - 基礎設置 | 3小時 | - | - |
| Phase 2.1 - 開源下載 | 4小時 | 64張 | ⭐⭐⭐⭐ |
| Phase 2.2 - AI 生成 | 6小時 | 64張 | ⭐⭐⭐⭐⭐ |
| Phase 3 - SVG 改進 | 16小時 | 32張 | ⭐⭐⭐⭐⭐ |
| Phase 4 - 質量檢查 | 4小時 | 全檢查 | ✅ |
| **合計** | **33小時** | **160張** | **⭐⭐⭐⭐⭐** |

---

## ✅ 質量檢查清單

### 視覺檢查
- [ ] 所有 160 張圖片色彩飽和度一致
- [ ] 沒有模糊或低質量圖片
- [ ] 卡通風格統一
- [ ] 文字清晰可讀

### 功能檢查
- [ ] 所有路徑正確（/images/words/level{1-10}/module{1-4}/*.png）
- [ ] 圖片尺寸規範（800×600, 300×300）
- [ ] 無損壞或缺失圖片
- [ ] 響應式設計下正常顯示

### 教育內容檢查
- [ ] 圖片與課程內容匹配
- [ ] 沒有不當或令人不適的內容
- [ ] 適合兒童學習
- [ ] 包含清晰的英文標籤

---

## 🎁 開始行動

### 立即可做的 3 件事

1. **建立目錄結構**
   ```bash
   # 運行上面的目錄創建命令
   ```

2. **準備 Stable Diffusion**
   ```bash
   # 安裝並測試生成 1 張試驗圖
   ```

3. **編寫 Prompt 庫**
   ```json
   # 為每個課程編寫優化的 prompt
   ```

---

## 💡 進階優化建議

### 方案擴展（如有時間）

1. **添加動畫效果**
   - 使用 Lottie 為簡單圖形添加動畫
   - 增強學習體驗

2. **角色一致性**
   - 創建品牌卡通角色
   - 每課都出現同一角色，提高認可度

3. **多語言標籤**
   - 在圖片上添加英文+中文標籤
   - 增強學習效果

---

## 📞 需要幫助？

- **Stable Diffusion 卡住？** 查看 GitHub Issues：https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues
- **Prompt 不滿意？** 使用 Prompt 優化工具：https://www.promptenhance.ai/
- **圖片質量問題？** 考慮升級模型：DreamShaper, Chilloutmix

---

**下一步：選擇開始工作的模塊（Level 1, Module 1），生成 4 張試驗圖測試流程。**
