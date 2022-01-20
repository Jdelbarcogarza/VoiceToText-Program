
from flask import jsonify


def c_print():
    return "LOREM EPSILUM"

#Ruta('txt')
def c_txt():
    text = open('frases.txt','r')
    phrases ={}
    key = 0
    for i in text:
        
        phrases[str(key)] = i
        key += 1
    text.close()    
    print(phrases)
    json_phrases = jsonify(phrases)
    #json_phrases.headers.add('Access-Control-Allow-Origin', '*')
    return json_phrases