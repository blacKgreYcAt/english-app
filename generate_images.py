#!/usr/bin/env python3
"""
🎨 FRY 1000 - Stable Diffusion 批量圖片生成腳本

使用方式：
1. 確保 Stable Diffusion WebUI 已啟動（http://localhost:7860）
2. 運行: python generate_images.py
3. 等待完成

配置：
- 修改 CONFIG 中的參數調整生成設置
- 生成的圖片會保存到 public/images/words/
"""

import requests
import json
import os
import time
import base64
from pathlib import Path
from typing import Dict, Optional, Tuple

# ============= 配置 =============
CONFIG = {
    "SD_API_URL": "http://127.0.0.1:7860",
    "PROMPTS_FILE": "AI_PROMPTS_LIBRARY.json",
    "OUTPUT_DIR": "public/images/words",
    "STEPS": 30,  # 增加到 40 獲得更高質量
    "CFG_SCALE": 7.5,
    "SAMPLER": "DPM++ 2M Karras",
    "SEED": -1,  # -1 = 隨機
    "TIMEOUT": 120,
    "RETRY_TIMES": 3,
}

# 開始生成的模塊（用於測試：修改為特定模塊）
START_MODULE = "level1_module1"  # 修改此值可跳過早期模塊
LIMIT_MODULES = None  # None = 全部，設置數字限制模塊數

# ============= 日誌 =============
class Logger:
    def __init__(self):
        self.total = 0
        self.success = 0
        self.failed = 0
        self.start_time = time.time()

    def info(self, msg):
        print(f"ℹ️  {msg}")

    def success(self, msg):
        print(f"✅ {msg}")
        self.success += 1
        self.total += 1

    def error(self, msg):
        print(f"❌ {msg}")
        self.failed += 1
        self.total += 1

    def progress(self, current, total):
        elapsed = time.time() - self.start_time
        rate = current / elapsed if elapsed > 0 else 0
        remaining = (total - current) / rate if rate > 0 else 0

        percent = (current / total) * 100
        print(f"⏳ Progress: [{current}/{total}] {percent:.1f}% - "
              f"Elapsed: {int(elapsed)}s, ETA: {int(remaining)}s")

    def summary(self):
        elapsed = time.time() - self.start_time
        print("\n" + "="*60)
        print(f"📊 生成完成統計:")
        print(f"   成功: {self.success}")
        print(f"   失敗: {self.failed}")
        print(f"   總數: {self.total}")
        print(f"   耗時: {int(elapsed/60)}分 {int(elapsed%60)}秒")
        if self.total > 0:
            success_rate = (self.success / self.total) * 100
            print(f"   成功率: {success_rate:.1f}%")
        print("="*60 + "\n")

logger = Logger()

# ============= 核心函數 =============

def check_sd_connection() -> bool:
    """檢查 Stable Diffusion 連接"""
    try:
        response = requests.get(
            f"{CONFIG['SD_API_URL']}/info",
            timeout=5
        )
        return response.status_code == 200
    except:
        return False

def generate_image(
    prompt: str,
    size: Tuple[int, int] = (800, 600),
    retry: int = 0
) -> Optional[str]:
    """
    調用 Stable Diffusion API 生成圖片

    Returns:
        base64 編碼的圖片字符串，失敗返回 None
    """
    if retry > CONFIG['RETRY_TIMES']:
        return None

    try:
        payload = {
            "prompt": prompt,
            "negative_prompt": "blurry, low quality, distorted, ugly, bad anatomy",
            "steps": CONFIG['STEPS'],
            "cfg_scale": CONFIG['CFG_SCALE'],
            "width": size[0],
            "height": size[1],
            "sampler_name": CONFIG['SAMPLER'],
            "seed": CONFIG['SEED']
        }

        response = requests.post(
            f"{CONFIG['SD_API_URL']}/sdapi/v1/txt2img",
            json=payload,
            timeout=CONFIG['TIMEOUT']
        )

        if response.status_code == 200:
            result = response.json()
            return result['images'][0]  # 返回第一張圖片
        else:
            logger.error(f"API 返回錯誤: {response.status_code}")
            if retry < CONFIG['RETRY_TIMES']:
                logger.info(f"重試 ({retry+1}/{CONFIG['RETRY_TIMES']})...")
                time.sleep(5)
                return generate_image(prompt, size, retry + 1)
            return None

    except requests.Timeout:
        logger.error("生成超時，重試...")
        if retry < CONFIG['RETRY_TIMES']:
            time.sleep(10)
            return generate_image(prompt, size, retry + 1)
        return None
    except Exception as e:
        logger.error(f"生成錯誤: {str(e)}")
        return None

