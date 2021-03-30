/**
 * Zawiera funkcje pozwalające na zapisywanie i wczytywanie wyników z localStorage.
 * @module scoreboard
 */

import { SCOREBOARD_PREFIX, SCOREBOARD_LENGTH } from '../constants.js'

/**
 * Wczytuje wyniki z localStorage i sortuje je od najwyższego do najniższego.
 * @name module:scoreboard#readScoreboard
 * @function
 * @returns {Array.<{ name: string, score: number }>} Posortowana tablica wyników
 */
export function readScoreboard() {
    let scores = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(SCOREBOARD_PREFIX))
        .forEach(key => {
            scores.push({
                'name': key.replace(SCOREBOARD_PREFIX, ''),
                'score': Number(localStorage.getItem(key))
            });
        });

    return scores.sort((a, b) => a['score'] >= b['score'] ? -1: 1);
}

/**
 * Jeśli liczba zapisanych wyników jest mniejsza niż max zdefiniowany w {@link module:constants#SCOREBOARD_LENGTH SCOREBOARD_LENGTH}, zapisuje wynik do local storage.
 * Jeśli jest większa, sprawdza czy nowy wynik jest większy niż którykolwiek z zapisanych, jeśli tak, usuwa go i zapisuje nowy wynik.
 * @name module:scoreboard#updateScoreboard
 * @function
 * @param {string} name - Nazwa wyniku
 * @param {number} score - Całkowity wynik zdobyty podczas gry
 */
export function updateScoreboard(name, score) {
    let scores = readScoreboard();

    if(scores.length < SCOREBOARD_LENGTH) localStorage.setItem(SCOREBOARD_PREFIX + name, score);
    else {
        for(let i = 0; i < scores.length; i ++) {
            if(scores[i]['score'] < score) {
                localStorage.setItem(SCOREBOARD_PREFIX + name, score);
                localStorage.removeItem(SCOREBOARD_PREFIX + scores.pop()['name']);
                break;
            }
        }
    }
}