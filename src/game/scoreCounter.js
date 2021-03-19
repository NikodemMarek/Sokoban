export function calculateScore(scoreMultiplier, movesMade, movesUndone) {
    let score = scoreMultiplier * movesMade - movesUndone * scoreMultiplier * 4;
    return score >= 0 ? score: 0;
}
