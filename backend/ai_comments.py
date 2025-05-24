from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一位專業時尚顧問。"},
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://shoplineimg.com/5f4760ee70e52e003f4199b5/657bfa1a28b4fe001af779e3/800x.jpg"
                    }
                },
                {
                    "type": "text",
                    "text": "請根據這張穿搭照給出購買建議與穿搭評價，包括整體評價、推薦與否、搭配建議與推薦相似商品。顧客年齡約 25 歲，女性，身高 160 公分。"
                }
            ]
        }
    ]
)

print(response.choices[0].message.content)
