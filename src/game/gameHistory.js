/**
 * @module gameHistory
 */

import { MOVES_HISTORY } from '/src/constants.js'

/**
 * Dane elementów gry po wykonaniu ruchu.
 * @name module:gameHistory#Move
 * @typedef {{
 *          worker: worker:Worker,
 *          boxes: boxes:Boxes,
 *          movesNumber: number
 *      }} module:gameHistory#Move
 */

/**
 * Przetrzymuje historię ruchów dla gry, o maksymalnej długości zdefiniowanej w {@link module:constants#MOVES_HISTORY MOVES_HISTORY}.
 * @name module:gameHistory#GameHistory
 */
export default class GameHistory {
    /**
     * Przyjmuje i zapisuje dane po pierwszym ruchu.
     * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
     * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
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
 * @name module:gameHistory#addMove
 * @function
 * @see module:constants#MOVES_HISTORY
 * @param {module:gameHistory#GameHistory} gameHistory - {@link module:gameHistory#GameHistory GameHistory}
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
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
 * @see module:gameHistory#Move
 * @name module:gameHistory#undoMove
 * @function
 * @param {module:gameHistory#GameHistory} gameHistory - {@link module:gameHistory#GameHistory GameHistory}
 * @returns {module:gameHistory#Move} Dane ostatniego, dodanego ruchu
 */
export function undoMove(gameHistory) {
    if(gameHistory.movesHistory.length > 1) return JSON.parse(gameHistory.movesHistory.pop());
    else return JSON.parse(gameHistory.movesHistory[0]);
}