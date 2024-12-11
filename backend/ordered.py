from flask import Blueprint, jsonify, request
from db import get_psql_conn

ordered = Blueprint("ordered", __name__)

# Return cloth name, price, image url, cloth_id, color
@ordered.route('/ordered', methods=['GET'])
def fetchOrderData():
    # Get PostgreSQL connection
    psql_conn = get_psql_conn()
    if psql_conn is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    try:
        cur = psql_conn.cursor()

        # Get the ordered_id from query parameters
        ordered_id = request.args.get('ordered_id')
        if not ordered_id:
            return jsonify({"error": "ordered_id is required"}), 400

        # Execute the query
        cur.execute(
            '''
            SELECT o.order_id, o.order_date, o.address, o.sub_total, o."shipping fee"
            FROM orders o
            WHERE o.order_id = %s
            ''',
            (ordered_id,)
        )

        # Fetch the result
        order = cur.fetchone()
        print(order)  # Print the order details to the console (for debugging)
        if not order:
            return jsonify({"error": "Order not found"}), 404

        # Format the response
        order_data = {
            "order_id": order[0],
            "order_date": order[1],
            "address": order[2],
            "sub_total": order[3],
            "shipping_fee": order[4]
        }

        return jsonify(order_data), 200

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

    finally:
        # Ensure the cursor and connection are closed
        if cur:
            cur.close()
        if psql_conn:
            psql_conn.close()
