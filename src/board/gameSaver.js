import { SAVED_GAME_PREFIX } from '/src/constants.js'

export default class GameSaver {
    constructor() {
        this.savedGames = [];
        readGames(this);
    }
};


export function saveGame(gameSaver, gameName, currentLevel, worker, boxes, movesMade, movesUndone, score) {
    let gameJson = JSON.stringify({
        'currentLevel': currentLevel,
        'worker': worker,
        'boxes': boxes,
        'movesMade': movesMade,
        'movesUndone': movesUndone,
        'score': score
    });

    gameSaver.savedGames.push(gameJson);
    localStorage.setItem(SAVED_GAME_PREFIX + gameName, gameJson);
};

export function readGames(gameSaver) {
    Object.keys(localStorage)
        .filter(key => key.startsWith(SAVED_GAME_PREFIX))
        .forEach(key => {
            gameSaver.savedGames.push(localStorage.getItem(key));
        });
};