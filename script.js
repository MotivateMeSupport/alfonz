const road1 = document.getElementById('road1');
const road2 = document.getElementById('road2');
const btnPlay = document.getElementById('imgPlay');
const btnStop = document.getElementById('imgStop');

let animationId;

let x1 = 0;
let x2 = 800;

function animate() {
    btnPlay.style.display = 'none';
    btnStop.style.display = 'block';
    const speed = 2;

    x1 -= speed;
    x2 -= speed;

    if (x1 <= -800) x1 = x2 + 800;
    if (x2 <= -800) x2 = x1 + 800;

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