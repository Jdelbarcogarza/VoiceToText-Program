
function add_p(list){
    for(var key of Object.keys(list)){
        const h1 = document.createElement("h3");
        h1.innerText = list[key];
        document.body.append(h1)
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
