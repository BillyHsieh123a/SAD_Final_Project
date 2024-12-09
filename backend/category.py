from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import psql_conn

category = Blueprint("category", __name__)

# return cloth name, price, image url, cloth_id, color
@category.route('/category_load_clothes_data', methods=['GET'])
def category_load_clothes_data():
    cur = psql_conn.cursor()

    cur.execute(
        '''
        WITH RankedClothes AS (
            SELECT *,
                ROW_NUMBER() OVER (PARTITION BY clothes_id ORDER BY clothes_id ASC) AS row_num
            FROM 
                clothes_color
        )
        SELECT cl.clothes_id, cl.name, cl.part, cl.gender, cl.price, cl.description, rc.color, i.path
        FROM clothes AS cl
        JOIN RankedClothes AS rc ON cl.clothes_id = rc.clothes_id
        JOIN image AS i ON rc.image_filename = i.filename
        WHERE rc.row_num = 1;
        '''
    )

    all_clothes_images = cur.fetchall()
    updated_all_clothes_image = []
    for cloth in all_clothes_images:
        new_cloth = list(cloth)
        new_cloth[7] = url_for("static", '/image/' + cloth[7])
        updated_all_clothes_image.append(new_cloth)

    psql_conn.commit()
    return jsonify({"clothes_id": updated_all_clothes_image[0], 
                    "name": updated_all_clothes_image[1], 
                    "part": updated_all_clothes_image[2], 
                    "gender": updated_all_clothes_image[3], 
                    "price": updated_all_clothes_image[4], 
                    "description": updated_all_clothes_image[5], 
                    "color": updated_all_clothes_image[6], 
                    "img": updated_all_clothes_image[7]
                    }), 200

