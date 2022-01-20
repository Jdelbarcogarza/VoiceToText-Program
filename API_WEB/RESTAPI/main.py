
from flask import Flask,jsonify
from flask_cors import CORS
from controllers import *

app = Flask(__name__)
CORS(app)

@app.route('/test')
def GET_TEST():
    return c_print()

@app.route('/txt')
def GET_TXT():
    return c_txt()


app.run(debug = True)