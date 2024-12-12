from flask import Blueprint, jsonify, request
from db import get_psql_conn

ordered = Blueprint("ordered", __name__)

# 定義一個查詢訂單資料的路由
@ordered.route('/ordered_', methods=['GET'])
def get_order():
    print("LLLLLL")
    ordered_id = request.args.get('ordered_id')

    if not ordered_id:
        return jsonify({"error": "Missing ordered_id"}), 400

    try:
        conn = get_psql_conn()
        cursor = conn.cursor()

        query = """
            SELECT o.order_id,  o.address, o.sub_total, o.shipping_fee
            FROM public."order" as o
            WHERE o.order_id = %s
        """
        cursor.execute(query, (ordered_id,))
        result = cursor.fetchone()

        print(f"Query result: {result}")  # 打印查詢結果

        conn.commit()
        cursor.close()

        if not result:
            return jsonify({"error": "Order not found"}), 404

        # 確認 result[1] (order_date) 的類型

        order_data = {
            "order_id": result[0],
            "sub_total": float(result[3]),
            "shipping_fee": float(result[4]),
            "address": result[2],
      
        }

        print(f"Order data: {order_data}")  # 確保這行能打印

        return jsonify(order_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
