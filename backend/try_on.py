from flask import Blueprint, jsonify, request, session, render_template
from db import psql_conn


try_on = Blueprint("try_on", __name__)