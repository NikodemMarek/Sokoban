/**
 * @module board
 */

import { BOARD_DIMENSIONS } from "../constants.js";

/**
 * Klasa przechowywuje planszę i canvasImage, ułatwia operacje na planszy.
 * @name module:board#Board
 */
export default class Board {
    /**
     * Konstruktor przyjmuje i zapisuje tablicę z planszą oraz {@link module:canvasImage#CanvasImage CanvasImage} do zmiennych.
     * @param {module:canvasImage#CanvasImage} canvasImage - CanvasImage którego będzie używać plansza
     * @param {Array.<Array.<string>>} board - Plansza na której odbywa się gra
     */
    constructor(canvasImage, board) {
        this.canvasImage = canvasImage;
        this.board = board;
    }
};

/**
 * Funkcja zmienia element planszy w wybranym miejscu na podany element
 * @name module:board#setElement
 * @function
 * @param {module:board#Board} board - {@link module:board#Board Board}
 * @param {module:index#Position} position - Pozycja na której zostanie zamieniony element
 * @param {string} element - Element który zostanie postawiony na planszy
 */
export function setElement(board, position, element) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) board.board[position.y][position.x] = element;
}

/**
 * Funkcja rysuje elementy na planszy.
 * @name module:board#draw
 * @function
 * @param {module:board#Board} board - {@link module:board#Board Board}
 */
export function draw(board) {
    for(const [y, row] of board.board.entries()) {
        for(const [x, index] of row.entries()) {
            switch(index) {
                case 'w':
                    board.canvasImage.drawWall({ x: x, y: y });
                    break;
                case 't':
                    board.canvasImage.drawTarget({ x: x, y: y });
                    break;
            }
        }
    }
}

/**
 * Funkcja sprawdza czy w danym punkcie na planszy jest ściana.
 * @name module:board#isWall
 * @function
 * @param {module:board#Board} board - {@link module:board#Board Board}
 * @param {module:index#Position} position - Pozycja do sprawdzenia
 */
export function isWall(board, position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board.board[position.y][position.x] == 'w';
    else return true;
}
/**
 * Funkcja sprawdza czy w danym punkcie na planszy jest cel.
 * @name module:board#isTarget
 * @function
 * @param {module:board#Board} board - {@link module:board#Board Board}
 * @param {module:index#Position} position - Pozycja do sprawdzenia
 */
export function isTarget(board, position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board.board[position.y][position.x] == 't';
    else return true;
}