CREATE_VIEW = """CREATE OR REPLACE VIEW clients_friends as
    SELECT date, friend_id, client_id FROM appointments
    UNION
    SELECT date, friend_id, client_id
    FROM friends_groups LEFT JOIN celebrations ON (friends_groups.group_id = celebrations.friends_group_id)
    """
# 1
FIND_FRIENDS_OF_CLIENT = """SELECT friend_id
        FROM clients_friends -- INNER JOIN friends ON friends.id = clients_friends.friend_id
        WHERE client_id = (%s) AND date >= (%s) AND date <= (%s)
        GROUP BY friend_id
        HAVING COUNT(*) >= (%s)"""
# 2
FIND_CLIENTS_OF_FRIEND = """SELECT client_id
FROM clients_friends -- INNER JOIN clients ON clients.id = clients_friends.friend_id
WHERE friend_id = (%s) AND date >= (%s) AND date <= (%s)
GROUP BY client_id
HAVING COUNT(*) >= (%s)"""
# 3
RENTED_PARTIES_OF_FRIEND = """SELECT holiday_id
FROM celebrations INNER JOIN friends_groups ON (friends_groups.group_id = celebrations.friends_group_id)-- INNER JOIN holidays ON holidays.id = celebrations.holiday_id
WHERE friends_groups.friend_id = (%s) AND date >= (%s) AND date <= (%s)
GROUP BY holiday_id
HAVING COUNT(*) >= (%s)"""
# 4
FIND_ALL_CLIENTS_OF_DIFFERENT_FRIENDS = """SELECT client_id
FROM clients_friends -- INNER JOIN clients ON clients.id = clients_friends.friend_id
WHERE  date >= (%s) AND date <= (%s)
GROUP BY client_id
HAVING COUNT(DISTINCT friend_id) >= (%s)"""
# 5
FIND_ALL_FRIENDS = """SELECT friend_id
FROM clients_friends -- INNER JOIN friends ON friends.id = clients_friends.friend_id
WHERE date >= (%s) AND date <= (%s)
GROUP BY friend_id
HAVING COUNT(DISTINCT client_id) >= (%s)"""
# 6
FIND_TOTAL_COUNT_OF_DATES = """SELECT EXTRACT(month FROM date) as month,  EXTRACT(year FROM date) as year, COUNT(*) as num
FROM appointments
GROUP BY EXTRACT(month FROM date), EXTRACT(year FROM date)"""
# 7
FIND_COUNT_OF_DATES_WITH_FRIENDS_OF_FRIEND = """SELECT celebrations.holiday_id, COUNT(CASE WHEN celebrations.date >= (%s) AND celebrations.date <= (%s) AND celebrations.friends_number >= (%s) THEN 1 END) as num
FROM friends_groups INNER JOIN celebrations ON (friends_groups.group_id = celebrations.friends_group_id)
WHERE friends_groups.friend_id = (%s)
GROUP BY celebrations.holiday_id"""
# 8
FIND_GIFTS_FROM_CLIENT = """ """
# 9
FIND_FRIENDS_BY_COMPLAINTS = """SELECT friends.id, COUNT(CASE WHEN date >= (%s) AND date <= (%s) AND complaints.clients_number >= (%s) THEN 1 END) as num
FROM complaints RIGHT JOIN friends ON (friends.id = complaints.friend_id)
GROUP BY friends.id
ORDER BY num desc"""
# 10
FIND_SHARED_EVENTS = """ """
# 11
FIND_DAYS_OFF_FOR_FRIENDS = """SELECT date, COUNT(*) as num
FROM day_off
GROUP BY date
HAVING COUNT(*) >= (%s) AND COUNT(*) <= (%s)"""
# 12
FIND_AVERAGE_NUMBER_OF_CLIENTS_COMPLAINED = """SELECT EXTRACT(month FROM date) as month,  EXTRACT(year FROM date) as year, ROUND(AVG(clients_number),2) as num
FROM complaints
WHERE friend_id = (%s)
GROUP BY EXTRACT(month FROM date),  EXTRACT(year FROM date)"""


RENT_FRIEND = """INSERT INTO appointments (friend_id, client_id, date, location_id) VALUES ((%s), (%s), (%s), (%s))"""
RENT_GROUP = """INSERT INTO celebrations (friends_group_id, holiday_id, friends_number, client_id, location_id, style, equipment, date) VALUES ((%s), (%s), (%s), (%s), (%s), (%s), (%s), (%s))"""
SEND_GIFT = """INSERT INTO gifted (gift_id, client_id, friend_id, date) VALUES ((%s), (%s), (%s), (%s))"""
RETURN_GIFT = """DELETE FROM gifted WHERE friend_id = (%s) && client_id = (%s) && gift_id = (%s); UPDATE gifts SET returned=true WHERE gift_id = (%s)"""
ADD_COMPLAINT = """INSERT INTO complaints (clients_group_id, friend_id, text, date, clients_number) VALUES ((%s), (%s), (%s), (%s))"""
TAKE_DAY_OFF = """INSERT INTO day_off (friend_id, date) VALUES ((%s), (%s), (%s), (%s))"""

GET_GIFTS = """SELECT id, name FROM gifts;"""
GET_FRIENDS = """SELECT id, full_name, phone_number, sex, age FROM friends;"""
GET_CLIENTS = """SELECT id, full_name, phone_number FROM clients;"""
GET_FRIEND_GROUPS = """SELECT group_id, friend_id FROM friends_groups;"""
GET_CLIENT_GROUPS = """SELECT group_id, client_id FROM clients_groups;"""

CHECK_PASSWORD = """SELECT password, 'client' as role FROM clients WHERE email=(%s) GROUP BY password UNION SELECT password, 'friend' as role FROM friends WHERE email=(%s) GROUP BY password UNION SELECT password, 'host' as role FROM hosts WHERE email=(%s) GROUP BY password;"""