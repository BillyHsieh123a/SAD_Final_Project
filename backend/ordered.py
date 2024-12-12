from flask import Blueprint, jsonify, request
from db import get_psql_conn

ordered = Blueprint("ordered", __name__)
# 定義一個查詢訂單資料的路由
@ordered.route('/ordered', methods=['GET'])
def get_order():
    # 獲取查詢參數中的 ordered_id
    ordered_id = request.args.get('ordered_id')
    
    if not ordered_id:
        return jsonify({"error": "Missing ordered_id"}), 400

    try:
        # 建立與資料庫的連接
        conn = get_psql_conn()
        cursor = conn.cursor()

        # 查詢訂單資料
        query = """
            SELECT o.order_id, o.order_date, o.address, o.sub_total, o.shipping_fee
            FROM "order" as o
            WHERE o.order_id = %s
        """
        cursor.execute(query, (ordered_id,))
        result = cursor.fetchone()
        # 關閉資料庫連接
        cursor.close()
        conn.close()

        # 如果找不到訂單
        if not result:
            return jsonify({"error": "Order not found"}), 404

        # 返回訂單資料
        order_data = {
            "order_id": result[0],
            "sub_total": float(result[1]),
            "shipping_fee": float(result[2]),
            "address": result[3],
            "order_date": result[4].strftime("%Y-%m-%d")  # 格式化日期
        }
        return jsonify(order_data)

    except Exception as e:
        # 處理其他錯誤
        return jsonify({"error": str(e)}), 500
