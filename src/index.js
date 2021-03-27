/**
 * @module index
 */

import Game, { start as startGame, stop as stopGame, undoMove } from '/src/game/game.js'
import LevelProvider, { getLevelByDifficulty, getLevelByLevelNumber, getCustomLevelsNames, getCustomLevel, readCustomLevels } from '/src/board/levelProvider.js'
import { calculateScore } from '/src/game/scoreCounter.js'
import ScoreHolder, { pushScore, removeScore } from '/src/board/scoreHolder.js'
import { saveGame, readGames, readCustomGames, saveCustomGame } from '/src/storage/gameSaver.js'
import CanvasImage from '/src/canvas/canvasImage.js'
import { readScoreboard, updateScoreboard } from '/src/storage/scoreboard.js'
import LevelBuilder, { start as startLevelBuilder, stop as stopLevelBuilder } from '/src/board/levelBuilder.js'
import { saveLevel, removeLevel } from '/src/storage/levelSaver.js'

/**
 * Pozycja na planszy, wymiary są podane w ilości elementów od boku planszy.
 * @typedef {{ x: number, y: number }} Position
 */

/**
 * Funkcja formatująca dane z dowolnej postaci do tekstu.
 * @name FormatData
 * @function
 * @param {*} data - Dane do sformatowania
 * @param {number} index - Numer obecnie formatowanych danych
 */
/**
 * Funkcja wykonująca się po naciśnięciu przycisku z listy w bocznym menu.
 * @name OnSideMenuButtonClick
 * @function
 * @param {*} data - Dane kryjące się za naciśniętym przyciskiem
 */
/**
 * Funkcja wykonująca się po naciśnięciu przycisku potwierdzenia w bocznym menu.
 * @name OnSideMenuConfirm
 * @function
 * @param {string} inputValue - Tekst wpisany do pola tekstowego
 */

/**
 * Enum z identyfikatorami stworzonych trybów gry.
 * @readonly
 * @enum {number}
 */
const gamemodes = Object.freeze({
    BY_DIFFICULTY: 0,
    LEVELS: 1,
    CUSTOM: 2
});
/**
 * Obecny tryb gry.
 * @type {number}
 */
let gamemode = gamemodes.BY_DIFFICULTY;

/**
 * Canvas w którym jest rysowana gra.
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById('c_game_screen');

/**
 * Główne menu z boku ekranu.
 * @type {HTMLDivElement}
 */
let menu = document.getElementById('menu');

/**
 * Pojemnik na boczne menu.
 * @type {HTMLDivElement}
 */
let sideMenu = document.getElementById('side_menu');
/**
 * Pojemnik na formę do wpisywania w bocznym menu.
 * @type {HTMLDivElement}
 */
let sideMenuForm = document.getElementById('side_menu_form');
/**
 * Pole tekstowe w bocznym menu.
 * @type {HTMLInputElement}
 */
let iSideMenuInput = document.getElementById('i_side_menu_input');
/**
 * Przycisk potwierdzający wybór, pod polem tekstowym w bocznym menu.
 * @type {HTMLButtonElement}
 */
let bSideMenuConfirm = document.getElementById('b_side_menu_confirm');
/**
 * Przycisk zamykający boczne menu, na samym dole bocznego menu.
 * @type {HTMLButtonElement}
 */
let bSideMenuCancel = document.getElementById('b_side_menu_cancel');
/**
 * Lista przycisków pojawiająca się po otwarciu bocznego menu.
 * @type {HTMLDivElement}
 */
let sideMenuList = document.getElementById('side_menu_list');

/**
 * Menu z elementami gry do wyboru, w trybie tworzenia poziomu.
 * @type {HTMLDivElement}
 */
let gameObjects = document.getElementById('game_objects');

/**
 * Pusty element, usuwający wszystko w trybie tworzenia poziomu.
 * @type {HTMLImageElement}
 */
