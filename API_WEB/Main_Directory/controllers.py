
from flask import jsonify
from os import getcwd
from reconocimiento_frases import *


#Ruta('txt')
def transcript(phraseID):
    phrase = listen_speech()
    #phrase = 'repeat'

    if (phrase == 'repeat'):
        return {'error' : 'repeat'}

    with open('frases.txt','a+',encoding="utf-8") as file:
        file.seek(0)
        data = file.read(100)
        if len(data)>0:
            file.write("\n")

        file.write(phrase)
        
    print(phrase)
    return {phraseID: phrase}

def retrieveData():
    text = open('frases.txt','r',encoding="utf-8")
    phrases ={}
    key = 0
    for i in text:
        if i[0] == '#':
            continue

        phrases[str(key)] = i
        key += 1
    text.close()        
    return phrases

def patchdata(i):
    i = int(i)
    print("Patching...")
    with open('frases.txt','r', encoding= "utf-8") as file:
        data = file.readlines()
    print("patching:",data[i], "on text file line:", i + 1)
    data[i] = "#" + data[i]

    with open('frases.txt','w', encoding= "utf-8") as file:
        file.writelines(data)
    

if __name__ == "__main__":
    print("Este programa no debe correrse directamente.")