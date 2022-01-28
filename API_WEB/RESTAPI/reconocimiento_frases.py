import speech_recognition as sr
from os import getcwd

def listen_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.pause_threshold = 0.8
        phrase = r.listen(source)
        
        try: 
            print ('\nMensaje recibido\n')
            text = r.recognize_google(phrase, language="es")
            return (text)
        except sr.UnknownValueError:
            print('Perdona no entendi. Repite lo que dijiste')
            
        except sr.RequestError:
            print('Perdón el servicio esta caido')
        

def write_on_file(phrase):
    with open(getcwd() + "/API_WEB/RESTAPI/frases.txt", 'a', encoding='utf-8') as txt_file:
        txt_file.write(f'{phrase}\n')

    # Es importante cerrar aquí el archivo porque en el código de 'controllers.py' se usa en la línea
    # siguiente y causa problemas.  
    txt_file.close()

if __name__ == "__main__":
    print("Este archivo no debe correrse directamente. Es una mini-libreria.")