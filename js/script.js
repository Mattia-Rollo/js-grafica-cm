"use strict"


//prendo il bottone play
const playButton = document.getElementById('play');

function play() {
    console.log('Inizio gioco....')
    
    const NUM_BOMB = 16; 
    const bombsPosition = [];
    

    let numCell;
    const fieldGame = document.getElementById('field-game');
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
            this.classList.add('green');
        })
        return cell;
    }

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
}

//attacco l'event listener
playButton.addEventListener('click',play);