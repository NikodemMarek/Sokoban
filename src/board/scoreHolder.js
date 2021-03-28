/**
 * @module scoreHolder
 */

/**
 * Klasa przechowuje wyniki z każdego poziomu w 2 trybie gry.
 * @name module:scoreHolder#ScoreHolder
 */
export default class ScoreHolder {
    /**
     * Konstruktor tworzy tablice na wyniki i ustawia początkowy całkowity wynik na 0.
     */
    constructor() {
        this.scores = [];
        this.totalScore = 0;
    }
}

/**
 * Dodaje nowy wynik uzyskany z poziomu, do tablicy winików.
 * @name module:scoreHolder#pushScore
 * @function
 * @param {module:scoreHolder#ScoreHolder} scoreHolder - {@link module:scoreHolder#ScoreHolder ScoreHolder}
 * @param {number} levelNumber - Numer poziomu na którym został zdobyty wynik
 * @param {number} score - Uzyskany wynik
 * @returns {number} Całkowity wynik zdobyty na wszystkich poziomach
 */
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

/**
 * Usuwa wynik z tabeli wyników.
 * @name module:scoreHolder#removeScore
 * @function
 * @param {module:scoreHolder#ScoreHolder} scoreHolder - {@link module:scoreHolder#ScoreHolder ScoreHolder}
 * @param {number} levelNumber - Numer poziomu którego wynik zostanie usunięty
 * @returns {number} Całkowity wynik uzyskany ze wszystkich poziomów, bez usuniętego wyniku
 */
export function removeScore(scoreHolder, levelNumber) {
    if(scoreHolder.scores.length > levelNumber) {
        let toRemove = JSON.parse(scoreHolder.scores[levelNumber]);
        scoreHolder.totalScore -= toRemove['score'];
    }
    scoreHolder.scores.splice(levelNumber, 1);

    return scoreHolder.totalScore;
}