let iEmpty = document.getElementById('i_empty');
/**
 * Ściana możliwa do postawienia trybie tworzenia poziomu.
 * @type {HTMLImageElement}
 */
let iWall = document.getElementById('i_wall');
/**
 * Cel możliwy do postawienia trybie tworzenia poziomu.
 * @type {HTMLImageElement}
 */
let iTarget = document.getElementById('i_target');
/**
 * Pudełko możliwe do postawienia trybie tworzenia poziomu.
 * @type {HTMLImageElement}
 */
let iBox = document.getElementById('i_box');
/**
 * Magazynier możliwy do postawienia trybie tworzenia poziomu.
 * @type {HTMLImageElement}
 */
let iWorker = document.getElementById('i_worker');

/**
 * Całkowity wynik zdobyty w 2 trybie gry.
 * @type {HTMLSpanElement}
 */
let sTotalScore = document.getElementById('s_total_score');
/**
 * Podpis całkowitego wyniku zdobytyego w 2 trybie gry.
 * @type {HTMLSpanElement}
 */
let sTotalScoreLabel = document.getElementById('s_total_score_label');
/**
 * Ilości ruchów zrobionych przez magazyniera.
 * @type {HTMLSpanElement}
 */
let sMovesNumber = document.getElementById('s_moves_number');
/**
 * Podpis ilości ruchów zrobionych przez magazyniera.
 * @type {HTMLSpanElement}
 */
let sMovesNumberLabel = document.getElementById('s_moves_number_label');

/**
 * Przycisk resetujący obecnie rozgrywany poziom.
 * @type {HTMLButtonElement}
 */
let bResetLevel = document.getElementById('b_reset_level');
/**
 * Przycisk cofający ruch.
 * @type {HTMLButtonElement}
 */
let bUndoMove = document.getElementById('b_undo_move');
/**
 * Przycisk zmieniający tryb gry na kolejny.
 * @type {HTMLButtonElement}
 */
let bChangeGamemode = document.getElementById('b_change_gamemode');

/**
 * Przycisk zmieniający poziom na losowy, z wybranego poziomu trudności, w 1 trybie gry.
 * @type {HTMLButtonElement}
 */
let bRandomLevel = document.getElementById('b_random_level');

/**
 * Przycisk zmieniający poziom na koolejny, w 2 trybie gry.
 * Pojawia się tylko, jeśli obecnie rozgrywany poziom zostanie wygrany.
 * @type {HTMLButtonElement}
 */
let bNextLevel = document.getElementById('b_next_level');
/**
 * Przycisk zapisujący obecnie rozgrywany poziom, w 2 i 3 trybie gry.
 * @type {HTMLButtonElement}
 */
let bSaveGame = document.getElementById('b_save_game');
/**
 * Przycisk wczytujący zapisane gry, w 2 i 3 trybie gry.
 * @type {HTMLButtonElement}
 */
let bReadGame = document.getElementById('b_read_game');
/**
 * Przycisk otwierający ranking, w 2 trybie gry.
 * @type {HTMLButtonElement}
 */
let bOpenScoreboard = document.getElementById('b_open_scoreboard');

/**
 * Przycisk włączający tworzenie poziomu, w 3 trybie gry.
 * @type {HTMLButtonElement}
 */
let bCreateLevel = document.getElementById('b_create_level');
/**
 * Przycisk otwierający menu pozwalające na usuwanie poziomu, w 3 trybie gry.
 * @type {HTMLButtonElement}
 */
let bRemoveLevel = document.getElementById('b_remove_level');
/**
 * Przycisk wczytujący zapisany poziom, w 3 trybie gry.
 * @type {HTMLButtonElement}
 */
let bReadLevel = document.getElementById('b_read_level');

/**
 * Menu z wyborem poziomu trudności, w 1 trybie gry.
 * @type {HTMLDivElement}
 */
let byDifficultyModeMenu = document.getElementById('by_difficulty_mode');
/**
 * Przycisk zmieniający poziom trudności na łatwy, w 1 trybie gry.
 * @type {HTMLButtonElement}
 */
