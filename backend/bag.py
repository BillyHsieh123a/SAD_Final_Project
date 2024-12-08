from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import psql_conn

bag = Blueprint("bag", __name__)

# return cloth name, price, image url, cloth_id, color
@bag.route('/bag_load_bag', methods=['GET'])
def bag_load_bag():
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
        new_cloth[8] = url_for("static", '/image/' + cloth[8])
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

@bag.route('/bag_delete_item', methods=['POST'])
def bag_delete_item():
    cur = psql_conn.cursor()

    data = request.json
    user_id = data.get('user_id')
    clothes_id = data.get('clothes_id')
    color = data.get('color')
    size = data.get('size')

    cur.execute(
        '''
        DELETE FROM bag 
        WHERE user_id = %s AND clothes_id = %s AND color = %s AND "size" = %s;
        ''',
        (user_id, clothes_id, color, size)
    )

    psql_conn.commit()
    return jsonify({"message": "successfully deleted!"}), 200