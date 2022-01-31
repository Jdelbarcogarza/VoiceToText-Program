
from flask import jsonify
from os import getcwd
from reconocimiento_frases import *


def c_print():
    return "LOREM ipsum"

#Ruta('txt')
def c_txt(phraseID):

    phrase = listen_speech()

    # value is an error then just don't send a dictionary value
    if (phrase == 'repeat'):
        # TODO: this message should be read by the JS code and handle it accordingly.
        # right now there is an uncaught promise due to a syntax error con the js code because
        # no json object is being sent.
        return 'error'

    # write phrase on file once it is validated.
    write_on_file(phrase)

    # return json object
    return jsonify({phraseID: phrase})

if __name__ == "__main__":
    print("Este programa no debe correrse directamente.")