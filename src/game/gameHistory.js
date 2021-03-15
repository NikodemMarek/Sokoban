import { MOVES_HISTORY } from "/src/constants.js"

export default class GameHistory {
    constructor(worker, boxes) {
        this.movesHistory = [
            JSON.stringify({
                'worker': worker,
                'boxes': boxes
            })
        ];
    }
};

export function addMove(gameHistory, worker, boxes) {
    if(gameHistory.movesHistory.length > MOVES_HISTORY) gameHistory.movesHistory.shift();

    gameHistory.movesHistory.push(
        JSON.stringify({
            'worker': worker,
            'boxes': boxes
        })
    );
}

export function undoMove(gameHistory) {
    if(gameHistory.movesHistory.length > 1) return JSON.parse(gameHistory.movesHistory.pop());
    else return JSON.parse(gameHistory.movesHistory[0]);
}