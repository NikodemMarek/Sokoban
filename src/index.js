import Game from './game/game.js';
import LevelProvider, { getLevelByDifficulty } from './board/levelProvider.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

new LevelProvider(() => {
    let selectedDifficulty = 'easy';

    let level = getLevelByDifficulty(selectedDifficulty)['level'];
    let game = new Game(context, JSON.parse(JSON.stringify(level)));

    let resetGame = function() {
        game = new Game(context, JSON.parse(JSON.stringify(level)));
        game.start();
    }

    // reset level button click listener
    document.getElementById('resetLevel').addEventListener('click', resetGame);
    // undo move button click listener
    document.getElementById('undoMove').addEventListener('click', () => {
        game.undoMove();
    });
    // get new random level
    document.getElementById('randomLevel').addEventListener('click', () => {
        level = getLevelByDifficulty(selectedDifficulty)['level'];
        resetGame();
    });

    // change difficulty level click listeners
    document.getElementById('easyLevel').addEventListener('click', () => {
        selectedDifficulty = 'easy';
        level = getLevelByDifficulty('easy')['level'];
        resetGame();
    });
    document.getElementById('intermediateLevel').addEventListener('click', () => {
        selectedDifficulty = 'intermediate';
        level = getLevelByDifficulty('intermediate')['level'];
        resetGame();
    });
    document.getElementById('hardLevel').addEventListener('click', () => {
        selectedDifficulty = 'hard';
        level = getLevelByDifficulty('hard')['level'];
        resetGame();
    });

    resetGame();
});