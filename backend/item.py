from flask import Blueprint, jsonify, request, session, render_template
from db import get_psql_conn


item = Blueprint("item", __name__)


@item.post('/add-to-bag')
def add_item_to_bag():
    user_id = session.get("user_id")
    clothes_id = request.json['clothes_id']
    color = request.json['color']
    size = request.json['size']
    quantity = request.json['quantity']
    
    try:
        cur = get_psql_conn().cursor()
        cur.execute("""
            SELECT user_id
            FROM BAG
            WHERE user_id = %s AND clothes_id = %s AND color = %s AND size = %s
            FOR UPDATE
        """, [user_id, clothes_id, color, size])
        if len(cur.fetchall()):  # duplicate BAG entry
            get_psql_conn().rollback()
            return jsonify({"success": -1}), 200
        
        cur.execute("""
            INSERT INTO BAG
            VALUES(%s, %s, %s, %s, %s)
        """, [user_id, clothes_id, color, size, quantity])
        get_psql_conn().commit()
    
        return jsonify({"success": -1}), 200
    except Exception as e:
        get_psql_conn().rollback()
        return jsonify({"error": str(e)}), 500
    

@item.post('/add-to-favorite')
def add_item_to_favorite():
    user_id = session.get("user_id")
    clothes_id = request.json['clothes_id']
    color = request.json['color']
    print(color)
    
    #try:
    cur = get_psql_conn().cursor()
    cur.execute("""
        SELECT user_id
        FROM FAVORITE
        WHERE user_id = %s AND clothes_id = %s AND color = %s
        FOR UPDATE
    """, [user_id, clothes_id, color])
    if len(cur.fetchall()):  # duplicate FAVORITE entry
        get_psql_conn().rollback()
        return jsonify({"success": -1}), 200
    
    cur.execute("""
        INSERT INTO FAVORITE
        VALUES(%s, %s, %s)
    """, [user_id, clothes_id, color])
    get_psql_conn().commit()
    
    return jsonify({"success": 0}), 200
#except Exception as e:
    #get_psql_conn().rollback()
    #return jsonify({"error": str(e)}), 500
   
    
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
        get_psql_conn().rollback()
        return jsonify({"error": str(e)}), 500
    