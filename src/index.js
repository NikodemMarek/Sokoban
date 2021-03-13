import Game from './game/game.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let game = new Game(context);
game.start();

let resetLevel = function() {
    game = new Game(context);
    game.start();
}

document.getElementById('resetLevel').addEventListener('click', resetLevel);