from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import get_psql_conn

checkout = Blueprint("checkout", __name__)

# return cloth name, price, image url, cloth_id, color
@checkout.route('/checkout_load_bag', methods=['GET'])
def checkout_load_bag():
    psql_conn = get_psql_conn()
    if psql_conn is not None:
        cur = psql_conn.cursor()
    else:
        print("Failed to connect to the database.")

    user_id = request.args.get('user_id')

    cur.execute(
        '''
        SELECT cl.clothes_id, cl.name, cl.part, cl.gender, cl.price, cl.description, cc.color, bag.size, i.path, bag.purchase_qty
        FROM clothes AS cl
        JOIN clothes_color AS cc ON cl.clothes_id = cc.clothes_id
        JOIN image AS i ON cc.image_filename = i.filename
        JOIN bag ON cc.clothes_id = bag.clothes_id AND cc.color = bag.color
        WHERE bag.user_id = %s
        ''',
        (user_id,)
    )

    all_clothes_in_bag_data = cur.fetchall()
    update_all_clothes_in_bag_data = []
    for cloth in all_clothes_in_bag_data:
        new_cloth = {
            "clothes_id": cloth[0], 
                    "name": cloth[1], 
                    "part": cloth[2], 
                    "gender": cloth[3], 
                    "price": cloth[4], 
                    "description": cloth[5], 
                    "color": cloth[6], 
                    "size": cloth[7], 
                    "img": cloth[8], 
                    "purchase_qty": cloth[9]
        }
        update_all_clothes_in_bag_data.append(new_cloth)
    # print(update_all_clothes_in_bag_data)
    psql_conn.commit()
    return jsonify(update_all_clothes_in_bag_data), 200

@checkout.route('/checkout_', methods=['POST'])
def checkout_():
    psql_conn = get_psql_conn()
    if psql_conn is not None:
        cur = psql_conn.cursor()
    else:
        print("Failed to connect to the database.")

    data = request.json
    user_id = data.get('user_id')
    sub_total = data.get('sub_total')
    shipping_fee = data.get('shipping_fee')
    payment_type = data.get('payment_type')
    address = data.get('address')
    order_date = data.get('order_date')
    ideal_rcv_date =data.get('ideal_rcv_date')

    # add the order into "order", assume order_id will add by dbms
    cur.execute(
        """
        INSERT INTO public."order" (user_id, sub_total, shipping_fee, payment_type, address, order_date, ideal_rcv_date)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING order_id
        """,
        (user_id, sub_total, shipping_fee, payment_type, address, order_date, ideal_rcv_date)
    )
    order_id = cur.fetchone()[0]

    # get items in "bag" and add them into "order_contains", then delete them from "bag"
    cur.execute(
        """
        WITH moved_data AS (
            SELECT bag.clothes_id, bag.color, bag.size, bag.purchase_qty
            FROM bag
            WHERE bag.user_id = %s
        )
        INSERT INTO public."order_contains" (order_id, clothes_id, color, size, purchase_qty)
        SELECT %s, clothes_id, color, size, purchase_qty
        FROM moved_data;

        DELETE FROM bag
        WHERE user_id = %s;
        """,
        (user_id, order_id, user_id)
    )


    psql_conn.commit()
    return jsonify({"message": "successfully bought items!!!"})