/**
 * Zawiera funkcje ułatwiające zapisywanie i wczytywanie rozgrywek z localStorage.
 * @module gameSaver
 */

import { CUSTOM_SAVE_PREFIX, SAVED_GAME_PREFIX } from '/src/constants.js'

/**
 * Funkcja konwertuje dane o grze w trybie 2 do postaci tekstowej i zapisuje je do localStorage.
 * Zapisane dane dostają klucz rozpoczynający się od tekstu zdefiniowanego w {@link module:constants#SAVED_GAME_PREFIX SAVED_GAME_PREFIX}, a kończący się podaną nazwą zapisu.
 * @see module:game#Game
 * @name module:gameSaver#saveGame
 * @function
 * @param {string} gameName - Nazwa zapisu gry, jeśli zapis o tej nazwie istnieje, zostanie nadpisany
 * @param {number} currentLevel - Numer rozgrywanego poziomu
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {number} movesMade - Liczba wykonanych ruchów
 * @param {number} movesUndone - Liczba cofniętych ruchów
 * @param {number} score - Całkowity uzyskany wynik
 */
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
/**
 * Funkcja konwertuje dane o grze w trybie 3 do postaci tekstowej i zapisuje je do localStorage.
 * Zapisane dane dostają klucz rozpoczynający się od tekstu zdefiniowanego w {@link module:constants#CUSTOM_SAVE_PREFIX CUSTOM_SAVE_PREFIX}, a kończący się podaną nazwą zapisu.
 * @see module:game#Game
 * @name module:gameSaver#saveCustomGame
 * @function
 * @param {string} gameName - Nazwa zapisu gry, jeśli zapis o tej nazwie istnieje, zostanie nadpisany
 * @param {string} levelName - Nazwa poziomu z 3 trybu gry, który jest przechodzony
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {number} movesMade - Liczba wykonanych ruchów
 * @param {number} movesUndone - Liczba cofniętych ruchów
 */
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

/**
 * Funkcja wczytuje i zwraca zapisane gry z 2 trybu gry.
 * @see module:gameSaver#saveGame
 * @name module:gameSaver#readGames
 * @function
 * @returns {Array.<{ name: string, data: string }>} Dane zapisanych gier w tablicy
 */
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
/**
 * Funkcja wczytuje i zwraca zapisane gry z 3 trybu gry.
 * @see module:gameSaver#saveCustomGame
 * @name module:gameSaver#readCustomGames
 * @function
 * @returns {Array.<{ name: string, data: string }>} Dane zapisanych gier w tablicy
 */
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