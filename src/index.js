import Game, { start as startGame, stop as stopGame, undoMove } from '/src/game/game.js'
import LevelProvider, { getLevelByDifficulty, getLevelByLevelNumber } from '/src/board/levelProvider.js'
import { calculateScore } from '/src/game/scoreCounter.js'
import ScoreHolder, { pushScore, removeScore } from '/src/board/scoreHolder.js'
import { saveGame, readGames } from '/src/storage/gameSaver.js'
import CanvasImage from '/src/canvas/canvasImage.js'
import { readScoreboard, updateScoreboard } from '/src/storage/scoreboard.js'
import LevelBuilder, { start as startLevelBuilder, stop as stopLevelBuilder } from '/src/board/levelBuilder.js'
import { saveLevel } from '/src/storage/levelSaver.js'

new LevelProvider(() => {
    const gamemodes = Object.freeze({
        BY_DIFFICULTY: 0,
        LEVELS: 1,
        CUSTOM: 2
    });
    let gamemode = gamemodes.BY_DIFFICULTY;
    
    // html elements
    let canvas = document.getElementById('c_game_screen');

    let menu = document.getElementById('menu');

    let sideMenu = document.getElementById('side_menu');
    let sideMenuForm = document.getElementById('side_menu_form');
    let iSideMenuInput = document.getElementById('i_side_menu_input');
    let bSideMenuConfirm = document.getElementById('b_side_menu_confirm');
    let bSideMenuCancel = document.getElementById('b_side_menu_cancel');
    let sideMenuList = document.getElementById('side_menu_list');

    let gameObjects = document.getElementById('game_objects');

    let iEmpty = document.getElementById('i_empty');
    let iWall = document.getElementById('i_wall');
    let iTarget = document.getElementById('i_target');
    let iBox = document.getElementById('i_box');
    let iWorker = document.getElementById('i_worker');

    let sTotalScore = document.getElementById('s_total_score');
    let sTotalScoreLabel = document.getElementById('s_total_score_label');
    let sMovesNumber = document.getElementById('s_moves_number');
    let sMovesNumberLabel = document.getElementById('s_moves_number_label');

    let bResetLevel = document.getElementById('b_reset_level');
    let bUndoMove = document.getElementById('b_undo_move');
    let bChangeGamemode = document.getElementById('b_change_gamemode');
    
    let bRandomLevel = document.getElementById('b_random_level');

    let bNextLevel = document.getElementById('b_next_level');
    let bSaveGame = document.getElementById('b_save_game');
    let bReadGame = document.getElementById('b_read_game')
    let bOpenScoreboard = document.getElementById('b_open_scoreboard');

    let bCreateLevel = document.getElementById('b_create_level');

    let byDifficultyModeMenu = document.getElementById('by_difficulty_mode');
    let bEasyLevel = document.getElementById('easy_level');
    let bIntermediateLevel = document.getElementById('intermediate_level');
    let bHardLevel = document.getElementById('hard_level');
    
    let levelsModeMenu = document.getElementById('levels_mode');

    let context = canvas.getContext('2d');
    
    let canvasImage = new CanvasImage(context);

    let selectedDifficulty = 'easy';
    let currentLevel = 0;

    let scoreHolder = new ScoreHolder();

    let movesUndone = 0;

    let level
    let game

    let levelBuilder
    
    let levelsColors = [
        '#59b300', '#66cc00', '#73e600', '#80ec13', '#99f042',
        '#a6f655', '#d7fb6a', '#f0f986', '#ffff4d', '#ffff00',
        '#f2f20d', '#ffd11a', '#ffbf00', '#ff8000', '#ff4000',
        '#ff0000', '#e60000', '#cc0000', '#b30000', '#990000'
    ];

    function setGamemode(gamemodeToSet) {
        switch(gamemode) {
            case gamemodes.BY_DIFFICULTY:
                byDifficultyModeMenu.style.display = 'none';
                bRandomLevel.style.display = 'none';
                break;
            case gamemodes.LEVELS:
                levelsModeMenu.style.display = 'none';

                sTotalScore.style.display = 'none';
                sTotalScoreLabel.style.display = 'none';
                
                bNextLevel.style.display = 'none';
                bSaveGame.style.display = 'none';
                bReadGame.style.display = 'none';
                bOpenScoreboard.style.display = 'none';
                break;
            case gamemodes.CUSTOM:
                bCreateLevel.style.display = 'none';
                gameObjects.style.display = 'none';

                sMovesNumber.style.display = 'inline';
                sMovesNumberLabel.style.display = 'inline';
                break;
        }

        gamemode = gamemodeToSet;
        switch(gamemode) {
            case gamemodes.BY_DIFFICULTY:
                byDifficultyModeMenu.style.display = 'inline';
                bRandomLevel.style.display = 'inline';

                bResetLevel.style.display = 'inline';
                bUndoMove.style.display = 'inline';
                bChangeGamemode.style.display = 'inline';

                sMovesNumber.style.display = 'inline';
                sMovesNumberLabel.style.display = 'inline';
                
                level = getLevelByDifficulty(selectedDifficulty)['level'];
                resetGame();
                break;
            case gamemodes.LEVELS:
                levelsModeMenu.style.display = 'inline';

                bResetLevel.style.display = 'inline';
                bUndoMove.style.display = 'inline';
                bChangeGamemode.style.display = 'inline';
    
                sTotalScore.style.display = 'inline';
                sTotalScoreLabel.style.display = 'inline';
                sMovesNumber.style.display = 'inline';
                sMovesNumberLabel.style.display = 'inline';
    
                bSaveGame.style.display = 'inline';
                bReadGame.style.display = 'inline';
                bOpenScoreboard.style.display = 'inline';

                level = getLevelByLevelNumber(0)['level'];
                resetGame();
                break;
            case gamemodes.CUSTOM:
                bCreateLevel.style.display = 'inline';
                break;
        }
    }

    function onVictory(movesMade, movesUndone) {
        let score = calculateScore(1, movesMade, movesUndone);
        if(gamemode == gamemodes.LEVELS) {
            bNextLevel.style.display = 'inline';
            sTotalScore.innerText = pushScore(scoreHolder, currentLevel, score);
        }
        
        return score;
    }

    function resetGame() {
        stopGame(game);
        game = new Game(context, canvasImage, JSON.parse(JSON.stringify(level)), onVictory);

        sTotalScore.innerText = scoreHolder.totalScore;
        startGame(game);
    }

    function createSideMenu(
        isInput,
        pauseGame,
        pauseLevelBuilder,
        closeOnButtonClick,
        listData,
        dataFormat,
        onButtonClick,
        confirmButtonLabel,
        onConfirm
    ) {
        if(pauseGame) stopGame(game);
        if(pauseLevelBuilder) stopLevelBuilder(levelBuilder);

        menu.style.display = 'none';
        sideMenu.style.display = 'inline';
        if(isInput) sideMenuForm.style.display = 'inline';

        while(sideMenuList.firstChild) sideMenuList.removeChild(sideMenuList.firstChild);

        listData.forEach((data, index) => {
            let button = document.createElement('button');
            button.innerText = dataFormat(data, index);
            button.style.width = '200px';
            button.style.height = '50px';
            button.style.border = 'none';
            button.style.backgroundColor = 'gray';

            button.addEventListener('mouseenter', () => { button.style.backgroundColor = 'gainsboro'; });
            button.addEventListener('mouseleave', () => { button.style.backgroundColor = 'gray'; });

            button.addEventListener('click', () => {
                onButtonClick(data);

                if(closeOnButtonClick) {
                    iSideMenuInput.value = '';
                    menu.style.display = 'inline';
                    sideMenu.style.display = 'none';
                    sideMenuForm.style.display = 'none';

                    if(pauseGame) startGame(game);
                    if(pauseLevelBuilder) startLevelBuilder(levelBuilder);
                }
            });
    
            sideMenuList.appendChild(button);
        });

        if(isInput) {
            bSideMenuConfirm.innerText = confirmButtonLabel;
            bSideMenuConfirm.addEventListener('click', () => {
                if(iSideMenuInput.value != '') onConfirm(iSideMenuInput.value);
        
                iSideMenuInput.value = '';
                menu.style.display = 'inline';
                sideMenu.style.display = 'none';
                sideMenuForm.style.display = 'none';

                if(pauseGame) startGame(game);
                if(pauseLevelBuilder) startLevelBuilder(levelBuilder);
            });
        }

        bSideMenuCancel.addEventListener('click', () => {
            iSideMenuInput.value = '';
            menu.style.display = 'inline';
            sideMenu.style.display = 'none';
            sideMenuForm.style.display = 'none';

            if(pauseGame) startGame(game);
            if(pauseLevelBuilder) startLevelBuilder(levelBuilder);
        });
    }

    function init() {
        level = getLevelByDifficulty(selectedDifficulty)['level'];
        game = new Game(context, canvasImage, JSON.parse(JSON.stringify(level)), onVictory);

        for(let i = 1; i <= 20; i ++) {
            let levelButton = document.createElement('button');
            levelButton.innerText = i;
            levelButton.style.width = '45px';
            levelButton.style.height = '45px';
            levelButton.style.border = 'none';
            levelButton.style.backgroundColor = levelsColors[i - 1];
    
            levelsModeMenu.appendChild(levelButton);
        }
    
        startGame(game);
    }

    // reset level button click listener
    bResetLevel.addEventListener('click', () => {
        if(gamemode == gamemodes.LEVELS) {
            removeScore(scoreHolder, currentLevel);
            sTotalScore.innerText = scoreHolder.totalScore;
        }
        resetGame();
    });
    // undo move button click listener
    bUndoMove.addEventListener('click', () => { undoMove(game); });
    // switch game mode, BY_DIFFICULTY -> LEVELS -> CUSTOM -> BY_DIFFICULTY
    bChangeGamemode.addEventListener('click', () => {
        switch(gamemode) {
            case gamemodes.BY_DIFFICULTY:
                setGamemode(gamemodes.LEVELS);
                break;
            case gamemodes.LEVELS:
                setGamemode(gamemodes.CUSTOM);
                break;
            case gamemodes.CUSTOM:
                setGamemode(gamemodes.BY_DIFFICULTY);
                break;
        }
    });

    // get new random level
    bRandomLevel.addEventListener('click', () => {
        level = getLevelByDifficulty(selectedDifficulty)['level'];
        resetGame();
    });
    bNextLevel.addEventListener('click', () => {
        level = getLevelByLevelNumber(++ currentLevel)['level'];
        resetGame();
        bNextLevel.style.display = 'none';
    });

    bSaveGame.addEventListener('click', () => {
            createSideMenu(
                true, true, false, false,
                readGames(),
                (save, index) => save['name'],
                (save) => { iSideMenuInput.value = save['name']; },
                'Zapisz',
                (inputValue) => {
                    saveGame(
                        inputValue,
                        currentLevel,
                        game.worker,
                        game.boxes,
                        game.movesMade,
                        movesUndone,
                        scoreHolder.totalScore
                    );
                }
            )
        }
    );
    bReadGame.addEventListener('click', () => {
            createSideMenu(
                false, true, false, true,
                readGames(),
                (save, index) => save['name'],
                (save) => {
                    let saveData = JSON.parse(save['data']);
                    scoreHolder.score = saveData['score'];

                    level = getLevelByLevelNumber(saveData['currentLevel'])['level'];
                    game = new Game(
                        context,
                        canvasImage,
                        {
                            'board': level['board'],
                            'worker': saveData['worker'],
                            'boxes': saveData['boxes']
                        },
                        onVictory,
                        saveData['movesMade'],
                        saveData['movesUndone']
                    );
                    sTotalScore.innerText = scoreHolder.score;
                }
            )
        }
    );
    bOpenScoreboard.addEventListener('click', () => {
            createSideMenu(
                true, true, false, false,
                readScoreboard(),
                (score, index) => index + 1 + '. ' + score['name'] + ' - ' + score['score'],
                (data) => {},
                'Dodaj wynik',
                (inputValue) => { updateScoreboard(inputValue, scoreHolder.totalScore); }
            )
        }
    );

    bCreateLevel.addEventListener('click', () => {
        stopGame(game);

        gameObjects.style.display = 'inline';

        sMovesNumber.style.display = 'none';
        sMovesNumberLabel.style.display = 'none';

        levelBuilder = new LevelBuilder(context, canvasImage);

        iEmpty.addEventListener('click', () => levelBuilder.object = 'e');
        iWall.addEventListener('click', () => levelBuilder.object = 'w');
        iTarget.addEventListener('click', () => levelBuilder.object = 't');
        iBox.addEventListener('click', () => levelBuilder.object = 'b');
        iWorker.addEventListener('click', () => levelBuilder.object = 'p');

        createSideMenu(
            true, false, false, false,
            ['game1', 'game2'],
            (game, index) => game,
            (game) => { iSideMenuInput.value = game; },
            'Zapisz poziom',
            (inputValue) => {
                if(
                    inputValue != '' &&
                    typeof levelBuilder.worker != 'undefined' &&
                    levelBuilder.targetsNumber >= levelBuilder.boxes.boxes.length
                ) saveLevel(
                    inputValue,
                    levelBuilder.board,
                    levelBuilder.boxes,
                    levelBuilder.worker
                );
            }
        )
    });

    // change difficulty level click listeners
    bEasyLevel.addEventListener('click', () => {
        selectedDifficulty = 'easy';
        level = getLevelByDifficulty('easy')['level'];
        resetGame();
    });
    bIntermediateLevel.addEventListener('click', () => {
        selectedDifficulty = 'intermediate';
        level = getLevelByDifficulty('intermediate')['level'];
        resetGame();
    });
    bHardLevel.addEventListener('click', () => {
        selectedDifficulty = 'hard';
        level = getLevelByDifficulty('hard')['level'];
        resetGame();
    });

    init();
});