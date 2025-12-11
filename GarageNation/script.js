
var main = document.querySelector("main")
var crsr = document.querySelector(".cur")
main.addEventListener("mousemove", function(dets){
    crsr.style.left = dets.x+"px";
    crsr.style.top = dets.y+"px";
});
const h1 = document.querySelector('h1');
const text = h1.innerText
const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let iteration = 0
function randomText(){
    const str = text.split("").map((char , index)=>{
        if(index < iteration){
            return char
        }
        return char.split("")[
            Math.floor(Math.random()*52)
        ];
    }).join("")
    h1.innerText = str
    iteration += 0.4
}
setInterval(randomText , 400)