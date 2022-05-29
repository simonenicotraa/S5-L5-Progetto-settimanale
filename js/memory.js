let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/

   /* ------------------------- TIMER --------------------------------*/
   let min = 0;
   let sec = 0;
   let myInterval;
   
     myInterval = setInterval(function(){
     setTimer();
   },1000);
   
   function setTimer() {
     sec++;
     if (sec >= 60) {
         sec = 0;
         min++;
     } 
         let spaziotempo = document.querySelector('.timer')
         spaziotempo.innerText = 'Tempo: ' + min + 'min ' + sec + 'sec'; 
     }
   
/* array per comparare immagini dopo click scheda */
let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

 
//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

/* ----------------------FUNZIONE START-GAME----------------------- */

 function startGame(){ 
    min=0
    sec=0
    var arrayShuffle = shuffle(arrayAnimali); 
    let griglia = document.querySelector('#griglia')
    griglia.innerHTML=''    //per svuotare la griglia               //let element = document.getElementById("top");
                                                                    //while (element.firstChild) {
                                                                //element.removeChild(element.firstChild);
        //creare un div per ogni elemento                                //}
        arrayShuffle.forEach((a,i) => {     
        let div = document.createElement('div');
        let cartadiv = document.createElement('div');  
        div.innerHTML = a;
        div.classList.add("icon");
        
        div.addEventListener('click',displayIcon)
        griglia.appendChild(cartadiv);
        cartadiv.appendChild(div);
        }  )       
       /*   for(let i=0; i<arrayShuffle.length; i++){
            let div = document.createElement('div');
            let cartadiv = document.createElement('div');  
            div.innerHTML = arrayShuffle[i];
            div.className = 'icon'
            div.addEventListener('click' , displayIcon)
            griglia.appendChild(cartadiv)
            cartadiv.appendChild(div)
        } */
        
     }   
     
// una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto


var iconsFind;
function displayIcon() {
    var icon = document.getElementsByClassName('icon');
    var icons = [...icon];
    
    /* ------------------definisco iconFind------------------------- */
     iconsFind = document.getElementsByClassName('find'); 
   
    /* ------------------definisco iconFind------------------------- */
    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */



    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                }
                });
                arrayComparison = [];
            }, 700);
        }
    }
    vittoria();     
}
//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
var modal= document.querySelector("#modal") 
function vittoria(){
    if(iconsFind.length == 24){
        modal.classList.add('active')
        clearInterval(setTimer())
        fineTempo = document.querySelector('#tempoTrascorso');
        fineTempo.innerText=  min + 'min ' + sec + 'sec '
}
} 
// una funzione che nasconde la modale alla fine e riavvia il gioco
function playAgain(){
    startGame()
    modal.classList.remove('active')
}
// una funzione che calcola il tempo e aggiorna il contenitore sotto



