/**
 * @module board
 */

import { BOARD_DIMENSIONS } from "/src/constants.js";

/**
 * Klasa przechowywuje planszę i canvasImage, ułatwia operacje na planszy.
 */
export default class Board {
    /**
     * Konstruktor przyjmuje i zapisuje {@link board:Board} oraz {@link index:canvasImage} do zmiennych.
     * @param {CanvasImage} canvasImage - CanvasImage którego będzie używać plansza
     * @param {Array.<Array.<string>>} board - Plansza na której odbywa się gra
     */
    constructor(canvasImage, board) {
        this.canvasImage = canvasImage;
        this.board = board;
    }
};

/**
 * Funkcja zmienia element planszy w wybranym miejscu na podany element
 * @param {Array.<Array.<string>>} board - Objekt klasy {@link Board}
 * @param {index:Position} position - Pozycja na której zostanie zamieniony element
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
 * @param {Array.<Array.<string>>} board - Objekt klasy {@link Board}
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
 * @param {Array.<Array.<string>>} board - Objekt klasy {@link Board}
 * @param {index:Position} position - Pozycja do sprawdzenia
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
 * @param {Array.<Array.<string>>} board - Objekt klasy {@link Board}
 * @param {index:Position} position - Pozycja do sprawdzenia
 */
export function isTarget(board, position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board.board[position.y][position.x] == 't';
    else return true;
}