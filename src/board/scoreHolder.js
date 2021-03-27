/**
 * @module scoreHolder
 */

/**
 * Klasa przechowuje wyniki z każdego poziomu w 2 trybie gry.
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
 * Funkcja dodaje nowy wynik uzyskany z poziomu, do tablicy winików.
 * @param {ScoreHolder} scoreHolder - Obiekt klasy {@link ScoreHolder}
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
 * Funkcja usuwa wynik z tabeli wyników.
 * @param {ScoreHolder} scoreHolder - Obiekt klasy {@link ScoreHolder}
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