/**
 * @module scoreCounter
 */

/**
 * Oblicza i zwraca wynik zdobyty na obecnym poziomie, na podstawie dostarczonych danych.
 * @name module:scoreCounter#calculateScore
 * @function
 * @param {number} scoreMultiplier - Mnożnik punktów, im większy tym mniej punktów
 * @param {number} movesMade - Liczba wykonanych ruchów
 * @param {number} movesUndone - Liczba cofniętych ruchów
 * @returns {number} Uzyskany wynik
 */
export function calculateScore(scoreMultiplier, movesMade, movesUndone) {
    let score =  1000 - (movesMade + movesUndone * movesUndone) * scoreMultiplier;
    return score >= 0 ? score: 0;
}
