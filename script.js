document.addEventListener('DOMContentLoaded', init);

let counter = 1;
let cutoff = 3;
let newWidth = document.querySelector('.item0').offsetWidth;
let stacks = [];
let gameOver = false;

function init() {
    checkPlay();
}

function checkPlay() {
    document.querySelector('.blocks').style.display = 'none';
    document.querySelector('.play-button').onclick = () => {
        document.querySelector('.blocks').style.display = 'flex';
        document.querySelector('.play-button').style.border = 'none';
        document.querySelector('.play-button').style.cursor = 'default';
        document.querySelector('.play-button').innerHTML = counter;
        document.querySelector('.play-button').onclick = null;
        startGame();
    };
}

function startGame() {
    let item = createItem();
    document.querySelector('.blocks').appendChild(item);
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 32 && !gameOver) {
            judgePlacement(counter);
            if(!gameOver) {
                let children = document.querySelector('.blocks').childNodes;
                item.style.animationPlayState = 'paused';
                counter++;
                document.querySelector('.play-button').innerHTML = counter;
                item = createItem();
                document.querySelector('.blocks').appendChild(item);
                if (document.querySelector('.blocks').offsetHeight >= document.querySelector('body').offsetHeight/2) {
                    for(let i = 0; i < cutoff && i < children.length; i++) {
                        let child = children[i];
                        child.remove();
                    }
                }
            }
        }
    });
}

function createItem() {
    let item = document.createElement('div');
    item.classList.add('block');
    item.classList.add(`item${counter}`);
    item.style.position = 'relative';
    item.style.width = `${newWidth}px`;
    item.style.animation = 'example 2s linear 0s infinite alternate'; 
    if (counter >= 15) {
        item.style.animation = 'example 1.5s linear 0s infinite alternate'; 
    }
    if (counter >= 25) {
        item.style.animation = 'example 1s linear 0s infinite alternate';
    }
    return item;
}

function judgePlacement(num) {
    let oldX = document.querySelector(`.item${num-1}`).getBoundingClientRect()['x'];
    let newX = document.querySelector(`.item${num}`).getBoundingClientRect()['x'];

    document.querySelector(`.item${num}`).style.animation = '';
    let diff = 0;

    if (newX + document.querySelector(`.item${num}`).offsetWidth < oldX || newX - document.querySelector(`.item${num}`).offsetWidth > oldX) {
        document.querySelector(`.item${num}`).remove();
        setGameOver(oldX);
    } else {
        if(newX < oldX) {
            diff = oldX - newX;
            document.querySelector(`.item${num}`).style.left = `${oldX}px`;
        }

        if (newX > oldX) {
            diff = (newX + document.querySelector(`.item${num}`).getBoundingClientRect()['width']) - (oldX + document.querySelector(`.item${num - 1}`).getBoundingClientRect()['width']);
            document.querySelector(`.item${num}`).style.left = `${newX}px`;
        }

        document.querySelector(`.item${num}`).style.width = `${document.querySelector('.item' + num).offsetWidth - diff}px`;
        newWidth = document.querySelector('.item' + num).offsetWidth;

        if(newWidth < 10) {
            document.querySelector(`.item${num}`).remove();
            setGameOver(oldX);
        }
    }
}

function setGameOver(oldX) {
    gameOver = true;
    document.querySelector('.game-over').style.display = 'block';
}