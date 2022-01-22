
function add_p(list){
    for(var key of Object.keys(list)){
        const box = document.getElementById("TextBox");
        const div = document.createElement("div");
        div.innerText = list[key];
        div.className ="texto";
        box.appendChild(div)
        console.log(key + " : " + list[key]); 
    }
}


const url = 'http://127.0.0.1:5000/txt'
const GET_FRASES = async() =>{
    const res = await fetch(url);
    const frases = await res.json();
    add_p(frases);
}

window.addEventListener("load" , function(){
    GET_FRASES();
});
