import Game from './game/game.js';
import LevelProvider, { getLevelByDifficulty } from './board/levelProvider.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

new LevelProvider(() => {
    let game
    let level = getLevelByDifficulty('easy')['level'];

    let resetLevel = function() {
        game = new Game(context, JSON.parse(JSON.stringify(level)));
        game.start();
    }

    document.getElementById('resetLevel').addEventListener('click', resetLevel);

    resetLevel();
});