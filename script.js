const road1 = document.getElementById('road1');
const road2 = document.getElementById('road2');
const btnPlay = document.getElementById('imgPlay');
const btnStop = document.getElementById('imgStop');

let animationId;

const kepernyo = document.getElementById('kepernyo');
let roadWidth = kepernyo.offsetWidth;

let x1 = 0;
let x2 = roadWidth-2;

function animate() {
    btnPlay.style.display = 'none';
    btnStop.style.display = 'block';
    const speed = 2;

    x1 -= speed;
    x2 -= speed;

    if (x1 <= -roadWidth) x1 = x2 + roadWidth - speed;
    if (x2 <= -roadWidth) x2 = x1 + roadWidth - speed;

    road1.style.left = x1 + 'px';
    road2.style.left = x2 + 'px';

    animationId = requestAnimationFrame(animate);
}

function stop(){
    btnPlay.style.display = 'block';
    btnStop.style.display = 'none';

    cancelAnimationFrame(animationId);
}

btnPlay.addEventListener('click', animate);

btnStop.addEventListener('click', stop);

window.addEventListener('resize', () => {
    const prevWidth = roadWidth;
    roadWidth = kepernyo.offsetWidth;
    x1 = x1 * (roadWidth / prevWidth);
    x2 = x2 * (roadWidth / prevWidth);
});