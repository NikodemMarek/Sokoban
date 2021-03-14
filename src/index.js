import Game from './game/game.js';
import LevelProvider, { getLevelByDifficulty } from './board/levelProvider.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

new LevelProvider();
let game

let resetLevel = function() {
    let level = getLevelByDifficulty('easy')

    game = new Game(context, level);
    game.start();
}

document.getElementById('resetLevel').addEventListener('click', resetLevel);

resetLevel();