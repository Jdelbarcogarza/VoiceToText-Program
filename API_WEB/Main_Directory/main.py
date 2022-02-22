
from flask import Flask, render_template, request
from flask_cors import CORS
from controllers import *


app = Flask(__name__)
CORS(app)

currentID = [0]

@app.route('/record')
def GET_transcript():
    try:
        currentID[0] = currentID[0] + 1
        toRespond = transcript(currentID[0])
        if 'error' in toRespond:
            currentID[0] = currentID[0] - 1
            return jsonify({'message': 'Failed to transcribe user input'}), 400 
        else:
            return jsonify(toRespond)
    except:
        return jsonify({'message': 'process failed within controller "transcript()". '}), 500

@app.route('/load')
def GET_DATA():
    try:
        toRespond = retrieveData()
        currentID[0] = 0
        currentID[0] = currentID[0] + len(toRespond) - 1
        return jsonify(toRespond)
    except:
        return jsonify({'message': 'failed to fetch data'}), 500


@app.route('/patch-data', methods =['POST'])
def PATCH_DATA():
    try:
        print("started")
        data = request.json
        print("recieving",data, "with id to patch: ", data['idPatch'])
        patchdata(data['idPatch'])
        return jsonify({'message': 'Succesful data update.'})
    except:
        return jsonify({'message': 'failed to patch data'}), 500

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)