def save_image(image_base64: str, filepath: str) -> bool:
    """保存 base64 圖片到文件"""
    try:
        # 創建目錄
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        # 解碼並保存
        image_data = base64.b64decode(image_base64)
        with open(filepath, 'wb') as f:
            f.write(image_data)

        return True
    except Exception as e:
        logger.error(f"保存失敗 {filepath}: {str(e)}")
        return False

def load_prompts_library() -> Dict:
    """載入 Prompts 庫"""
    try:
        with open(CONFIG['PROMPTS_FILE'], 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"未找到 {CONFIG['PROMPTS_FILE']}")
        return {}
    except json.JSONDecodeError:
        logger.error(f"{CONFIG['PROMPTS_FILE']} JSON 格式錯誤")
        return {}

def process_modules(prompts_lib: Dict) -> None:
    """處理所有模塊和圖片"""
    module_keys = list(prompts_lib.keys())

    # 如果設置了起始模塊，從該模塊開始
    if START_MODULE in module_keys:
        start_idx = module_keys.index(START_MODULE)
        module_keys = module_keys[start_idx:]

    # 限制模塊數（用於測試）
    if LIMIT_MODULES:
        module_keys = module_keys[:LIMIT_MODULES]

    total_images = len(module_keys) * 4  # 4 張圖片 per 模塊

    logger.info(f"開始生成 {len(module_keys)} 個模塊的 {total_images} 張圖片")
    logger.info(f"將保存到: {CONFIG['OUTPUT_DIR']}")
    print()

    image_count = 0

    for module_key in module_keys:
        module_data = prompts_lib[module_key]

        # 提取 level 和 module 號碼
        parts = module_key.split('_')
        level = parts[0]  # e.g., "level1"
        module = parts[1]  # e.g., "module1"

        module_dir = os.path.join(
            CONFIG['OUTPUT_DIR'],
            level,
            module
        )

        logger.info(f"\n處理: {module_key} - {module_data['moduleTitle']}")

        # 生成每種圖片（intro, lesson2）
        for image_type in ['intro', 'lesson2']:
            if image_type not in module_data['images']:
                continue

            image_info = module_data['images'][image_type]
            prompt = image_info['aiPrompt']
            size = tuple(map(int, image_info['size'].split('x')))
            filename = image_info['filename']

            # 生成圖片
            logger.info(f"  生成: {filename} ({size[0]}x{size[1]})")
            image_base64 = generate_image(prompt, size)

            if image_base64:
                filepath = os.path.join(module_dir, filename)
                if save_image(image_base64, filepath):
                    logger.success(f"  已保存: {filepath}")
                else:
                    logger.error(f"  保存失敗: {filepath}")
            else:
                logger.error(f"  生成失敗: {filename}")

            image_count += 1
            logger.progress(image_count, total_images)

    logger.summary()

# ============= 主程序 =============

def main():
    print("\n" + "="*60)
    print("🎨 FRY 1000 - Stable Diffusion 圖片生成工具")
    print("="*60 + "\n")

    # 1. 檢查 SD 連接
    logger.info("檢查 Stable Diffusion 連接...")
    if not check_sd_connection():
        logger.error("無法連接到 Stable Diffusion")
        logger.info(f"請確認 Stable Diffusion 在 {CONFIG['SD_API_URL']} 運行")
        logger.info("運行命令: webui-user.bat 或 bash webui.sh")
        return
    logger.success("Stable Diffusion 連接成功")

    # 2. 加載 Prompts 庫
    logger.info("\n載入 Prompts 庫...")
    prompts_lib = load_prompts_library()
    if not prompts_lib:
        logger.error("無法載入 Prompts 庫")
        return
    logger.success(f"載入成功: {len(prompts_lib)} 個模塊")

    # 3. 顯示配置
    print("\n配置信息:")
    print(f"  Stable Diffusion: {CONFIG['SD_API_URL']}")
    print(f"  生成步數: {CONFIG['STEPS']}")
    print(f"  CFG Scale: {CONFIG['CFG_SCALE']}")
    print(f"  採樣器: {CONFIG['SAMPLER']}")
    print(f"  輸出目錄: {CONFIG['OUTPUT_DIR']}")

    # 4. 開始生成
    print("\n" + "-"*60)
    input("按 Enter 開始生成圖片...")
    print("-"*60 + "\n")

    process_modules(prompts_lib)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  用戶中止")
        logger.summary()
    except Exception as e:
        print(f"\n❌ 未預期的錯誤: {str(e)}")
        import traceback
        traceback.print_exc()
