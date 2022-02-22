//Variables --------------------------------------------------------------
const urlrecord = 'http://127.0.0.1:5000/record'
const urlload= 'http://127.0.0.1:5000/load'
const urlpatch= 'http://127.0.0.1:5000/patch-data'
const recordbtn = document.getElementById("AddPhraseBtn");
const box = document.getElementById("TextBox");
const colors = ["#707ce3", "#B983FF", "#11468F", "#FFAA4C", "#5089C6", "#035397", "#93329E"];
const fontfamilies = ["Times new Roman", "Arial", "Lucida Console","Copperplate"]
const sizes = ["1.5vw","2vw","2.5vw","4vw"];



// FUNCTIONS---------------------------------------------------------------

function Not_understood(btn){
    alert("Oops... I didn't hear you there :)");
    recordbtn.innerText = "Volver a grabar";

}

function add_content(content){
    if(recordbtn.innerText != "Agregar frase"){
        recordbtn.innerText = "Agregar frase";
    }
    for(var key of Object.keys(content)){
        const color = colors[Math.floor(Math.random()*colors.length)];
        const font = fontfamilies[Math.floor(Math.random()*fontfamilies.length)];
        const size = sizes[Math.floor(Math.random()*sizes.length)];
        const phrasebtn = document.createElement("button");

        // set an ID to the last element added
        phrasebtn.setAttribute('id',key);
        phrasebtn.innerText = content[key];
        phrasebtn.className ="texto";
        phrasebtn.style.color = color;
        phrasebtn.style.fontFamily = font;
        phrasebtn.style.fontSize = size;

        box.appendChild(phrasebtn)

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
            toremove.remove()
        }else{
            
            
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
