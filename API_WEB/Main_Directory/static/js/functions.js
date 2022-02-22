//Variables --------------------------------------------------------------
const urlrecord = 'http://127.0.0.1:5000/record'
const urlload= 'http://127.0.0.1:5000/load'
const urlpatch= 'http://127.0.0.1:5000/patch-data'
const recordbtn = document.getElementById("AddPhraseBtn");
const box = document.getElementById("TextBox");
const COLORS = ["#707ce3","#11468F", "#FFAA4C", "#5089C6", "#93329E", "#C54B6C", "#E75480", "#05C3DD", "#218B82", "#FFA600", "#d8db07"];
let colors = ["#707ce3","#11468F", "#FFAA4C", "#5089C6", "#93329E", "#C54B6C", "#E75480", "#05C3DD", "#218B82", "#FFA600", "#d8db07"];
const FONTFAMILIES = ["Century Gothic", "Brush Script MT", "Lucida Console","Papyrus", "Goudy Old Style", "Lucida Sans Typewriter", "Andale Mono", "Geneva", "Futura"]
let fontfamilies = ["Century Gothic", "Brush Script MT", "Lucida Console","Papyrus", "Goudy Old Style", "Lucida Sans Typewriter", "Andale Mono", "Geneva", "Futura"]
const sizes = ["2vw", "2.2vw", "2.5vw", "3vw", "3.5vw"];



// FUNCTIONS---------------------------------------------------------------

function Not_understood(btn){
    alert("Oops... I didn't hear you there :)");
    recordbtn.innerText = "Volver a grabar";

}

function add_content(content){
    if(recordbtn.innerText != "Agrega una frase"){
        recordbtn.innerText = "Agrega una frase";
    }
    for(var key of Object.keys(content)){

        // Si el array de colores esta vacio, hay que resetearlo
        if (colors.length == 0)
        {
            colors = COLORS.slice(0);
        }

        // Si el array de fonts esta vacio, hay que resetearlo
        if (fontfamilies.length == 0)
        {
            fontfamilies = FONTFAMILIES.slice(0);
        }

        // Seleccionar atributos de cada frase
        const color = colors[Math.floor(Math.random()*colors.length)];
        const font = fontfamilies[Math.floor(Math.random()*fontfamilies.length)];
        const size = sizes[Math.floor(Math.random()*sizes.length)];
        const phrasebtn = document.createElement("button");

        // Eliminar colores de la lista
        let index = colors.indexOf(color);
        if (index > -1) {
            colors.splice(index, 1); // 2nd parameter means remove one item only
        }

        // Eliminar fonts de la lista
        index = fontfamilies.indexOf(font);
        if (index > -1) {
            fontfamilies.splice(index, 1); // 2nd parameter means remove one item only
        }

        // set an ID to the last element added
        phrasebtn.setAttribute('id',key);
        phrasebtn.innerText = content[key];
        phrasebtn.className ="texto";
        phrasebtn.style.color = color;
        phrasebtn.style.fontFamily = font;
        phrasebtn.style.fontSize = size;

        box.insertBefore(phrasebtn, box.firstChild)

        // Se imprime en la consola del browser cada una de las phrases que contiene el diccionario.
        console.log(key + " : " + content[key]); 
    }
}
// REQUESTS----------------------------------------------------------------

//AJAX REQUEST TO LOAD SAVED PHRASES 
function GET_phrases(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET',urlload,true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        console.log(this.readyState, this.status)
        if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            add_content(data);
            
        }else{
            //
        }
    }
    
}

//AJAX REQUEST TO RECORD (NO REFRESH)
function GET_phrase(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET',urlrecord,true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            console.log(data);
            add_content(data);
            
        }else if(this.readyState == 4 && this.status==400){
            console.log(this.status)
            Not_understood();
        }
    }    
}

//AJAX REQUEST TO POST (PATCH/DELETE) DATA.
function POST_omitphrase(id){
    data = JSON.stringify({idPatch : id});
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST',urlpatch,true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            const toremove = document.getElementById(id)
            toremove.remove();
        }else{
            //
        }
    }
    
    xhttp.send(data);
}

// MAIN----------------------------------------------------------

//Retrieve previously existing data.
window.onload = GET_phrases();


//Record new phrase
recordbtn.addEventListener("click", function(){   
    GET_phrase();
});
box.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton){
        return;
    }
    console.dir(event.target.id);
    POST_omitphrase(event.target.id);
})

/* TODO: DEBEMOS EVITAR QUE SI SE LE DA REFRESH A LA PÁGINA QUE NO SE ACTIVE EL MICRÓFONO.
*/
