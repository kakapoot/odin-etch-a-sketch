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
    penColor = getComputedStyle(root).getPropertyValue('--pen-color');
    size = slider.value;
    createCanvas();
}

function draw(pixel) {
    pixel.setAttribute('style', `background-color: ${penColor}`);
}

let penColor;
let size;
let pixels;
const slider = document.querySelector('.slider');

const root = document.querySelector(':root');
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
    removeCanvas();
    createCanvas();
});

// change pen color using on color picker values
const colorPicker = document.querySelector('.color');
colorPicker.addEventListener('input', () => {
    // switch out of eraser mode when selecting pen
    if (eraserButton.classList.contains('toggled'))
        eraserButton.classList.toggle('toggled');
    penColor = colorPicker.value;
    // change pen hover color
    root.style.setProperty('--pen-color', penColor);
});

// eraser toggle
let previousColor;
const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', () => {
    eraserButton.classList.toggle('toggled');
    if (eraserButton.classList.contains('toggled')) {
        // temporarily store previous pen color
        previousColor = penColor;
        penColor = '#FFFFFF';
    }
    else
        penColor = previousColor;
    root.style.setProperty('--pen-color', penColor);
});

// change canvas size
const sizeDisplay = document.querySelector('.size p');
slider.addEventListener('input', () => {
    size = slider.value;
    sizeDisplay.textContent = `size: ${size} x ${size}`;
    if (slider.value == 69)
        sizeDisplay.textContent = `nice: ${size} x ${size}`;
    removeCanvas();
    createCanvas();
});

// TODO: save image function?