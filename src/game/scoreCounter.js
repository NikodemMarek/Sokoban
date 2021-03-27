/**
 * @module scoreCounter
 */

export function calculateScore(scoreMultiplier, movesMade, movesUndone) {
    let score =  1000 - (movesMade + movesUndone * movesUndone) * scoreMultiplier;
    return score >= 0 ? score: 0;
}
