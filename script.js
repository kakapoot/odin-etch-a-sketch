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

function setMode(event) {
    colorMode = event.target;
    selectedButtons = document.querySelectorAll('.selected');
    // unselect previous selected button
    selectedButtons.forEach((button) => {
        button.classList.remove('selected');
    })
    // selecting color picker will select pen button instead
    if (colorMode == colorPicker)
        penButton.classList.add('selected');
    else
        colorMode.classList.add('selected');
    // set pen hover color
    root.style.setProperty('--pen-color', getColor());
}

function getColor() {
    switch (colorMode) {
        case penButton:
        case colorPicker:
            return colorPicker.value;
        case rainbowButton:
            // random color selection code from https://www.paulirish.com/2009/random-hex-color-code-snippets/
            return `#${(Math.random().toString(16) + "000000").slice(2, 8)}`
        case eraserButton:
            return '#FFFFFF';
        default:
            return '#000000';
    }
}

function draw(pixel) {
    // get pen color depending on selected color mode
    penColor = getColor();
    pixel.setAttribute('style', `background-color: ${penColor}`);
}

let penColor;
let size;
let pixels;
let colorMode;

const root = document.querySelector(':root');
const canvas = document.querySelector('.canvas');

const slider = document.querySelector('.slider');
// create starting canvas
initializeCanvas();

// logic for drawing on canvas
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
// stops mouse from dragging while on canvas
canvas.ondragstart = () => {return false;} 
canvas.addEventListener('mouseover', (event) => {
    if (event.target.className === "pixel") {
        if (mouseDown)
            draw(event.target);
    }
});


const colorPicker = document.querySelector('.color');
colorPicker.addEventListener('input', setMode);
const penButton = document.querySelector('.pen');
penButton.addEventListener('click', setMode);

const rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener('click', setMode);

const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', setMode);

// clear canvas
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    removeCanvas();
    createCanvas();
});

// change canvas size
const sizeDisplay = document.querySelector('.size p');
slider.addEventListener('input', () => {
    size = slider.value;
    sizeDisplay.textContent = `size: ${size} x ${size}`;
    removeCanvas();
    createCanvas();
    // hehe
    if (slider.value == 69)
        sizeDisplay.textContent = `nice: ${size} x ${size}`;
});