import psycopg2
import os
from dotenv import dotenv_values, load_dotenv
from pathlib import Path

# global psql connection instance
psql_conn = None


def init_db_conn():
    # Use load_dotenv to set variables in environment
    load_dotenv()

    DB_USER_NAME     = os.getenv('DB_USER_NAME')
    DB_USER_PASSWORD = os.getenv('DB_USER_PASSWORD')
    DB_ADDRESS       = os.getenv('DB_ADDRESS')
    DB_NAME          = os.getenv('DB_NAME')
    
    psql_conn = psycopg2.connect(
        dbname = DB_NAME,
        user = DB_USER_NAME,
        host = DB_ADDRESS,
        password = DB_USER_PASSWORD
    )