from flask import Flask
from flask import render_template, send_from_directory
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

@app.route('/test')
def test():
    print('testing')
    test = {
        'test': 1,
        'test1': 2
    }
    return test


if __name__ == '__main__':
   app.run()