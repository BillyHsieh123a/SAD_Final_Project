from flask import Blueprint, jsonify, request, session, render_template, url_for
from db import psql_conn

user_details = Blueprint("user_details", __name__)

# return cloth name, price, image url, cloth_id, color
@user_details.route('/user_details_load_user_data', methods=['GET'])
def user_details_load_user_data():
    cur = psql_conn.cursor()
    user_id = request.args.get('user_id')

    cur.execute(
        '''
        SELECT u.fname, u.lname, i.path, u.phone, u.email, u.bdate, u.gender, ui.upload_date
        FROM user_image AS ui
        JOIN "user" AS u ON ui.user_id = u.user_id
        JOIN image AS i ON ui.image_filename = i.filename
        WHERE ui.user_id = %s
        ORDER BY ui.upload_date DESC
        LIMIT 1;
        ''',
        (user_id)
    )

    user_data = cur.fetchone()
    new_user_data = list(user_data)
    new_user_data[2] = url_for("static", '/image/' + user_data[2])

    psql_conn.commit()
    return jsonify({
        "fname": new_user_data[0],
        "lname": new_user_data[1], 
        "img": new_user_data[2],
        "phone": new_user_data[3],
        "email": new_user_data[4],
        "bir": new_user_data[5],
        "gender": new_user_data[6]
    }), 200

@user_details.route('/user_details_change_user_data', methods=['POST'])
def user_details_change_user_data():
    cur = psql_conn.cursor()

    data = request.json
    user_id = data.get('user_id')
    fname = data.get('fname')
    lname = data.get('lname')
    phone = data.get('phone')
    email = data.get('email')
    bir = data.get('bir')
    gender = data.get('gender')

    cur.execute(
        """
        UPDATE public."user"
        SET fname = %s, lname = %s, phone = %s, email = %s, bir = %s, gender = %s
        WHERE user_id = %s
        """,
        (fname, lname, phone, email, bir, gender, user_id)
    )

    return {"message": "successfully changed data!!!!"}
