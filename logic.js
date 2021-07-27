function darkerBackground(e) {
    oldOpacity = e.target.style.opacity;
    if (oldOpacity == '') {
        oldOpacity = 1;
    }
    newOpacity = (oldOpacity > 0) ? oldOpacity - 1 : 0;
    e.target.style.opacity = newOpacity;
}

// Generates random hex values in the format #rrggbb
function randColorHex() {
    let arr = ['r', 'g', 'b'];
    for (let i = 0; i < 3; i++) {
        let randVal = Math.floor(Math.random() * 256);
        arr[i] = randVal.toString(16).padStart(2, '0');
    }
    return '#' + arr.join('');
}
// Creates n*n grid of white background divs.pixel inside parent
function createGrid(parentElement, n) {
    parentElement.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    parentElement.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    for (let i = 0; i < n * n; i++) {
        let div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.classList.add('pixel');
        div.addEventListener('mouseenter', darkerBackground);
        parentElement.appendChild(div);
    }
}

function getNewSize() {
    let userInp;
    while (!userInp || userInp > 64 || userInp < 1) {
        userInp = prompt('Enter a grid size (1-64): ', prevSize);
        if (userInp === null) {
            return null;
        }
        else {
            userInp = parseInt(userInp);
        }
    }
    return userInp
}

function resizeGrid(gridParent) {
    userInp = getNewSize();
    if (userInp === null) {
        return
    }
    else {
        prevSize = userInp;
        while (gridParent.firstChild) {
            gridParent.removeChild(gridParent.firstChild);
        }
        createGrid(gridParent, userInp);
    }
}

let prevSize = 20;
const container = document.getElementById('container');
createGrid(container, prevSize);

const resetBtn = document.querySelector('#reset');
const pixels = document.querySelectorAll('.pixel');



// pixels.forEach((pixel) => pixel.addEventListener('mouseenter', darkerBackground));

resetBtn.addEventListener('click', () => resizeGrid(container));