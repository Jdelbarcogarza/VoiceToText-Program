
function add_p(list){
    for(var key of Object.keys(list)){
        const box = document.getElementById("TextBox");
        const div = document.createElement("div");

        // set an ID to the last element added
        div.setAttribute('id',key);
        div.innerText = list[key];
        div.className ="texto";
        box.appendChild(div)

        // Se imprime en la consola del browser cada una de las frases que contiene el diccionario.
        console.log(key + " : " + list[key]); 
    }
}


const url = 'http://127.0.0.1:5000/txt'
const GET_FRASES = async() =>{
    const res = await fetch(url);
    const frases = await res.json();
    add_p(frases);
}


const activateBtn = document.getElementById("AddPhraseBtn");

activateBtn.addEventListener("click", function(){
    
    // borrar todo el contenido de la página para volverlo a escribir con el método GET_FRASES().
    
    GET_FRASES();
    
});

/* TODO: DEBEMOS EVITAR QUE SI SE LE DA REFRESH A LA PÁGINA QUE NO SE ACTIVE EL MICRÓFONO.
window.addEventListener("load" , function(){
    GET_FRASES();
});*/
