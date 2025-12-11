const p=document.querySelector('p')
const text = p.innerText
const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let iteration = 0;
function randomText(){
    const str = text.split("").map((char , index)=>{
        if(index < iteration){
            return char
        }
        return char.split("")[
            Math.floor(Math.random()*52)
        ]
    }).join("")
    p.innerText = str
    iteration += 0.4
}
setInterval(randomText , 200)