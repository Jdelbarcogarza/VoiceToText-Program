
from flask import jsonify
from os import getcwd
from reconocimiento_frases import *


def c_print():
    return "LOREM EPSILUM"

#Ruta('txt')
def c_txt():

    phrase = listen_speech()
    write_on_file(phrase)

    text = open(getcwd() +'\\API_WEB\\RESTAPI\\frases.txt','r')
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

if __name__ == "__main__":
    print("Este programa no debe correrse directamente.")