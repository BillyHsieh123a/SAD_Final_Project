from flask import Blueprint, jsonify, request, session, render_template
from db import psql_conn


login = Blueprint("login", __name__)

@login.route('/login', methods = 'POST')
def handle_login():
    if request.method == 'POST':
        # check email or phone
        accountInput = request.form.get('email')
        password = request.form.get('password')
        cmd = """"""

        # phone num
        if accountInput.isdigit():
            cmd = """
            select user.phone, user.email, user.password
            from public.user
            where user.phone = %s and user.password = %s
            """

        else:
            cmd = """
            select user.phone, user.email, user.password
            from public.user
            where user.email = %s and user.password = %s
            """

    psql_conn.execute(cmd, [accountInput, password])

    rows = psql_conn.fetchall()
    
    # get no user
    if len(rows) == 0:
        return jsonify(0)
    else:
        return jsonify(1)
    
