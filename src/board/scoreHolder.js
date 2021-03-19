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