import requests
from pathlib import Path
import os
from dotenv import load_dotenv
import time

load_dotenv()
API_KEY = os.getenv("FITROOM_API_KEY")
AVATAR_PATH = Path("avatar.jpg")
GARMENT_PATH = Path("strpshirt_white.jpg")

# def avatar_check(image_path, api_key):
#     url = "https://platform.fitroom.app/api/tryon/input_check/v1/model"
#     headers = {
#         "X-API-KEY": api_key
#     }

#     with image_path.open("rb") as img_file:
#         files = {
#             "input_image": img_file
#         }
#         res = requests.post(url, headers=headers, files=files)

#     print("Status Code:", res.status_code)
#     try:
#         print("Response JSON:", res.json())
#     except Exception:
#         print("Response Text:", res.text)

# # 執行檢查
# avatar_check(AVATAR_PATH, API_KEY)

# def clothes_check(image_path, api_key):
#     url = "https://platform.fitroom.app/api/tryon/input_check/v1/clothes"
#     headers = {
#         "X-API-KEY": api_key
#     }

#     with image_path.open("rb") as img_file:
#         files = {
#             "input_image": img_file
#         }
#         res = requests.post(url, headers=headers, files=files)

#     print("Status Code:", res.status_code)
#     try:
#         print("Response JSON:", res.json())
#     except Exception:
#         print("Response Text:", res.text)

# # 執行衣服圖片檢查
# clothes_check(GARMENT_PATH, API_KEY)

def poll_tryon_result(task_id, api_key, poll_interval=2, max_retries=10):
    url = f"https://platform.fitroom.app/api/tryon/v2/tasks/{task_id}"
    headers = {
        "X-API-KEY": api_key
    }

    for attempt in range(max_retries):
        res = requests.get(url, headers=headers)
        print(f"[Try {attempt+1}] Status Code:", res.status_code)

        if res.status_code == 200:
            data = res.json()
            status = data.get("status", "")
            progress = data.get("progress", "")
            print("Current status:", status)
            print("Progress:", progress)

            if status == "COMPLETED" and "download_signed_url" in data:
                image_url = data["download_signed_url"]
                print("✅ Download URL:", image_url)

                # 下載圖片
                img_data = requests.get(image_url).content
                output_path = Path("tryon_result_v2.jpg")
                with open(output_path, "wb") as f:
                    f.write(img_data)

                print(f"✅ Image saved to: {output_path.resolve()}")
                return

            elif status in ("FAILED", "CANCELLED"):
                print("❌ Task failed or was cancelled.")
                return

        else:
            print("❌ Unexpected response:", res.text)

        time.sleep(poll_interval)

    print("❌ Gave up polling after retries.")

# ✅ 執行輪詢與下載
# poll_tryon_result(task_id=TASK_ID, api_key=API_KEY)

def create_tryon_task_v2(cloth_path, model_path, cloth_type, api_key, waittime_to_poll=12):
    url = "https://platform.fitroom.app/api/tryon/v2/tasks"
    headers = {
        "X-API-KEY": api_key
    }

    with cloth_path.open("rb") as cloth_img, model_path.open("rb") as model_img:
        files = {
            "cloth_image": cloth_img,
            "model_image": model_img
        }
        data = {
            "cloth_type": cloth_type  # upper / lower / full
        }

        res = requests.post(url, headers=headers, files=files, data=data)

    print("Status Code:", res.status_code)
    try:
        response_json = res.json()
        print("Response JSON:", response_json)
        TASK_ID = response_json["task_id"]
        time.sleep(waittime_to_poll)
        poll_tryon_result(task_id=TASK_ID, api_key=api_key)

    except Exception as e:
        print("❌ Failed to parse response:", e)
        print("Raw response:", res.text)

# ✅ 呼叫範例
create_tryon_task_v2(
    cloth_path=GARMENT_PATH,
    model_path=AVATAR_PATH,
    cloth_type="upper",
    api_key=API_KEY
)