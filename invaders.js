const enemyimg = new Image();
enemyimg.src = 'images/ufo.png';

const playerimg = new Image();
playerimg.src = 'images/spaceship.png';

const ruimteimg = new Image();
ruimteimg.src = 'images/ruimte.jpg';

class Bullet {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        this.y -=10;
    }

    draw(context) {
        context.fillStyle = "pink";
        context.beginPath();
        context.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
        context.fill();
    }
}

let bullets = [];

class Enemy {
    x;
    y;
    health;
    cooldown;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 20;
        this.cooldown = 0;
    }

    draw(context) {
        if(this.health > 0) {
            context.drawImage(enemyimg, this.x, this.y, 50, 50);
        }
    }

    update() {
        if(this.cooldown == 0) {
            this.x += Math.random() * 20 - 10;
            if(this.x <= 0) {
                this.x += 10;
            }
            if(this.x >= 750) {
                this.x -= 10;
            }

            this.y += Math.random() * 20 - 10;
            if(this.y <=0) {
                this.y += 10;
            }
            if(this.y >= 550) {
                this.y -= 10;
            }
            this.cooldown = 10;
        }
        this.cooldown--;
    }
    hit(bullet) {
        if(bullet.x >= this.x && bullet.x <= this.x + 50 && bullet.y >= this.y && bullet.y <= this.y + 50) {
            this.health -= 10;
        }
    }
}

let enemies = [];

let player = {
    x: 400,
    y: 580,
    cooldown: 0,

    update: function() {
        if(keys.left && this.x > 10) {
            this.x -= 10;
        }

    if(keys.right && this.x < 790){
            this.x += 10;
        }

    if(keys.up && this.y > 0){
            this.y -= 10;
        }

    if(keys.down && this.y < 580){
            this.y += 10;
        }
    if(this.cooldown > 0) {
        this.cooldown --;
    }
    },

    draw: function(context) {
        context.drawImage(playerimg, this.x - 25, this.y - 10, 50, 50);
    },

    shoot: function() {
        this.cooldown = 15;
        return new Bullet(this.x, this.y);
    }

};

let keys = {
    up: false,
    down: false,
    right: false,
    left: false,
    shoot: false
}

function update() {
    player.update();

    if(keys.shoot && player.cooldown == 0) {
        let bullet = player.shoot();
        bullets.push(bullet);
    }

    for(let index = 0; index < bullets.length; index++) {
        if(bullets[index].y < 0) {
            bullets.splice(index, 1);
        } else {
            bullets[index].y -= 11;
        }
    }

    for(let index = 0; index < enemies.length; index++) {
        enemies[index].update();
        for(let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
            enemies[index].hit(bullets[bulletIndex]);
        }
    }

    drawPlayer();
}

function setup() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');


    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);


    context.fillStyle = 'White';
    context.font = '48px Roboto';
    context.fillText('Space Invaders', 10, 50);

    const enemy = new Enemy(20,20);
    enemies.push(enemy);
}

function drawPlayer() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = "blue";
    context.fillRect(0, 0, 800, 600);
    context.drawImage(ruimteimg, 0, 0, 800, 600);

    player.draw(context);

    for(let index = 0; index < enemies.length; index++) {
        enemies[index].draw(context);
    }

    for(let index = 0; index < bullets.length; index++) {
        bullets[index].draw(context);
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
            keys.shoot = true;
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
        case " ":
            keys.shoot = false;
            break;
    }
}

window.addEventListener("load", setup);
window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", keyUp);

setInterval(update, 50);