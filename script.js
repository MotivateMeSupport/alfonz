const road1 = document.getElementById('road1');
const road2 = document.getElementById('road2');
const btnPlay = document.getElementById('imgPlay');
const btnStop = document.getElementById('imgStop');

let animationId;

const kepernyo = document.getElementById('kepernyo');
let roadWidth = kepernyo.offsetWidth;

let x1 = 0;
let x2 = roadWidth-2;

let speed=3;
let acceleration=1;
let lastTime=null;

const txtSebesseg = document.getElementById('txtSebesseg');
const txtGyorsulas = document.getElementById('txtGyorsulas');

const form = document.querySelector('#beallitasok form');
const vInput = form.querySelector('input[type="number"]:nth-of-type(1)');
const aInput = form.querySelector('input[type="number"]:nth-of-type(2)');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    speed = parseFloat(vInput.value) || speed;
    acceleration = parseFloat(aInput.value) || acceleration;

    txtSebesseg.textContent = speed.toFixed(2) + " m/s";
    txtGyorsulas.textContent = acceleration.toFixed(2) + " m/s²";
});

function animate(timestamp) {
    btnPlay.style.display = 'none';
    btnStop.style.display = 'block';
    
    if(!lastTime){
        lastTime = timestamp;
    }

    const delta = (timestamp-lastTime)/1000;
    lastTime = timestamp;

    speed += acceleration * delta;

    x1 -= speed * delta * 60;
    x2 -= speed * delta * 60;


    if (speed >= 0) {
        if (x1 <= -roadWidth) x1 = x2 + roadWidth - (speed * delta * 60);
        if (x2 <= -roadWidth) x2 = x1 + roadWidth - (speed * delta * 60);
    } else {
        if (x1 >= roadWidth) x1 = x2 - roadWidth - (speed * delta * 60);
        if (x2 >= roadWidth) x2 = x1 - roadWidth - (speed * delta * 60);
    }

    road1.style.left = x1 + 'px';
    road2.style.left = x2 + 'px';

    txtSebesseg.textContent = speed.toFixed(2) + " m/s";

    animationId = requestAnimationFrame(animate);
}

function stop(){
    btnPlay.style.display = 'block';
    btnStop.style.display = 'none';
    lastTime=null;
    cancelAnimationFrame(animationId);
}

btnPlay.addEventListener('click', () => animationId = requestAnimationFrame(animate));

btnStop.addEventListener('click', stop);

window.addEventListener('resize', () => {
    const prevWidth = roadWidth;
    roadWidth = kepernyo.offsetWidth;
    x1 = x1 * (roadWidth / prevWidth);
    x2 = x2 * (roadWidth / prevWidth);
});