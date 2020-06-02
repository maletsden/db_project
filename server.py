from flask import request, render_template, send_from_directory
from psycopg2.extras import RealDictCursor
from datetime import datetime
from db.sql_requests import *
from flask import Flask
import psycopg2
import hashlib
import json


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


@app.route('/verify-signin')
def verify_signin():
    email = request.values["email"]
    password = request.values["password"]
    h = hashlib.md5(password.encode())
    hashed_password = h.hexdigest()
    cur.execute(CHECK_PASSWORD, (email, email, email))
    results = cur.fetchall()
    print(results)
    if len(results) > 0:
        if hashed_password == results[0]["password"]:
            return '{{"verify-signin": "{0}"}}'.format(results[0]["role"])
        else:
            return '{"verify-signin": "false"}'
    else:
        return '{"verify-signin": "false"}'

@app.route('/get-gifts')
def get_gifts():
    try:
        cur.execute(GET_GIFTS)
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


@app.route('/get-friends')
def get_friends():
    try:
        cur.execute(GET_FRIENDS)
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


@app.route('/get-clients')
def get_clients():
    try:
        cur.execute(GET_CLIENTS)
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


@app.route('/get-friend-groups')
def get_friend_groups():
    try:
        cur.execute(GET_FRIEND_GROUPS)
        results = []
        groups = {}
        for row in cur.fetchall():
            if str(row['group_id']) not in groups.keys():
                groups[str(row['group_id'])] = [row['friend_id']]
            else:
                groups[str(row['group_id'])].append(row['friend_id'])
        for key, value in groups.items():
            results.append({"id": key, "friend_ids": value})
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


@app.route('/get-client-groups')
def get_client_groups():
    try:
        cur.execute(GET_CLIENT_GROUPS)
        results = []
        groups = {}
        for row in cur.fetchall():
            if str(row['group_id']) not in groups.keys():
                groups[str(row['group_id'])] = [row['client_id']]
            else:
                groups[str(row['group_id'])].append(row['client_id'])
        for key, value in groups.items():
            results.append({"id": key, "client_ids": value})
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# events

@app.route('/rent-friend', methods=['POST'])
def rent_friend():
    cur.execute(RENT_FRIEND, [request.values[s] for s in ("friend_id", "client_id", "date", "location_id")])
    return 0


@app.route('/rent-group', methods=['POST'])
def rent_group():
    cur.execute(RENT_GROUP, [request.values[s] for s in ("friends_group_id", "holiday_id", "friends_number", "client_id", "location_id", "style", "equipment", "date")])
    return 0


@app.route('/send-gift', methods=['POST'])
def send_gift():
    cur.execute(SEND_GIFT, [request.values[s] for s in ("gift_id", "client_id", "friend_id", "date")])
    return 0


@app.route('/return-gift', methods=['POST'])
def return_gift():
    cur.execute(RETURN_GIFT, [request.values[s] for s in ("friend_id", "client_id", "gift_id", "gift_id")])
    return 0


@app.route('/add-complaint', methods=['POST'])
def add_complaint():
    cur.execute(ADD_COMPLAINT, [request.values[s] for s in ("clients_group_id", "friend_id", "text", "date", "clients_number")])
    return 0


@app.route('/take-day-off', methods=['POST'])
def take_day_off():
    cur.execute(TAKE_DAY_OFF, [request.values[s] for s in ("friend_id", "date")])
    return 0


# requests

# 1
@app.route('/find-friends-of-client')
def find_friends_of_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_FRIENDS_OF_CLIENT, [request.values[s] for s in ('C', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 2
@app.route('/find-clients-of-friend')
def find_clients_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_CLIENTS_OF_FRIEND, [request.values[s] for s in ('X', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 3
@app.route('/rented-parties-of-friend')
def rented_parties_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(RENTED_PARTIES_OF_FRIEND, [request.values[s] for s in ('X', 'F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 4
@app.route('/find-all-clients-of-different-friends')
def find_all_clients_of_different_friends():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_ALL_CLIENTS_OF_DIFFERENT_FRIENDS, [request.values[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 5
@app.route('/find-all-friends')
def find_all_friends():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_ALL_FRIENDS, [request.values[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 6
@app.route('/find-total-count-of-dates')
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
@app.route('/find-count-of-dates-with-friends-of-friend')
def find_count_of_dates_with_friends_of_friend():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_COUNT_OF_DATES_WITH_FRIENDS_OF_FRIEND, [request.values[s] for s in ('F', 'T', 'N', 'X')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 8
@app.route('/find-gift-from-client')
def find_gifts_from_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_GIFTS_FROM_CLIENT, )
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 9
@app.route('/find-friends-by-complaints')
def find_friends_by_complaints():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_FRIENDS_BY_COMPLAINTS, [request.values[s] for s in ('F', 'T', 'N')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 10
@app.route('/find-shared-events')
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
@app.route('/find-days-off-for-friends-of-client')
def find_days_off_for_friends_of_client():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_DAYS_OFF_FOR_FRIENDS, [request.values[s] for s in ('A', 'B')])
        results = cur.fetchall()
        for result in results:
            result['date'] = result['date'].strftime("%Y-%m-%d")
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


# 12
@app.route('/find-average-number-of-clients-complained')
def find_average_number_of_clients_complained():
    try:
        cur.execute(CREATE_VIEW)
        cur.execute(FIND_AVERAGE_NUMBER_OF_CLIENTS_COMPLAINED, [request.values[s] for s in ('X')])
        results = cur.fetchall()
        return json.dumps(results)
    except Exception as e:
        print(e)
        return "Wrong query"


if __name__ == '__main__':
    app.run()