let bEasyLevel = document.getElementById('easy_level');
/**
 * Przycisk zmieniający poziom trudności na średniozaawansowany, w 1 trybie gry.
 * @type {HTMLButtonElement}
 */
let bIntermediateLevel = document.getElementById('intermediate_level');
/**
 * Przycisk zmieniający poziom trudności na trudny, w 1 trybie gry.
 * @type {HTMLButtonElement}
 */
let bHardLevel = document.getElementById('hard_level');

/**
 * Menu z poziomami dostępnymi w 2 trybie gry.
 * @type {HTMLDivElement}
 */
let levelsModeMenu = document.getElementById('levels_mode');

/**
 * Context w którym renderowana jest gra.
 * @type {CanvasRenderingContext2D}
 */
let context = canvas.getContext('2d');

/**
 * Obiekt klasy pozwalającej na ryzowanie obrazów w contexcie.
 * @type {CanvasImage}
 */
let canvasImage = new CanvasImage(context);

/**
 * Obecnie wybrany poziom trudności, w 1 trybie gry.
 * @type {string}
 */
let selectedDifficulty = 'easy';
/**
 * Obecnie rozgrywany poziom, w 2 trybie gry.
 * @type {string}
 */
let currentLevel = 0;

/**
 * Obiekt przechowywujący obecny wynik, w 2 poziomie trudności.
 * @type {ScoreHolder}
 */
let scoreHolder = new ScoreHolder();

/**
 * Cofnięte ruchy w obecnie rozgrywanym poziomie.
 * @type {number}
 */
let movesUndone = 0;

/**
 * Dane obecnie rozgrywanego poziomu.
 * @type {{
 *      name: string,
 *      level: levelProvider:Level
 * }}
 */
let level
/**
 * Obecnie działająca gra.
 * @type {Game}
 */
let game

/**
 * Obecnie działający kreator poziomów.
 * @type {LevelBuilder}
 */
let levelBuilder

/**
 * Tablica kolorów dla menu poziomów, w 2 trybie.
 * @type {Array.<string>}
 */
let levelsColors = [
    '#59b300', '#66cc00', '#73e600', '#80ec13', '#99f042',
    '#a6f655', '#d7fb6a', '#f0f986', '#ffff4d', '#ffff00',
    '#f2f20d', '#ffd11a', '#ffbf00', '#ff8000', '#ff4000',
    '#ff0000', '#e60000', '#cc0000', '#b30000', '#990000'
];

/**
 * Funkcja która ukrywa z wszystkie niepotrzebne elementy na ekranie i pokazuje te które są potrzebne na wybranym trybie gry.
 * @param {number} gamemodeToSet - Tryb gry który zostanie ustawiony
 */
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
            bSaveGame.style.display = 'none';
            bReadGame.style.display = 'none';
            bCreateLevel.style.display = 'none';
            bRemoveLevel.style.display = 'none';
            bReadLevel.style.display = 'none';
            gameObjects.style.display = 'none';

            sMovesNumber.style.display = 'inline';
            sMovesNumberLabel.style.display = 'inline';
            
            if(typeof levelBuilder != 'undefined') stopLevelBuilder(levelBuilder);
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
            
            level = getLevelByDifficulty(selectedDifficulty);
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

            level = getLevelByLevelNumber(0);
            resetGame();
            break;
        case gamemodes.CUSTOM:
            bSaveGame.style.display = 'inline';
            bReadGame.style.display = 'inline';
            bCreateLevel.style.display = 'inline';
            bRemoveLevel.style.display = 'inline';
            bReadLevel.style.display = 'inline';

            stopGame(game);
            game = undefined;
            canvasImage.drawBackground();
            break;
    }
}

