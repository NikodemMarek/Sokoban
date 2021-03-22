export default class ScoreHolder {
    constructor() {
        this.scores = [];
        this.totalScore = 0;
    }
}

export function pushScore(scoreHolder, levelNumber, score) {
    scoreHolder.totalScore += score;

    scoreHolder.scores.push(
        JSON.stringify({
            'levelNumber': levelNumber,
            'score': score
        })
    );

    return scoreHolder.totalScore;
}

export function removeScore(scoreHolder, levelNumber) {
    if(scoreHolder.scores.length > levelNumber) {
        let toRemove = JSON.parse(scoreHolder.scores[levelNumber]);
        scoreHolder.totalScore -= toRemove['score'];
    }
    scoreHolder.scores.splice(levelNumber, 1);

    return scoreHolder.totalScore;
}