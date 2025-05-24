from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os
from dotenv import load_dotenv

def init_recommandation_api_key():
    # 初始化 OpenAI client
    load_dotenv()
    return os.getenv("OPENAI_API_KEY")

# (1) 建立 embedding 函數
def get_embedding(OPENAI_API_KEY, text):
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=[text]
        )
        return response.data[0].embedding

def recommandation(OPENAI_API_KEY, comment):
    # (2) 使用者的 AI comment
    comment_vec = get_embedding(OPENAI_API_KEY, comment)

    # (4) 計算相似度
    product_vecs = np.load("product_vecs.npy")
    similarities = cosine_similarity([comment_vec], product_vecs)[0]
    top_k = np.argsort(similarities)[::-1][:6]

    # (5) 輸出推薦結果
    for i in top_k:
        print(f"推薦商品：{i}，相似度：{similarities[i]:.2f}")


OPENAI_API_KEY = init_recommandation_api_key()
# create_product_vecs(OPENAI_API_KEY)

comment = """搭配一件淺色系牛仔外套或米色針織開衫，可以增加層次感並保持整體風格協調。灰白色運動鞋或白色帆布鞋與這套穿搭相當契合，自然輕鬆。選擇一款顏色相似的上衣，添加可愛印花或有趣字樣，以保持整體趣味性和一致的風格。考慮選擇略短的 T 恤，展示出纖細的腰線，提高視覺比例，讓整體看起來更顯高挑。"""
recommandation(OPENAI_API_KEY, comment)