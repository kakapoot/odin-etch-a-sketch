function createCanvas() {
    for (let r = 0; r < size; r++) {
        let row = document.createElement('div');
        row.classList.add('row');
        canvas.appendChild(row);
        for (let c = 0; c < size; c++)
        {
            let column = (document.createElement('div'));
            column.classList.add('pixel');            
            row.appendChild(column);
        }
    }
    pixels = document.querySelectorAll('.pixel');
}

function removeCanvas() {
    canvas.replaceChildren();
}

function initializeCanvas() {
    penColor = 'black';
    size = 64;
    createCanvas();
}

function draw(pixel) {
    pixel.setAttribute('style', `background-color: ${penColor}`);
}

let penColor;
let size;
let pixels;
const canvas = document.querySelector('.canvas');
initializeCanvas();

// logic for drawing on canvas
let mouseDown = false;
document.onmousedown = () => (mouseDown = true);
document.onmouseup = () => (mouseDown = false);
// stop pointer from dragging while on canvas
canvas.ondragstart = () => {return false;};
canvas.addEventListener('mouseover', (e) => {
    if (e.target.className === "pixel") {
        if (mouseDown)
            draw(e.target);
    }
});

// clear canvas
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    pixels.forEach((pixel) => {
        pixel.setAttribute('style', 'background-color: white;');
    });
});

// change pen color
const root = document.querySelector(':root');
const colorButton = document.querySelector('.color');
colorButton.addEventListener('click', () => {
    penColor = `rgb(${prompt("r,g,b")})`;
    // change pen hover color
    root.style.setProperty('--pen-color', penColor);
});

// change canvas size
const sizeButton = document.querySelector('.size');
sizeButton.addEventListener('click', () => {
    size = prompt("canvas size");
    removeCanvas();
    createCanvas();
});
