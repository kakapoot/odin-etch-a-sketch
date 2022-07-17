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
    if (isRainbow) {
        // code for random color selection from https://www.paulirish.com/2009/random-hex-color-code-snippets/
        let randomColor = `#${(Math.random().toString(16) + "000000").slice(2, 8)}`
        pixel.setAttribute('style', `background-color: ${randomColor}`);
        // set pen hover to random color
        root.style.setProperty('--pen-color', randomColor);
    }
    else
        pixel.setAttribute('style', `background-color: ${penColor}`);
}

// ensure only one mode (eraser, rainbow, pen) is selected at any time
function untoggleOthers(button) {
    toggledButtons = document.querySelectorAll('.toggled')
    toggledButtons.forEach((toggledButton) => {
        if (toggledButton != button) {
            toggledButton.classList.toggle('toggled');
            if (toggledButton == rainbowButton)
                isRainbow = !isRainbow;
        }
    });
}

let penColor;
let size;
let pixels;
let isRainbow = false;

const slider = document.querySelector('.slider');

const root = document.querySelector(':root');
const canvas = document.querySelector('.canvas');
initializeCanvas();

// logic for drawing on canvas
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
// stops mouse from dragging while on canvas
canvas.ondragstart = () => {return false;} 
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
    untoggleOthers(colorPicker);
    penColor = colorPicker.value;
    // change pen hover color
    root.style.setProperty('--pen-color', penColor);
});

// eraser toggle
let previousColor;
const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', () => {
    untoggleOthers(eraserButton);
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
    // hehe
    if (slider.value == 69)
        sizeDisplay.textContent = `nice: ${size} x ${size}`;
    removeCanvas();
    createCanvas();
});

// rainbow toggle
const rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener('click', () => {
    untoggleOthers(rainbowButton);
    rainbowButton.classList.toggle('toggled');
    isRainbow = !isRainbow;
    // reset pen hover to previous color
    if (isRainbow)
        root.style.setProperty('--pen-color', penColor);
});