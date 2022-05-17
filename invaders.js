let player = {
    x: 400,
    y: 580
};

function setup() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');


    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);


    context.fillStyle = 'White';
    context.font = '48px Roboto';
    context.fillText('Space Invaders', 10, 50);

    drawPlayer();
}

function drawPlayer() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);

    context.fillStyle = '#69a7ff';
    // context.fillRect(390, 580, 20, 20)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 10, player.y + 20);
    context.lineTo(player.x + 10, player.y + 20);
    context.fill();
}

function movePlayer(event) {
    switch(event.key){
        case "ArrowLeft":
            player.x -= 10;
            drawPlayer();
            break;
        case "ArrowRight":
            player.x += 10;
            drawPlayer();
            break;
        case "ArrowUp":
            player.y -= 10;
            drawPlayer();
            break;
        case "ArrowDown":
            player.y += 10;
            drawPlayer();
            break;
    }
    if(player.y <= 480){
        player.y = 490;
        drawPlayer();
    } 
    if(player.y >= 590){
        player.y = 580;
        drawPlayer();
    } 

    if(player.x <= 0){
        player.x = 10;
        drawPlayer();
    }
    if(player.x >= 800){
        player.x = 790;
        drawPlayer();
    }
}

window.addEventListener("load", setup);
window.addEventListener("keydown", movePlayer)