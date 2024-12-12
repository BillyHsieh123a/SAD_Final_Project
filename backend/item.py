from flask import Blueprint, jsonify, request, session, render_template
from db import get_psql_conn


item = Blueprint("item", __name__)


@item.post('/add-to-bag')
def add_item_to_bag():
    # check email or phone
    user_id = session.get("user_id")
    clothes_id = request.json['clothes_id']
    color = request.json['color']
    size = request.json['size']
    
    try:
        cur = get_psql_conn().cursor()
        cur.execute("""
            INSERT INTO BAG
            VALUES(%s, %s, %s, %s)
        """, [user_id, clothes_id, color, size])
        get_psql_conn().commit()
        
        return 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@item.post('/add-to-favorite')
def add_item_to_favorite():
    # check email or phone
    user_id = session.get("user_id")
    clothes_id = request.json['clothes_id']
    color = request.json['color']
    
    try:
        cur = get_psql_conn().cursor()
        cur.execute("""
            INSERT INTO FAVORTIE
            VALUES(%s, %s, %s)
        """, [user_id, clothes_id, color])
        get_psql_conn().commit()
        
        return 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
    
@item.get('/change-clothes-image')
def get_clothes_color_image():
    clothes_id = session.get("clothes_id")
    color = request.json['color']
    
    try:
        cur = get_psql_conn().cursor()
        cur.execute("""
            SELECT image_filename
            FROM CLOTHES_COLOR
            WHERE clothes_id = %s AND color = %s
        """, [clothes_id, color])
        get_psql_conn().commit()
        
        image_src = cur.fetchone()[0]
        return jsonify({"image_src": image_src}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    