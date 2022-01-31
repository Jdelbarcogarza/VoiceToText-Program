
from flask import Flask, render_template
from flask_cors import CORS
from controllers import *


app = Flask(__name__)
CORS(app)

# 
global phraseID
phraseID = 0

@app.route('/txt')
def GET_TXT():

    global phraseID
    phraseID = phraseID + 1

    return c_txt(phraseID)

@app.route('/')
def index():
    return render_template("index.html")

app.run(debug = True)