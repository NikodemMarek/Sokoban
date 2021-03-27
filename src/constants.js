/**
 * @module constants
 */

/**
 * Wymiary planszy w pixelach.
 * @constant
 * @type {index:Position}
 */
export const BOARD_SIZE = Object.freeze({ x: 900, y: 600 })
/**
 * Wymiary planszy w elementach które się na niej mieszczą.
 * @constant
 * @type {index:Position}
 */
export const BOARD_DIMENSIONS = Object.freeze({ x: 30, y: 20 })
/**
 * Wymiary pojedynczego elementu na planszy.
 * @constant
 * @type {number}
 */
export const OBJECT_SIZE = 30

/**
 * Długośc historii ruchów zapisywanej podczas rozgrywki.
 * @constant
 * @type {index:Position}
 */
export const MOVES_HISTORY = 50
/**
 * Długość tabeli wyników.
 * @constant
 * @type {index:Position}
 */
export const SCOREBOARD_LENGTH = 10

/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych gier z trybu 2.
 * @constant
 * @type {string}
 */
export const SAVED_GAME_PREFIX = 'save/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych gier z trybu 3.
 * @constant
 * @type {string}
 */
export const CUSTOM_SAVE_PREFIX = 'custom_save/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisanych wyników.
 * @constant
 * @type {string}
 */
export const SCOREBOARD_PREFIX = 'scoreboard/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych, własnych poziomów.
 * @constant
 * @type {string}
 */
export const CUSTOM_LEVEL_PREFIX = 'level/'