/**
 * Funkcja która zostaje wykonana po wygraniu poziomu.
 * Liczy wynik i dodaje go do całkowitego wyniku, w 2 trybie gry.
 * Pokazuje przycisk następnego poziomu.
 * @see {@link game:victory}
 * @see {@link scoreHolder:ScoreHolder}
 * @param {number} movesMade - Ruchy wykonane przez magazyniera w obecnej grze
 * @param {number} movesUndone - Ruchy cofnięte przez gracza podczas rozgrywki
 * @returns {number} Wynik uzyskany przez gracza w obecnej grze
 */
function onVictory(movesMade, movesUndone) {
    let score = calculateScore(1, movesMade, movesUndone);
    if(gamemode == gamemodes.LEVELS) {
        bNextLevel.style.display = 'inline';
        sTotalScore.innerText = pushScore(scoreHolder, currentLevel, score);
    }
    
    return score;
}

/**
 * Funkcja resetuje grę.
 * @see {@link game:Game}
 */
function resetGame() {
    stopGame(game);
    game = new Game(context, canvasImage, JSON.parse(JSON.stringify(level['level'])), onVictory);

    sTotalScore.innerText = scoreHolder.totalScore;
    startGame(game);
}

/**
 * Funkcja tworzy menu boczne.
 * @param {boolean} isInput - Pokazanie pola tekstowego i przycisku potwierdzenia na górze menu
 * @param {boolean} pauseGame - Zatrzymanie gry po pokazaniu menu i wznowienie jej po zamknięciu menu
 * @param {boolean} pauseLevelBuilder - Zatrzymanie kreatora poziomów po zamknięciu menu
 * @param {boolean} closeOnButtonClick - Zamknięcie menu po naciśnięciu przycisku z listy
 * @param {Array.<*>} listData - Dane które zostaną wyświetlone w liście
 * @param {FormatData} dataFormat - Funkcja formatująca dane do wyświetlenia w liście
 * @param {OnSideMenuButtonClick} onButtonClick - Funkcja wykonująca się po naciśnięciu przycisku z listy
 * @param {string} confirmButtonLabel - Podpis przycisku potwierdzenia
 * @param {OnSideMenuConfirm} onConfirm - Funkcja wykonująca się po naciśnięciu przycisku potwierdzenia
 */
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

    menu.style.display = 'none';
    sideMenu.style.display = 'inline';
    if(isInput) sideMenuForm.style.display = 'inline';

    while(sideMenuList.lastChild.id != 'side_menu_form') sideMenuList.removeChild(sideMenuList.lastChild);

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
                if(pauseLevelBuilder) stopLevelBuilder(levelBuilder);
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
                
            gameObjects.style.display = 'none';

            if(pauseGame) startGame(game);
            if(pauseLevelBuilder) stopLevelBuilder(levelBuilder);
        });
    }

    bSideMenuCancel.addEventListener('click', () => {
        iSideMenuInput.value = '';
        menu.style.display = 'inline';
        sideMenu.style.display = 'none';
        sideMenuForm.style.display = 'none';
                
        gameObjects.style.display = 'none';

        if(pauseGame) startGame(game);
        if(pauseLevelBuilder) stopLevelBuilder(levelBuilder);
    });
}

/**
 * Funkcja która wykonuje się po wejściu na stronę i załadowaniu poziomów.
 */
