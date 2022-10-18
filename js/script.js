"use strict"
//xIl computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.


// xI numeri nella lista delle bombe non possono essere duplicati.
// x In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso 
// x e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// x La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di tentativi consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


//prendo il bottone play
const playButton = document.getElementById('play');

function play() {
    console.log('Inizio gioco....')
    h3.innerHTML = 'Logo';
    const textFooter = document.getElementById('text-footer');
    textFooter.innerHTML = '';

    const NUM_BOMB = 16;
    const bombsPosition = []; // 16 numeri random non ripetuti
    // let check = false;
    let score = 0;
    let numCell;
    const fieldGame = document.getElementById('field-game');
    console.log(fieldGame);
    fieldGame.innerHTML = '';
    const levelHTML = document.getElementById('livello');
    const level = levelHTML.value;
    switch (level) {
        case '1':
        default:
            numCell = 100;
            break;
        case '2':
            numCell = 81;
            break;
        case '3':
            numCell = 49;
            break;
    }

    // genera bombe
    while (bombsPosition.length < NUM_BOMB) {
        const bomb = getRndInteger(1, numCell);
        if (!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);
    //funzione che genera la cella 

    const MAX_ATTEMPT = numCell - NUM_BOMB;

    function scegli() {
        //se clicco e il numero NON corrisponde al numero presente in 'bombsPosition' 
        //diventa green, altrimenti prendo tutti gli elementi con la classe square 
        //e aggiungo la classe red in base alla posizione delle bombe 
        //e tolgo la classe green a tutti gli square 
        const span = this.querySelector('span');
        console.log(span);
        const num = parseInt(span.textContent);
        // console.log(num);
        this.removeEventListener('click', scegli);

        if (!bombsPosition.includes(num)) {
            //se non è presente allora è Green e scrivi il numero
            this.classList.add('green');
            this.innerHTML = `
            <span class="visible">${num}</span>
            `;
            score++;
            console.log(score);

            if (score === MAX_ATTEMPT) {
                endGame();
            }
        } else {
            this.style.backgroundColor = 'red';
            endGame();

            // const squares = document.querySelectorAll('div.square');

            // console.log(cell);
            // for(let i = 0; i < squares.length; i++){
            //     squares[i].removeEventListener('click',sciegli);
            //     squares[i].innerHTML = "";
            // squares[i].classList.remove('green');
            // // squares[i].classList.add('no-click');
            //per conbaciare l'index con i numeri da 1 a 100 presenti nella lista 'bombsPosition'
            //aumento di uno 'i'
            //     if(bombsPosition.includes(i+1)) {
            //         squares[i].classList.add('red');

            //         squares[i].innerHTML = `
            //         <span class="visible">${i+1}</span>
            //     `;
            // }
            // console.log(squares[i])

            // console.log(squares);
            // check = true;
            // }
        }

    }

    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell)
        const cell = document.createElement('div');
        // console.log(cell);
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.height = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = `
                <span class="invisible">${num}</span>
        `;
        // for(let i= 0; i < squares.length; i++){
        //     squares[i].addEventListener('click',sciegli);
        // }
        cell.addEventListener('click', scegli);
        return cell;
    }



    //funzione che genera il campo di gioco
    function drawGrid() {
        // const fieldGame = document.getElementById('field-game');
        
        const grid = document.createElement('div');
        grid.className = "grid";
        for (let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    //chiamo la funzione
    drawGrid();
    
    


    function endGame() {
        console.log('endGame');
        //prendo tutti i quadratini
        const h3 = document.getElementById('h3');
        h3.innerHTML = 'punteggio: ' + score;
        const squares = document.getElementsByClassName('square');
        console.log(squares);
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', scegli);
            //se i+1 è nell'array delle bombe le scoperchiamo
            //if square[i] == bombsPosition
            let num = i + 1;
            if (bombsPosition.includes(num)) {
                squares[i].classList.add('red');
            }
        }

        if (score === MAX_ATTEMPT) {
            textFooter.innerHTML = '<h2>Hai Vinto!</h2>'
            console.log('hai vinto');
        } else {
            textFooter.innerHTML = '<h2>Hai Perso!</h2>'
            console.log('hai perso');
        }
    }
}


// if(check){
//     const squares = document.querySelectorAll('.square');


//     for(let i = 0; i < squares.length; i++){
//         squares[i].removeEventListener('click',)
//     }

// }

//attacco l'event listener
playButton.addEventListener('click', play);