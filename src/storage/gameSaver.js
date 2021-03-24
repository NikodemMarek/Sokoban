import { CUSTOM_SAVE_PREFIX, SAVED_GAME_PREFIX } from '/src/constants.js'

export function saveGame(gameName, currentLevel, worker, boxes, movesMade, movesUndone, score) {
    let gameJson = JSON.stringify({
        'currentLevel': currentLevel,
        'worker': worker,
        'boxes': boxes,
        'movesMade': movesMade,
        'movesUndone': movesUndone,
        'score': score
    });

    localStorage.setItem(SAVED_GAME_PREFIX + gameName, gameJson);
};
export function saveCustomGame(gameName, levelName, worker, boxes, movesMade, movesUndone) {
    let gameJson = JSON.stringify({
        'levelName': levelName,
        'worker': worker,
        'boxes': boxes,
        'movesMade': movesMade,
        'movesUndone': movesUndone
    });

    localStorage.setItem(CUSTOM_SAVE_PREFIX + gameName, gameJson);
};

export function readGames() {
    let savedGames = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(SAVED_GAME_PREFIX))
        .forEach(key => {
            savedGames.push({
                'name': key.replace(SAVED_GAME_PREFIX, ''),
                'data': localStorage.getItem(key)
            });
        });

    return savedGames;
};
export function readCustomGames() {
    let savedGames = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(CUSTOM_SAVE_PREFIX))
        .forEach(key => {
            savedGames.push({
                'name': key.replace(CUSTOM_SAVE_PREFIX, ''),
                'data': localStorage.getItem(key)
            });
        });

    return savedGames;
};