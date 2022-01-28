
from flask import Flask,jsonify
from flask_cors import CORS
from controllers import *
from os import getcwd


app = Flask(__name__)
CORS(app)

@app.route('/test')
def GET_TEST():
    return c_print()

@app.route('/txt')
def GET_TXT():
    return c_txt()

@app.route('/')
def GET_CWD():
    return "ESTO ES EL BACKEND Escribe en la ruta 'txt' o 'test'"

app.run(debug = True)