from flask import Flask
from flask import request, render_template, send_from_directory
import json
import psycopg2
from db.sql_requests import *

# db = "database=%s host=%s " % ("bank", "postgres", "postgres", "localhost")
# schema = "schema.sql"
db = "dbname=%s user=%s password=%s host=%s " % ("friends_rental", "postgres", "postgres", "localhost")
conn = psycopg2.connect(db)
cur = conn.cursor()

app = Flask(__name__, static_url_path='')


@app.route('/')
def hello_world():
    return render_template('index.html')


# static files костиль
STATIC_FILES_DIR = 'templates'


@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory(STATIC_FILES_DIR + '/static', path)


@app.route('/<path>.json')
def send_all(path):
    return send_from_directory(STATIC_FILES_DIR, path + '.json')


@app.route('/<path>.png')
def send_png(path):
    return send_from_directory(STATIC_FILES_DIR, path + '.png')


@app.route('/<path>.ico')
def send_ico(path):
    return send_from_directory(STATIC_FILES_DIR, path + '.ico')


@app.route('/requests')
def requests():

    try:
        cur.execute(CREATE_VIEW)
        request_id = request.args['request_id']
        results = []
        columns = []

        if request_id == '1':
            C = request.args['C']
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_FRIENDS_OF_CLIENT, (C, F, T, N))
            columns = ["friend_id"]

        elif request_id == "2":
            X = request.args['X']
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_CLIENTS_OF_FRIEND, (X, F, T, N))
            columns = ["client_id"]

        elif request_id == "3":
            X = request.args['X']
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(RENTED_PARTIES_OF_FRIEND, (X, F, T, N))
            columns = ["holiday_id"]

        elif request_id == "4":
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_ALL_CLIENTS_OF_DIFFERENT_FRIENDS, (F, T, N))
            columns = ["client_id"]

        elif request_id == "5":
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_ALL_FRIENDS, (F, T, N))
            columns = ["friend_id"]

        elif request_id == "6":
            cur.execute(FIND_TOTAL_COUNT_OF_DATES)
            columns = ["month", "year", "num"]

        elif request_id == "7":
            X = request.args['X']
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_COUNT_OF_DATES_WITH_FRIENDS_OF_FRIEND, (F, T, N, X))
            columns = ["holiday_id", "num"]

        elif request_id == "8":
            X = request.args['X']
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_GIFTS_FROM_CLIENT, )
            columns = [""]

        elif request_id == "9":
            F = request.args['F']
            T = request.args['T']
            N = request.args['N']
            cur.execute(FIND_FRIENDS_BY_COMPLAINS, (F, T, N))
            columns = ["id", "num"]

        elif request_id == "10":
            X = request.args['X']
            F = request.args['F']
            T = request.args['T']
            C = request.args['C']
            cur.execute(FIND_SHARED_EVENTS, )
            columns = [""]

        elif request_id == "11":
            A = request.args['A']
            B = request.args['B']
            cur.execute(FIND_DAYS_OFF_FOR_FRIENDS, (A, B))
            columns = ["date", "num"]

        elif request_id == "12":
            X = request.args['X']
            cur.execute(FIND_AVERAGE_NUMBER_OF_CLIENTS_COMPLAINED, (X))
            columns = ["month", "year", "num"]

        for row in cur.fetchall():
            results.append(dict(zip(columns, row)))
        if "date" in columns:
            for result in results:
                result['date'] = result['date'].strftime("%Y-%m-%d")
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"





if __name__ == '__main__':
    app.run()
