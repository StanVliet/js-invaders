let player = {
    x: 400,
    y: 580
};

let bullets = [];

let keys = {
    up: false,
    down: false,
    right: false,
    left: false
}

function update() {
    if(keys.left) {
        if(player.x > 10) {
            player.x -= 10;
        }
    }
    if(keys.right) {
        if(player.x < 790){
            player.x += 10;
        }
    }
    if(keys.up) {
        if(player.y > 0){
            player.y -= 10;
        }
    }
    if(keys.down) {
        if(player.y < 580){
            player.y += 10;
        }
    }

    for(let index = 0; index < bullets.length; index++) {
        if(bullets[index].y < 0) {
            bullets.splice(index, 1);
        } else {
            bullets[index].y -= 11;
        }
    }
    drawPlayer()
}

function setup() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');


    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);


    context.fillStyle = 'White';
    context.font = '48px Roboto';
    context.fillText('Space Invaders', 10, 50);
}

function drawPlayer() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);

    context.fillStyle = "lightgreen";
    // context.fillRect(390, 580, 20, 20)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 10, player.y + 20);
    context.lineTo(player.x + 10, player.y + 20);
    context.fill();

    for(let index = 0; index < bullets.length; index++) {
        context.fillStyle = "green";
        context.beginPath();
        context.arc(bullets[index].x, bullets[index].y, 3.5, 0, Math.PI * 2);
        context.fill();
    }
}

function movePlayer(event) {
    switch(event.key){
        case "ArrowLeft":
            keys.left = true;
            break;
        case "ArrowRight":
            keys.right = true;
            break;
        case "ArrowUp":
            keys.up = true;
            break;
        case "ArrowDown":
            keys.down = true;
            break;

        case " ":
            bullets.push( {
                x: player.x, 
                y: player.y
            } );
            break;
    }
}

function keyUp(event) {
    switch(event.key){
        case "ArrowLeft":
            keys.left = false;
            break;
        case "ArrowRight":
            keys.right = false;
            break;
        case "ArrowUp":
            keys.up = false;
            break;
        case "ArrowDown":
            keys.down = false;
            break;
    }
}

window.addEventListener("load", setup);
window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", keyUp);

setInterval(update, 50);