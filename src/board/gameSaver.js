import { SAVED_GAME_PREFIX } from '/src/constants.js'

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