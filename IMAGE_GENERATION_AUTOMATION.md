# 📸 FRY 1000 - 自動化圖片生成系統

## ✅ 進度報告

### 已完成
- ✅ 建立 40 個目錄結構（10 levels × 4 modules）
- ✅ 生成 AI Prompts 庫（24 個模塊的完整 prompts）
- ✅ 創建 Level 1, Module 1 示範圖片（4 張 SVG）
  - `intro.svg` - 教學圖：基礎詞彙介紹
  - `lesson2.svg` - 教學圖：IN 介詞講解
  - `card.svg` - 互動卡片：THE 單字卡
  - `scene.svg` - 背景場景：教室互動背景

### 目標
- 📋 為全部 40 個模塊生成 160 張圖片
- 🎨 保持視覺風格一致性
- ⚡ 最小化人工工作量

---

## 🚀 3 種圖片生成方案

### 方案 A：完全自動化 SVG 生成（最快，需編程）
**時間：** 4-6 小時編程 + 2 小時運行
**成本：** 免費
**質量：** ⭐⭐⭐⭐

自動生成類似 Level 1, Module 1 的 SVG，使用參數化模板。

```javascript
// 偽代碼結構
generateSVGCard({
  concept: "the",
  color: "#FF6B6B",
  icon: "book",
  pronunciation: "/ðə/"
})
```

### 方案 B：混合方案 - SVG + AI 補充（推薦）
**時間：** 2-3 小時設置 + 3-4 小時運行
**成本：** 免費（用開源工具）或 $20-50（商業 AI）
**質量：** ⭐⭐⭐⭐⭐

- **簡單概念**（20 張）：自動生成 SVG
- **複雜概念**（60 張）：用 Stable Diffusion 生成
- **開源資源補充**（80 張）：從 Pexels/Unsplash 下載

### 方案 C：純 AI 生成 + 人工篩選（質量最高，耗時）
**時間：** 1-2 小時設置 + 8-10 小時人工篩選
**成本：** $50-200（AI API 調用）
**質量：** ⭐⭐⭐⭐⭐⭐

使用高級 AI 工具（DALL-E 3, Midjourney）生成所有圖片。

---

## 📋 推薦方案：混合方案（方案 B）

### Step 1：設置 Stable Diffusion (2-3小時)

#### 1.1 安裝（如果還未安裝）
```bash
# 克隆官方倉庫
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui

# Windows 用戶運行
webui-user.bat

# Mac/Linux 用戶運行
bash webui.sh
```

#### 1.2 訪問界面
- 打開瀏覽器：`http://localhost:7860`
- 首次加載會自動下載模型（~4GB）

#### 1.3 配置 WebUI API
編輯 `webui-user.bat`（Windows）或 `webui-user.sh`（Mac/Linux）：
```bash
# 添加 API 支持
set COMMANDLINE_ARGS=--listen 0.0.0.0 --api
```

---

### Step 2：批量圖片生成腳本 (30分鐘編寫 + 3-4小時運行)

#### 2.1 創建圖片生成 Python 腳本

```python
# generate_images.py
import requests
import json
import os
from pathlib import Path

# 配置
SD_API_URL = "http://127.0.0.1:7860"
PROMPTS_FILE = "AI_PROMPTS_LIBRARY.json"
OUTPUT_DIR = "public/images/words"

def generate_image(prompt, size=(800, 600)):
    """調用 Stable Diffusion 生成單張圖片"""
    payload = {
        "prompt": prompt,
        "negative_prompt": "blurry, low quality, distorted",
        "steps": 30,
        "cfg_scale": 7.5,
        "width": size[0],
        "height": size[1],
        "sampler_name": "DPM++ 2M Karras",
        "seed": -1
    }
    
    response = requests.post(
        f"{SD_API_URL}/sdapi/v1/txt2img",
        json=payload,
        timeout=120
    )
    
    if response.status_code == 200:
        result = response.json()
        return result['images'][0]  # 返回 base64 編碼的圖片
    else:
        print(f"Error: {response.status_code}")
        return None

def save_image(image_base64, filepath):
    """保存 base64 圖片"""
    import base64
    
    # 創建目錄
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # 解碼並保存
    image_data = base64.b64decode(image_base64)
    with open(filepath, 'wb') as f:
        f.write(image_data)
    print(f"✓ Saved: {filepath}")

def main():
    # 讀取 Prompts 庫
    with open(PROMPTS_FILE, 'r', encoding='utf-8') as f:
        prompts_lib = json.load(f)
    
    total = 0
    for module_key, module_data in prompts_lib.items():
        module_dir = f"{OUTPUT_DIR}/{module_key.replace('_', '/').replace('module', 'module')}"
        
        for image_type in ['intro', 'lesson2']:
            if image_type not in module_data['images']:
                continue
            
            image_info = module_data['images'][image_type]
            prompt = image_info['aiPrompt']
            size = tuple(map(int, image_info['size'].split('x')))
            
            # 生成圖片
            print(f"⏳ Generating {module_key}/{image_type}...")
            image_base64 = generate_image(prompt, size)
            
            if image_base64:
                filepath = f"{module_dir}/{image_info['filename']}"
                save_image(image_base64, filepath)
                total += 1
            
            # 進度顯示
            print(f"Progress: {total}/160 images")

if __name__ == "__main__":
    main()
```

