/**
 * Zawiera funkcje ułatwiające zapisywanie i wczytywanie poziomów stoworzonych przez gracza, do localStorage.
 * @module levelSaver
 */

import { BOARD_DIMENSIONS, CUSTOM_LEVEL_PREFIX } from '/src/constants.js'

/**
 * Zamienia dane o stworzonym poziomie na tekst i zapisuej je do localStorage.
 * Dane są zapisywane z kluczem zaczynającym się od tekstu zdefiniowanego w {@link module:constants#CUSTOM_LEVEL_PREFIX CUSTOM_LEVEL_PREFIX}, a kończącym się nazwą poziomu.
 * @see module:levelBuilder#LevelBuilder
 * @name module:levelSaver#saveLevel
 * @function
 * @param {string} levelName - Nazwa poziomu, jeśli poziom o takiej nazwie istnieje, zostanie nadpisany
 * @param {module:board#Board} board - {@link module:board#Board Board}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 */
export function saveLevel(levelName, board, boxes, worker) {
    localStorage.setItem(CUSTOM_LEVEL_PREFIX + levelName, convertToRawLevel(board, boxes, worker));
}
/**
 * Usuwa zapisany poziom o podanej nazwie z localStorage.
 * @param {string} levelName - Nazwa poziomu
 */
export function removeLevel(levelName) {
    localStorage.removeItem(CUSTOM_LEVEL_PREFIX + levelName);
}

/**
 * Zamienia poziom z postaci {@link levelProvider:Level}, do postaci tekstu.
 * Elementy na planszy są zakodowane w sposób: e - pusty element, w - ściana, t - cel bez pudełka, h - cel z pudełkiem, b - pudełko nie na celu, w - magazynier
 * @name module:levelSaver#convertToRawLevel
 * @function
 * @param {module:board#Board} board - {@link module:board#Board Board}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 * @returns {string} Poziom w postaci tekstu
 */
function convertToRawLevel(board, boxes, worker) {
    let rawLevel = 'e'.repeat(BOARD_DIMENSIONS.x * BOARD_DIMENSIONS.y);

    board.board.forEach((row, rowIndex) => {
        row.forEach((index, columnIndex) => {
            rawLevel = rawLevel.replaceAt(rowIndex * BOARD_DIMENSIONS.x + columnIndex, index);
        });
    });

    boxes.boxes.forEach(box => {
        let rawLevelPosition = box.position.y * BOARD_DIMENSIONS.x + box.position.x;

        if(rawLevel[rawLevelPosition] == 't') rawLevel = rawLevel.replaceAt(rawLevelPosition, 'h');
        else rawLevel = rawLevel.replaceAt(rawLevelPosition, 'b');
    });

    if(typeof worker != 'undefined') rawLevel = rawLevel.replaceAt(worker.position.y * BOARD_DIMENSIONS.x + worker.position.x, 'p');

    return rawLevel;
}

/**
 * Zastępuje znak w tekście podanym znakiem i zwraca zmieniony tekst.
 * @name module:levelSaver#replaceAt
 * @function
 * @param {number} index - Miejsce w tekście które ma zostać zastąpione
 * @param {string} replacement - Znak który ma się pojawić w tekście
 * @returns {string} Tekst z zamienionym znakiem
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**
 * Wczytuje zapisane poziomy z localStorage.
 * @see saveLevel
 * @name module:levelSaver#readLevels
 * @function
 * @returns {Array.<{ name: string, data: string }>} Lista wczytanych poziomów
 */
export function readLevels() {
    let savedLevels = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(CUSTOM_LEVEL_PREFIX))
        .forEach(key => {
            savedLevels.push({
                'name': key.replace(CUSTOM_LEVEL_PREFIX, ''),
                'data': localStorage.getItem(key)
            });
        });

    return savedLevels;
};