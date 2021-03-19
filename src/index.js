import Game from './game/game.js';
import LevelProvider, { getLevelByDifficulty, getLevelByLevelNumber } from './board/levelProvider.js'

const gamemodes = Object.freeze({
    BY_DIFFICULTY: 0,
    LEVELS: 1
});
let gamemode = gamemodes.BY_DIFFICULTY;

let canvas = document.getElementById('c_game_screen');
let context = canvas.getContext('2d');

new LevelProvider(() => {
    let selectedDifficulty = 'easy';

    let level = getLevelByDifficulty(selectedDifficulty)['level'];
    let game = new Game(context, JSON.parse(JSON.stringify(level)));

    let resetGame = function() {
        game = new Game(context, JSON.parse(JSON.stringify(level)));
        game.start();
    }

    let levelsColors = [
        'darkgreen', 'green', 'forestgreen', 'limegreen', 'lime', 'lawngreen', 'greenyellow', 'yellowgreen', 'lightgreen',
        'khaki', 'yellow', 'orange', 'darkorange', 'orangered', 'lightsalmon', 'salmon', 'tomato', 'red', 'darkred', 'dimgray'
    ];

    let levelsMode = document.getElementById('levels_mode');
    for(let i = 1; i <= 20; i ++) {
        let levelButton = document.createElement('button');
        levelButton.innerText = i;
        levelButton.style.width = '45px';
        levelButton.style.height = '45px';
        levelButton.style.border = 'none';
        levelButton.style.backgroundColor = levelsColors[i - 1];

        levelsMode.appendChild(levelButton);
    }

    // reset level button click listener
    document.getElementById('b_reset_level').addEventListener('click', resetGame);
    // undo move button click listener
    document.getElementById('b_undo_move').addEventListener('click', () => {
        game.undoMove();
    });
    // get new random level
    document.getElementById('b_random_level').addEventListener('click', () => {
        level = getLevelByDifficulty(selectedDifficulty)['level'];
        resetGame();
    });

    // switch game mode, BY_DIFFICULTY -> LEVELS -> BY_DIFFICULTY
    document.getElementById('b_change_gamemode').addEventListener('click', () => {
        if(gamemode == gamemodes.BY_DIFFICULTY) {
            gamemode = gamemodes.LEVELS;
            document.getElementById('by_difficulty_mode').style.display = 'none';
            document.getElementById('levels_mode').style.display = 'inline';

            level = getLevelByLevelNumber(0)['level'];
            resetGame();
        } else {
            gamemode = gamemodes.BY_DIFFICULTY;
            document.getElementById('by_difficulty_mode').style.display = 'inline';
            document.getElementById('levels_mode').style.display = 'none';
        }
    });

    // change difficulty level click listeners
    document.getElementById('easy_level').addEventListener('click', () => {
        selectedDifficulty = 'easy';
        level = getLevelByDifficulty('easy')['level'];
        resetGame();
    });
    document.getElementById('intermediate_level').addEventListener('click', () => {
        selectedDifficulty = 'intermediate';
        level = getLevelByDifficulty('intermediate')['level'];
        resetGame();
    });
    document.getElementById('hard_level').addEventListener('click', () => {
        selectedDifficulty = 'hard';
        level = getLevelByDifficulty('hard')['level'];
        resetGame();
    });

    resetGame();
});