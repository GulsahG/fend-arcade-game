//Variables needed
let dieCount = 0;
let winCount = 0;
const scoreBoard = document.querySelector('#score-count');
const dieBoard = document.querySelector('#die-count');

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = 250;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-dalek.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // checks for collision with the player which leads to dying 
    if ((player.y >= this.y - 50 && player.y <= this.y + 50) && (player.x >= this.x - 50 && player.x <= this.x + 50)) {
        player.x = 210;
        player.y = 400;
        dieCount++;
        updateScore();
    };
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y, speed) {
    this.x = 210;
    this.y = 400;
    this.speed = speed;

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-11th-doctor.png';
};

// Update the player's position, required method for game
Player.prototype.update = function (dt) {
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > 400) {
        this.y = 400;
    }
    //if the player gets to the water, (s)he wins
     else if (this.y < 0) {
        this.x = 210;
        this.y = 400;
        winCount++;
        updateScore();
    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//implementing the keys to adjust the speed
Player.prototype.handleInput = function (keypress) {
    switch (keypress) {
        case 'left':
            this.x -= this.speed + 55;
            break;

        case 'down':
            this.y += this.speed + 35;
            break;

        case 'right':
            this.x += this.speed + 55;
            break;

        case 'up':
            this.y -= this.speed + 35;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

(function createEnemies() {
    'use strict';
    allEnemies.push(new Enemy(0, 100));
    allEnemies.push(new Enemy(0, 180));
    allEnemies.push(new Enemy(0, 260));

    window.setInterval(function () {
        allEnemies.splice(0, allEnemies.length);
        createEnemies();
    }, 2500);
}());

//updating the scoreBoard 
function updateScore() {
    scoreBoard.innerHTML = winCount;
    dieBoard.innerHTML = dieCount;
}

const player = new Player(210, 400, 50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});