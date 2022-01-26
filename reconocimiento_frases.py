import speech_recognition as sr
from os import getcwd

def transform():
    r = sr.Recognizer()
    with sr.Microphone() as fuente:
        r.pause_threshold = 0.8
        frase = r.listen(fuente)
        try: 
            print ('Recibido')
            q = r.recognize_google(frase, language="es")
            return (q)
        except sr.UnknownValueError:
            print('Perdona no entendi')
            return 'Esperando...'
        except sr.RequestError:
            print('Perdón el servicio esta caido')
            return 'Esperando...'
        except:
            return "Eperando..."

lista_frases = []

def grabar_archivo(frase):
    with open(getcwd() + "/API_WEB/RESTAPI/frases.txt", 'a', encoding='utf-8') as archivo:
        archivo.write(f'{frase} \n')

def main():
    while True:
        opcion = str(input('Pulsa X para ingresar una frase: '))

        if opcion == 'X' or opcion == "x":
            frase = transform()
            print (frase)
            if frase != "Eperando...":
                grabar_archivo(frase)

main()
