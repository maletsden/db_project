from datetime import datetime
import json
from flask import Flask
from flask import request, render_template, send_from_directory
import psycopg2
from psycopg2.extras import RealDictCursor
from db.sql_requests import *

# db = "database=%s host=%s " % ("bank", "postgres", "postgres", "localhost")
# schema = "schema.sql"
db = "dbname=%s user=%s password=%s host=%s " % ("friends_rental", "postgres", "postgres", "localhost")
conn = psycopg2.connect(db)
cur = conn.cursor(cursor_factory=RealDictCursor)

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


# events

@app.route('/rent-friend', methods=['POST'])
def rent_friend():
    cur.execute(RENT_FRIEND, [request.args[s] for s in ("friend_id", "client_id", "date", "location_id")])
    return 0


@app.route('/rent-group', methods=['POST'])
def rent_group():
    cur.execute(RENT_GROUP, [request.args[s] for s in ("friends_group_id", "holiday_id", "friends_number", "client_id", "location_id", "style", "equipment", "date")])
    return 0


@app.route('/send-gift', methods=['POST'])
def send_gift():
    cur.execute(SEND_GIFT, [request.args[s] for s in ("gift_id", "client_id", "friend_id", "date")])
    return 0


@app.route('/return-gift', methods=['POST'])
def return_gift():
    cur.execute(RETURN_GIFT, [request.args[s] for s in ("friend_id", "client_id", "gift_id", "gift_id")])
    return 0


@app.route('/add-complaint', methods=['POST'])
def add_complaint():
    cur.execute(ADD_COMPLAINT, [request.args[s] for s in ("clients_group_id", "friend_id", "text", "date", "clients_number")])
    return 0


@app.route('/take-day-off', methods=['POST'])
def take_day_off():
    cur.execute(TAKE_DAY_OFF, [request.args[s] for s in ("friend_id", "date")])
    return 0


# requests

# 1
@app_route('/find-friends-of-client')
def find_friends_of_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_FRIENDS_OF_CLIENT, [request.args[s] for s in ('C', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 2
@app_route('/find-clients-of-friend')
def find_clients_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_CLIENTS_OF_FRIEND, [request.args[s] for s in ('X', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 3
@app_route('/rented-parties-of-friend')
def rented_parties_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(RENTED_PARTIES_OF_FRIEND, [request.args[s] for s in ('X', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 4
@app_route('/find-all-clients-of-different-friends')
def find_all_clients_of_different_friends():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_ALL_CLIENTS_OF_DIFFERENT_FRIENDS, [request.args[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 5
@app_route('/find-all-friends')
def find_all_friends():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_ALL_FRIENDS, [request.args[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"
''

# 6
@app_route('/find-total-count-of-dates')
def find_total_count_of_dates():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_TOTAL_COUNT_OF_DATES)
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 7
@app_route('/find-count-of-dates-with-friends-of-friend')
def find_count_of_dates_with_friends_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_COUNT_OF_DATES_WITH_FRIENDS_OF_FRIEND, [request.args[s] for s in ('F', 'T', 'N', 'X')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 8
@app_route('/find-gift-from-client')
def find_gifts_from_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_GIFTS_FROM_CLIENT, )
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)''
        return "Wrong query"


# 9
@app_route('/find-friends-by-complaints')
def find_friends_by_complaints():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_FRIENDS_BY_COMPLAINTS, [request.args[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 10
@app_route('/find-shared-events')
def find_shared_events():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_SHARED_EVENTS, )
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 11
@app_route('/find-days-off-for-friends-of-client')
def find_days_off_for_friends_of_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_DAYS_OFF_FOR_FRIENDS, [request.args[s] for s in ('A', 'B')])
        results = cur.fetchall()
        for result in results:
            result['date'] = result['date'].strftime("%Y-%m-%d")
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 12
@app_route('/find-average-number-of-clients-complained')
def find_average_number_of_clients_complained():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_AVERAGE_NUMBER_OF_CLIENTS_COMPLAINED, [request.args[s] for s in ('X')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


if __name__ == '__main__':
    app.run()
