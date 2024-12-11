import os
from flask import Flask, render_template, session, redirect
from db import init_db_conn

from category import category
from item import item
from login import login
from try_on import try_on

# Global Flask app (SUBJECT TO CHANGE)
app = Flask(__name__, template_folder="../frontend/html", static_folder="../frontend/assets")
app.register_blueprint(category)
# app.register_blueprint(item)
# app.register_blueprint(login)
# app.register_blueprint(try_on)


# Initialize the app and connect to the database.
def init_app():
    init_db_conn()
    app.secret_key = os.urandom(32)  # session key


# index html
@app.route('/')
def index():
    if session.get("login"):
        return redirect("/category")
    else:
        return redirect("/login")  # redirect to login page if not logged in


if __name__ == '__main__':
    init_app()
    app.run()