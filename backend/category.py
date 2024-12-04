from flask import Blueprint, jsonify, request, session, render_template
from db import psql_conn


category = Blueprint("category", __name__)