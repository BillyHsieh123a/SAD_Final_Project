from openai import OpenAI
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def get_embedding(OPENAI_API_KEY, text):
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=[text]
        )
        return response.data[0].embedding

product_vecs = []
product_texts = [
    "高腰直筒剪裁，深藍色牛仔褲，修飾腿型",
    "白色短袖棉T，透氣舒適，適合日常穿搭",
    "米色針織背心，寬鬆剪裁，適合層次搭配",
    "黑色小香風外套，短版設計，精緻金色扣飾",
    "杏色寬褲，落地剪裁，垂墜感佳",
    "V領細肩洋裝，酒紅色，腰身修飾設計",
    "灰色連帽衛衣，寬鬆版型，運動休閒風",
    "淺藍色牛仔短裙，高腰剪裁，A字版型",
    "卡其色風衣外套，中長版設計，防潑水材質",
    "粉橘色襯衫，雪紡材質，微微透膚"
]
def create_product_vecs(OPENAI_API_KEY):
    global product_vecs
    global product_texts
    # (3) 商品資料（你應該預先把所有商品 embedding 存好）
    product_vecs = [get_embedding(OPENAI_API_KEY, text) for text in product_texts]
    np.save("product_vecs.npy", np.array(product_vecs))

create_product_vecs(OPENAI_API_KEY)