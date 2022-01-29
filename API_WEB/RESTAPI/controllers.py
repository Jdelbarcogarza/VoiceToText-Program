
from flask import jsonify
from os import getcwd
from reconocimiento_frases import *


def c_print():
    return "LOREM ipsum"

#Ruta('txt')
def c_txt(phraseID):

    phrase = listen_speech()
    write_on_file(phrase)

    return jsonify({phraseID: phrase})

if __name__ == "__main__":
    print("Este programa no debe correrse directamente.")