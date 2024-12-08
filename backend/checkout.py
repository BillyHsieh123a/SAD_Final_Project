from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import psql_conn

checkout = Blueprint("bag", __name__)

# return cloth name, price, image url, cloth_id, color
@checkout.route('/checkout_load_bag', methods=['GET'])
def checkout_load_bag():
    cur = psql_conn.cursor()
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
        new_cloth = list(cloth)
        new_cloth[8] = url_for("static", '/image/' + cloth[7])
        update_all_clothes_in_bag_data.append(new_cloth)

    psql_conn.commit()
    return jsonify({"clothes_id": update_all_clothes_in_bag_data[0], 
                    "name": update_all_clothes_in_bag_data[1], 
                    "part": update_all_clothes_in_bag_data[2], 
                    "gender": update_all_clothes_in_bag_data[3], 
                    "price": update_all_clothes_in_bag_data[4], 
                    "description": update_all_clothes_in_bag_data[5], 
                    "color": update_all_clothes_in_bag_data[6], 
                    "size": update_all_clothes_in_bag_data[7], 
                    "img": update_all_clothes_in_bag_data[8], 
                    "purchase_qty": update_all_clothes_in_bag_data[9]
                    }), 200

@checkout.route('/checkout_', methods=['POST'])
def checkout_():
    cur = psql_conn.cursor()

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
        INSERT INTO public."user" (user_id, sub_total, shipping_fee, payment_type, address, order_date, ideal_rcv_date)
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