#### 2.2 運行生成腳本
```bash
python generate_images.py
```

**預期時間：** 每張圖片 30-60 秒 × 160 張 = 1.5-4 小時

---

### Step 3：下載開源資源補充

#### 3.1 使用 Unsplash 和 Pexels API 下載補充圖片

```python
# download_opensource.py
import requests
import json
import os

# Pexels API（免費但需要 API key）
# 申請：https://www.pexels.com/api/

PEXELS_API_KEY = "YOUR_API_KEY"
SEARCH_TERMS = [
    "cute child learning",
    "colorful classroom",
    "children playing",
    "friendly characters"
]

def download_from_pexels(search_term, download_dir):
    """下載符合條件的圖片"""
    headers = {"Authorization": PEXELS_API_KEY}
    params = {"query": search_term, "per_page": 5}
    
    response = requests.get(
        "https://api.pexels.com/v1/search",
        headers=headers,
        params=params
    )
    
    if response.status_code == 200:
        photos = response.json()['photos']
        for i, photo in enumerate(photos):
            img_url = photo['src']['medium']
            img_response = requests.get(img_url)
            
            filename = f"{download_dir}/{search_term.replace(' ', '_')}_{i}.jpg"
            os.makedirs(download_dir, exist_ok=True)
            
            with open(filename, 'wb') as f:
                f.write(img_response.content)
            print(f"✓ Downloaded: {filename}")

def main():
    for term in SEARCH_TERMS:
        print(f"Searching: {term}")
        download_from_pexels(term, "public/images/words/opensource")

if __name__ == "__main__":
    main()
```

---

### Step 4：圖片尺寸統一與優化

#### 4.1 創建圖片處理腳本

```python
# optimize_images.py
from PIL import Image, ImageEnhance
import glob
import os

def resize_and_optimize(input_path, output_path, target_size=(800, 600)):
    """
    統一調整圖片尺寸和色彩
    """
    try:
        img = Image.open(input_path)
        
        # 調整尺寸（保持寬高比）
        img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # 創建新背景並填充（居中）
        new_img = Image.new('RGB', target_size, color=(255, 249, 196))
        offset = ((target_size[0] - img.width) // 2,
                  (target_size[1] - img.height) // 2)
        new_img.paste(img, offset)
        
        # 增強色彩飽和度（更鮮豔）
        enhancer = ImageEnhance.Color(new_img)
        new_img = enhancer.enhance(1.3)  # 增加 30% 飽和度
        
        # 增強對比度
        enhancer = ImageEnhance.Contrast(new_img)
        new_img = enhancer.enhance(1.1)
        
        # 保存
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        new_img.save(output_path, quality=95)
        print(f"✓ Optimized: {output_path}")
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")

def batch_process():
    """批量處理所有圖片"""
    # 處理教學圖（800x600）
    for filepath in glob.glob("public/images/words/**/intro.png", recursive=True):
        output = filepath.replace("public/images/words", "public/images/words_optimized")
        resize_and_optimize(filepath, output, (800, 600))
    
    # 處理卡片（300x300）
    for filepath in glob.glob("public/images/words/**/card.png", recursive=True):
        output = filepath.replace("public/images/words", "public/images/words_optimized")
        resize_and_optimize(filepath, output, (300, 300))

if __name__ == "__main__":
    batch_process()
```

---

## 📊 工作流程圖