function init() {
    level = getLevelByDifficulty(selectedDifficulty);
    game = new Game(context, canvasImage, JSON.parse(JSON.stringify(level['level'])), onVictory);

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

/**
 * Funkcja która wykonuje po wejściu na stronę, załadowaniu poziomów i utworzeniu menu urzytkownika.
 */
function onLevelsRead() {
    bResetLevel.addEventListener('click', () => {
        if(gamemode == gamemodes.LEVELS) {
            removeScore(scoreHolder, currentLevel);
            sTotalScore.innerText = scoreHolder.totalScore;
        }
        resetGame();
    });
    bUndoMove.addEventListener('click', () => { undoMove(game); });
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

    bRandomLevel.addEventListener('click', () => {
        level = getLevelByDifficulty(selectedDifficulty);
        resetGame();
    });
    bNextLevel.addEventListener('click', () => {
        level = getLevelByLevelNumber(++ currentLevel);
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
                    if(typeof game != 'undefined') {
                        if(gamemode == gamemodes.LEVELS) {
                            saveGame(
                                inputValue,
                                currentLevel,
                                game.worker,
                                game.boxes,
                                game.movesMade,
                                movesUndone,
                                scoreHolder.totalScore
                            );
                        } else {
                            saveCustomGame(
                                inputValue,
                                level.name,
                                game.worker,
                                game.boxes,
                                game.movesMade,
                                movesUndone
                            );
                        }
                    }
                }
            );
        }
    );
    bReadGame.addEventListener('click', () => {
            if(gamemode == gamemodes.LEVELS) {
                createSideMenu(
                    false, true, false, true,
                    readGames(),
                    (save, index) => save['name'],
                    (save) => {
                        let saveData = JSON.parse(save['data']);
                        scoreHolder.score = saveData['score'];
    
                        level = getLevelByLevelNumber(saveData['currentLevel']);
                        game = new Game(
                            context,
                            canvasImage,
                            {
                                'board': level['level']['board'],
                                'worker': saveData['worker'],
                                'boxes': saveData['boxes']
                            },
                            onVictory,
                            saveData['movesMade'],
                            saveData['movesUndone']
                        );
                        sTotalScore.innerText = scoreHolder.score;
                    }
                );
            } else {
                createSideMenu(
                    false, true, false, true,
                    readCustomGames(),
                    (save, index) => save['name'],
                    (save) => {
                        let saveData = JSON.parse(save['data']);
    
                        level = getCustomLevel(saveData['levelName']);
                        game = new Game(
                            context,
                            canvasImage,
                            {
                                'board': level['level']['board'],
                                'worker': saveData['worker'],
                                'boxes': saveData['boxes']
                            },
                            onVictory,
                            saveData['movesMade'],
                            saveData['movesUndone']
                        );
                    }
                );
            }
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
            true, false, true, false,
            getCustomLevelsNames(),
            (levelName, index) => levelName,
            (levelName) => { iSideMenuInput.value = levelName; },
            'Zapisz poziom',
            (inputValue) => {
                if(
                    inputValue != '' &&
                    typeof levelBuilder.worker != 'undefined' &&
                    levelBuilder.targetsNumber >= levelBuilder.boxes.boxes.length
                ) {
                    saveLevel(
                        inputValue,
                        levelBuilder.board,
                        levelBuilder.boxes,
                        levelBuilder.worker
                    );

                    readCustomLevels();
                }
            }
        )
    });
    bRemoveLevel.addEventListener('click', () => {
        createSideMenu(
            false, true, false, true,
            getCustomLevelsNames(),
            (levelName, index) => levelName,
            (levelName) => {
                removeLevel(levelName);
                readCustomLevels();
            },
        );
    });
    bReadLevel.addEventListener('click', () => {
        createSideMenu(
            false, true, false, true,
            getCustomLevelsNames(),
            (levelName, index) => levelName,
            (levelName) => {
                level = getCustomLevel(levelName);
                resetGame();
            }
        );
    });

    bEasyLevel.addEventListener('click', () => {
        selectedDifficulty = 'easy';
        level = getLevelByDifficulty('easy');
        resetGame();
    });
    bIntermediateLevel.addEventListener('click', () => {
        selectedDifficulty = 'intermediate';
        level = getLevelByDifficulty('intermediate');
        resetGame();
    });
    bHardLevel.addEventListener('click', () => {
        selectedDifficulty = 'hard';
        level = getLevelByDifficulty('hard');
        resetGame();
    });

    init();
}

/**
 * Konstruktor wczytujący levele zapisane w /assets/levels.
 * @see {@link levelProvider:LevelProvider}
 * @return {Promise} Promise który wczytuje levele.
 */
new LevelProvider()
        .then(onLevelsRead)
        .catch(error => console.log(error));