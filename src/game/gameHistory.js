/**
 * @module gameHistory
 */

import { MOVES_HISTORY } from '/src/constants.js'

/**
 * Dane elementów gry po wykonaniu ruchu.
 * @typedef {{
 *          worker: worker:Worker,
 *          boxes: boxes:Boxes,
 *          movesNumber: number
 *      }} Move
 */

/**
 * Przetrzymuje historię ruchów dla gry, o maksymalnej długości zdefiniowanej w {@link constants:MOVES_HISTORY}.
 */
export default class GameHistory {
    /**
     * Przyjmuje i zapisuje dane po pierwszym ruchu.
     * @param {worker:Worker} worker - {@link worker:Worker}
     * @param {boxes:Boxes} boxes - {@link module:objects/boxes:Boxes}
     * @param {number} movesNumber - Liczba wykonanych ruchów
     */
    constructor(worker, boxes, movesNumber) {
        this.movesHistory = [
            JSON.stringify({
                'worker': worker,
                'boxes': boxes,
                'moves': movesNumber
            })
        ];
    }
};

/**
 * Konwertuje dane o ruchu do formy tekstowej i dodaje go do historii ruchów.
 * Jeśli długość historii jest większa niż dozwolona długość, usuwa najstarszy, zapisany ruch.
 * @see constants:MOVES_HISTORY
 * @param {GameHistory} gameHistory - {@link GameHistory}
 * @param {worker:Worker} worker - {@link worker:Worker}
 * @param {boxes:Boxes} boxes - {@link boxes:Boxes}
 * @param {number} movesNumber - Liczba wykonanych ruchów
 */
export function addMove(gameHistory, worker, boxes, movesNumber) {
    if(gameHistory.movesHistory.length > MOVES_HISTORY) gameHistory.movesHistory.shift();

    gameHistory.movesHistory.push(
        JSON.stringify({
            'worker': worker,
            'boxes': boxes,
            'moves': movesNumber
        })
    );
}

/**
 * Usuwa ostatni zapisany ruch z historii i zwraca jego dane.
 * @see Move
 * @param {GameHistory} gameHistory - {@link GameHistory}
 * @returns {Move} Dane ostatniego, dodanego ruchu
 */
export function undoMove(gameHistory) {
    if(gameHistory.movesHistory.length > 1) return JSON.parse(gameHistory.movesHistory.pop());
    else return JSON.parse(gameHistory.movesHistory[0]);
}