```
開始
 │
 ├─ [已完成] Step 1: 建立目錄結構 ✓
 │
 ├─ [已完成] Step 2: 生成 Prompts 庫 ✓
 │
 ├─ [已完成] Step 3: 創建 Level 1, Module 1 示範 ✓
 │
 ├─ [待進行] Step 4: 選擇圖片生成方案
 │  │
 │  ├─ 方案 A: 純 SVG 自動化 (編程需求高)
 │  ├─ 方案 B: 混合方案 (推薦) ← 推薦此項
 │  └─ 方案 C: 純 AI + 人工篩選
 │
 ├─ [待進行] Step 5: 安裝並配置生成工具
 │  └─ Stable Diffusion WebUI (推薦方案 B)
 │
 ├─ [待進行] Step 6: 執行批量生成腳本
 │  ├─ AI 生成（3-4 小時）
 │  ├─ 開源下載（1 小時）
 │  └─ 圖片優化（30 分鐘）
 │
 ├─ [待進行] Step 7: 質量檢查與手工修正
 │  ├─ 視覺一致性檢查
 │  ├─ 尺寸規範檢查
 │  └─ 內容相關性檢查
 │
 └─ [待進行] Step 8: 部署到 App
    ├─ 更新 curriculum-fry-1000.json 圖片路徑
    ├─ 測試所有 40 個模塊的圖片加載
    └─ 提交 Git 並部署到 Vercel
```

---

## 🎯 快速開始（推薦方案 B）

### 第一階段：準備（30分鐘）
```bash
# 1. 安裝 Stable Diffusion
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
webui-user.bat  # Windows 或 bash webui.sh (Mac/Linux)

# 2. 等待模型下載完成（~4GB）

# 3. 訪問 http://localhost:7860 測試
```

### 第二階段：生成（3-4小時）
```bash
# 1. 複製上面的 generate_images.py 到項目根目錄
# 2. 確保 AI_PROMPTS_LIBRARY.json 存在
# 3. 運行
python generate_images.py

# 4. 咖啡 + 等待...
```

### 第三階段：優化（1小時）
```bash
# 1. 複製 optimize_images.py
# 2. 執行
python optimize_images.py

# 3. 檢查結果質量
```

---

## ✅ 質量檢查清單

### 生成完成後
- [ ] 所有 160 張圖片都存在
- [ ] 圖片尺寸正確
  - 教學圖：800×600
  - 卡片：300×300
  - 背景：800×600
- [ ] 色彩一致性
  - 無過度飽和
  - 無過度暗淡
  - 適合兒童
- [ ] 內容相關性
  - 圖片與課程概念匹配
  - 沒有不當內容
  - 清晰易懂

### App 加載測試
- [ ] 所有圖片在 App 中正確加載
- [ ] 響應式設計下正常顯示
- [ ] 沒有缺失或損壞
- [ ] 加載時間合理

---

## 💡 高級技巧

### Prompt 優化
如果生成的圖片不符合預期，調整 prompt：

```
不佳: "cute cartoon"
優化: "A cute cartoon character, bright vibrant colors, children's illustration style, professional quality, perfect for educational app, high resolution, detailed"

不佳: "book in bag"  
優化: "A colorful children's book carefully placed inside a bright backpack, warm and welcoming style, perfect for English learning app, clear and friendly"
```

### 模型選擇
- **Stable Diffusion 1.5**：速度快，效果可靠
- **DreamShaper**：卡通風格優化版
- **Chilloutmix**：角色設計優化版

**推薦使用：** DreamShaper（針對卡通風格優化）
```bash
# 在 WebUI 中下載：
# Model > Download > search "DreamShaper"
```

---

## 📞 故障排除

| 問題 | 解決方案 |
|------|---------|
| WebUI 無法訪問 | 檢查 localhost:7860，重啟 webui-user.bat |
| 圖片生成很慢 | 降低 steps（20-30），增加 batch size |
| 圖片質量差 | 更新模型，調整 CFG Scale（7-8），優化 prompt |
| 記憶體不足 | 降低圖片尺寸，使用 fp16 模式 |
| API 連接失敗 | 確認 Stable Diffusion 啟動時加入 `--api` 參數 |

---

## 🎉 下一步

1. **立即行動：** 安裝 Stable Diffusion（今天）
2. **第一批：** 生成 Level 1 的 16 張圖片（測試）
3. **全量：** 擴展到全部 160 張（下週）
4. **驗收：** 質量檢查與 App 集成（下週末）

**預期完成時間：** 1-2 週（取決於您的執行速度）

---

## 📱 當前進度

```
已完成：            ████░░░░░░░░░░░░░░░░ 20%
├─ 目錄結構 ✓
├─ Prompts 庫 ✓
└─ 示範圖片 ✓

待進行：            
├─ AI 生成 (160 張)
├─ 圖片優化 (160 張)
├─ 質量檢查
└─ App 集成
```

---

**準備好開始了嗎？下一步執行 Step 4：選擇並安裝圖片生成工具！** 🚀
