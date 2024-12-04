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
            SELECT 
                *,
                ROW_NUMBER() OVER (PARTITION BY clothes_id ORDER BY clothes_id ASC) AS row_num
            FROM 
                clothes_color
        )
        SELECT c.clothes_id, c.name, c.part, c.gender, c.price, c.description, rc.color, i.filepath
        FROM clothes AS c
        JOIN RankedClothes AS rc ON c.clothes_id = rc.clothes_id
        JOIN image AS i ON rc.image_filename = i.filename
        WHERE rc.row_num = 1;
        '''
    )

    all_clothes_images = cur.fetchall()
    updated_all_clothes_image = []
    for cloth in all_clothes_images:
        new_cloth = list(cloth)
        new_cloth[7] = url_for("static", '/image' + cloth[7])
        updated_all_clothes_image.append(new_cloth)

    return updated_all_clothes_image

