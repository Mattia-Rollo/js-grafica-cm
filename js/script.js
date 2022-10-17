"use strict"


//prendo il bottone play
const playButton = document.getElementById('play');

function play() {
    console.log('Inizio gioco....')
    
    const NUM_BOMB = 16; 
    const bombsPosition = [];
    let check = false;

    let numCell;
    const fieldGame = document.getElementById('field-game');
    console.log(fieldGame)
    fieldGame.innerHTML = '';
    const levelHTML = document.getElementById('livello');
    const level = levelHTML.value;
    switch(level){
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
    while(bombsPosition.length < NUM_BOMB) {
        const bomb = getRndInteger(1, numCell);
        if(!bombsPosition.includes(bomb)){
        bombsPosition.push(bomb);
        }
    }
    bombsPosition.sort();
    console.log(bombsPosition);
    //funzione che genera la cella 
    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell)
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.height = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = `
                <span>${num}</span>
        `;
        cell.addEventListener('click',function() {
            //se clicco e il numero NON corrisponde al numero presente in 'bombsPosition' 
            //diventa green, altrimenti prendo tutti gli elementi con la classe square 
            //e aggiungo la classe red in base alla posizione delle bombe 
            //e tolgo la classe green a tutti gli square 
            if(!bombsPosition.includes(num)){
            this.classList.add('green');
            }else {
                const squares = document.querySelectorAll('.square');
                for(let i = 0; i < squares.length; i++){
                    squares[i].classList.remove('green');
                    if(bombsPosition.includes(i+1)) {
                        squares[i].classList.add('red');
                    }
                // console.log(squares);
                check = true;
                }
            }
        })
        return cell;
    }
    
    
    // const div = document.querySelectorAll('square');
    // console.log(div[3]);
    // function allRed() {
        //     if(check) {
            
            //     }
            
            // }
            
            //funzione che genera il campo di gioco
            function drawGrid() {
                // const fieldGame = document.getElementById('field-game');
                const grid = document.createElement('div');
                grid.className = "grid";
                for(let i = 1; i <= numCell; i++){
                    const cell = drawCell(i);
                    grid.appendChild(cell);
                }
                fieldGame.appendChild(grid);
            }
            //chiamo la funzione
            drawGrid();
            // if(check) {
            // const squares = document.querySelectorAll('.square');
            // console.log(squares);
            // for(let i = 0; i < squares.length;i++){
                
            // }
            // }
        }
        
        //attacco l'event listener
        playButton.addEventListener('click',play);