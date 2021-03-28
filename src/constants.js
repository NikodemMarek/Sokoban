/**
 * @module constants
 */

/**
 * Wymiary planszy w pixelach.
 * @name module:constants#BOARD_SIZE
 * @constant
 * @type {module:index#Position}
 */
export const BOARD_SIZE = Object.freeze({ x: 900, y: 600 })
/**
 * Wymiary planszy w elementach które się na niej mieszczą.
 * @name module:constants#BOARD_DIMENSIONS
 * @constant
 * @type {module:index#Position}
 */
export const BOARD_DIMENSIONS = Object.freeze({ x: 30, y: 20 })
/**
 * Wymiary pojedynczego elementu na planszy.
 * @name module:constants#OBJECT_SIZE
 * @constant
 * @type {number}
 */
export const OBJECT_SIZE = 30

/**
 * Długośc historii ruchów zapisywanej podczas rozgrywki.
 * @name module:constants#MOVES_HISTORY
 * @constant
 * @type {module:index#Position}
 */
export const MOVES_HISTORY = 50
/**
 * Długość tabeli wyników.
 * @name module:constants#SCOREBOARD_LENGTH
 * @constant
 * @type {module:index#Position}
 */
export const SCOREBOARD_LENGTH = 10

/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych gier z trybu 2.
 * @name module:constants#SAVED_GAME_PREFIX
 * @constant
 * @type {string}
 */
export const SAVED_GAME_PREFIX = 'save/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych gier z trybu 3.
 * @name module:constants#CUSTOM_SAVE_PREFIX
 * @constant
 * @type {string}
 */
export const CUSTOM_SAVE_PREFIX = 'custom_save/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisanych wyników.
 * @name module:constants#SCOREBOARD_PREFIX
 * @constant
 * @type {string}
 */
export const SCOREBOARD_PREFIX = 'scoreboard/'
/**
 * String dodawany przed nazwą zaspisu dla odróżniena zapisywanych, własnych poziomów.
 * @name module:constants#CUSTOM_LEVEL_PREFIX
 * @constant
 * @type {string}
 */
export const CUSTOM_LEVEL_PREFIX = 'level/'