let score = document.querySelector('.score');
let startScreen = document.querySelector('.startScreen');
let gameArea = document.querySelector('.gameArea');

// console.log(gameArea);

startScreen.addEventListener('click', start);

let player = { speed: 8, score: 0 };

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isColiide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 800
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final score is " + player.score + " <br >Press Here to Start Again";
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isColiide(car, item)) {
            endGame();
        }
        if (item.y >= 700) {
            item.y = -350
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    // console.log("hi i am clicked");
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {
        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y > 40) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 100)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < road.width - 70) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";


        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps = player.score - 1;
        score.innerHTML = "Score: " + ps;
    }
}

function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log(car.offsetTop + "top");
    // console.log(car.offsetLeft + "left");

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        if (x == 1) {
            enemyCar.style.backgroundImage = "url('pitstop_car_2.png')";
        }
        else if (x == 2) {
            enemyCar.style.backgroundImage = "url('pitstop_car_5.png')";
        }
        else {

            enemyCar.style.backgroundImage = "url('pitstop_car_4.png')";
        }
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.y = (x * 300);
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

}
