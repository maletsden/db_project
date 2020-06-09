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
FIND_CLIENTS_OF_FRIEND = """SELECT client_id, full_name, email, address, sex, phone_number
FROM appointments INNER JOIN clients ON clients.id = appointments.client_id
WHERE friend_id = (%s) AND date >= (%s) AND date <= (%s)
GROUP BY client_id, full_name, email, address, sex, phone_number
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
FIND_GIFTS_FROM_CLIENT = """DROP VIEW day_off_num;
CREATE VIEW day_off_num as
SELECT friends.id as friend_id, COUNT(CASE WHEN date >= (%s) AND date <= (%s) THEN 1 END) as num
FROM day_off RIGHT JOIN friends ON (friends.id = day_off.friend_id)
GROUP BY friends.id


SELECT gifted.gift_id, ROUND(AVG(day_off_num.num),2)
FROM gifted INNER JOIN day_off_num ON (gifted.friend_id = day_off_num.friend_id)
WHERE gifted.client_id = (%s) AND gifted.date >= (%s) AND gifted.date <= (%s)
GROUP BY gifted.gift_id
ORDER BY AVG(day_off_num.num) desc"""
# 9
FIND_FRIENDS_BY_COMPLAINTS = """SELECT friends.id, COUNT(CASE WHEN date >= (%s) AND date <= (%s) AND complaints.clients_number >= (%s) THEN 1 END) as num
FROM complaints RIGHT JOIN friends ON (friends.id = complaints.friend_id)
GROUP BY friends.id
ORDER BY num desc"""
# 10
FIND_SHARED_EVENTS = """SELECT celebrations.id
FROM friends_groups INNER JOIN celebrations ON (friends_groups.group_id = celebrations.friends_group_id)
WHERE friends_groups.friend_id = (%s) AND celebrations.client_id = (%s) AND celebrations.date >= (%s) AND celebrations.date <= (%s)"""
# 11
FIND_DAYS_OFF_FOR_FRIENDS = """SELECT date, COUNT(*) as num
FROM day_off
GROUP BY date
HAVING COUNT(*) >= (%s) AND COUNT(*) <= (%s)"""
# 12
FIND_AVERAGE_NUMBER_OF_CLIENTS_COMPLAINED = """SELECT CAST(EXTRACT(month FROM date) as integer) as month, CAST(ROUND(AVG(clients_number),2) as text) as num
FROM complaints
WHERE friend_id = (%s)
GROUP BY EXTRACT(month FROM date)"""


RENT_FRIEND = """INSERT INTO appointments (friend_id, client_id, date, location_id) VALUES ((%s), (%s), (%s), (%s))"""
RENT_GROUP = """INSERT INTO celebrations (friends_group_id, holiday_id, friends_number, client_id, location_id, style, equipment, date) VALUES ((%s), (%s), (%s), (%s), (%s), (%s), (%s), (%s))"""
SEND_GIFT = """INSERT INTO gifted (gift_id, client_id, friend_id, date) VALUES ((%s), (%s), (%s), (%s))"""
RETURN_GIFT = """DELETE FROM gifted WHERE friend_id = (%s) AND client_id = (%s) AND gift_id = (%s); UPDATE gifts SET status=true WHERE id = (%s)"""
ADD_COMPLAINT = """INSERT INTO complaints (clients_group_id, friend_id, text, date, clients_number) VALUES ((%s), (%s), (%s), (%s))"""
TAKE_DAY_OFF = """INSERT INTO day_off (friend_id, date) VALUES ((%s), (%s), (%s), (%s))"""

GET_GIFTS = """SELECT id, name, price FROM gifts;"""
GET_GIFTS_BY_ID = """SELECT gifts.id as id, gifts.name as name, gifts.price as price, gifted.client_id as client_id FROM gifts INNER JOIN gifted ON gifts.id = gifted.gift_id WHERE gifted.friend_id = (%s);"""
GET_FRIENDS = """SELECT id, full_name, phone_number, sex, age FROM friends;"""
GET_FRIENDS_BY_ID = """SELECT friends.id as id, full_name, phone_number, sex, age, date, location_id FROM friends INNER JOIN appointments ON appointments.friend_id = friends.id WHERE appointments.client_id = (%s);"""
GET_CLIENTS = """SELECT id, full_name, phone_number FROM clients;"""
GET_CLIENTS_BY_ID = """SELECT clients.id as id, full_name, email, address, sex, phone_number FROM clients INNER JOIN appointments ON appointments.client_id = clients.id WHERE appointments.friend_id = (%s);"""
GET_FRIEND_GROUPS = """SELECT group_id, friend_id FROM friends_groups;"""
GET_CLIENT_GROUPS = """SELECT group_id, client_id FROM clients_groups;"""

CHECK_PASSWORD = """SELECT id, password, 'client' as role FROM clients WHERE email=(%s) GROUP BY id, password UNION SELECT id, password, 'friend' as role FROM friends WHERE email=(%s) GROUP BY id, password UNION SELECT id, password, 'host' as role FROM hosts WHERE email=(%s) GROUP BY id, password;"""


GET_RECENT_ACTIVITIES = """SELECT holiday_id, location_id, style, date FROM celebrations WHERE client_id=(%s);"""
GET_USER_TOTAL_RENTS = """SELECT friend_id, addresss, location, date FROM appointments WHERE client_id=(%s);"""
GET_RENTS_BY_LAST_12_MONTH = """SELECT friend_id, addresss, location, date FROM appointments WHERE client_id=(%s) ORDER BY date desc LIMIT 5;"""
