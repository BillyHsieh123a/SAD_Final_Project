from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import get_psql_conn

favorite = Blueprint("favorite", __name__, url_prefix="/api/favorite")

# return cloth name, price, image url, cloth_id, color
@favorite.get('/allitem')#'/favorite_load_favorite_clothes'
def favorite_load_favorite_clothes():
    psql_conn = get_psql_conn()
    if psql_conn is not None:
        cur = psql_conn.cursor()
    else:
        print("Failed to connect to the database.")
        return jsonify({"error": "DB connection failed"}), 500

    user_id = request.args.get('user_id')

    try:
        cur.execute(
            '''
            SELECT f.clothes_id, cl.name, cl.price, i.path, f.color, cl.part
            FROM favorite AS f
            JOIN clothes_color AS cc ON f.clothes_id = cc.clothes_id AND f.color = cc.color
            JOIN image AS i ON cc.image_filename = i.filename
            JOIN clothes AS cl ON f.clothes_id = cl.clothes_id
            WHERE f.user_id = %s
            ''',
            (user_id,)
        )

        all_clothes_favorite = cur.fetchall()
        update_all_clothes_favorite = []
        for cloth in all_clothes_favorite:
            new_cloth = {
                "id": cloth[0],
                "name": cloth[1],
                "price": cloth[2],
                "img": url_for("static", filename='images/' + cloth[3]),
                "color": cloth[4],
                "part": cloth[5]  # ✅ 加上這一行
            }
            update_all_clothes_favorite.append(new_cloth)

        psql_conn.commit()
        return jsonify(update_all_clothes_favorite), 200

    except Exception as e:
        psql_conn.rollback()
        print("An error occurred. Transaction rolled back.")
        print("Error details:", e)
        return jsonify({"error": str(e)}), 500



@favorite.delete('/item')#/favorite_delete_item
def favorite_delete_item():
    psql_conn = get_psql_conn()
    if psql_conn is not None:
        cur = psql_conn.cursor()
    else:
        print("Failed to connect to the database.")

    data = request.json
    user_id = data.get('user_id')
    clothes_id = data.get('clothes_id')
    color = data.get('color')

    try:
        cur.execute(
            '''
            DELETE FROM favorite 
            WHERE user_id = %s AND clothes_id = %s AND color = %s;
            ''',
            (user_id, clothes_id, color)
        )

        psql_conn.commit()
        return jsonify({"message": "successfully deleted!"}), 200
    except Exception as e:
        psql_conn.rollback()
        print("An error occurred. Transaction rolled back.")
        print("Error details:", e)
        return jsonify({"error": str(e)}), 500

# not finished
@favorite.route('/favorite_add_item_to_bag', methods=['POST'])
def favorite_add_item_to_bag():
    psql_conn = get_psql_conn()
    if psql_conn is not None:
        cur = psql_conn.cursor()
    else:
        print("Failed to connect to the database.")

    data = request.json
    user_id = data.get('user_id')
    clothes_id = data.get('clothes_id')
    color = data.get('color')
    size = data.get('size')
    quantity = data.get('quantity')

    try:
        cur.execute(
            '''
            INSERT INTO bag (user_id, clothes_id, color, size, purchase_qty)
            VALUES (%s, %s, %s, %s, %s) 
            ''',
            (user_id, clothes_id, color, size, quantity)
        )

        psql_conn.commit()
        return jsonify({"message": "successfully deleted!"}), 200
    except Exception as e:
        psql_conn.rollback()
        print("An error occurred. Transaction rolled back.")
        print("Error details:", e)
        return jsonify({"error": str(e)}), 500