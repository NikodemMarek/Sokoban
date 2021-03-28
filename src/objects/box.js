/**
 * @module box
 */

import { BOARD_DIMENSIONS } from '/src/constants.js'

/**
 * Przechowuje informacje o pudełku i pozwala na wykonywanie operacji na nim.
 * @name module:box#Box
 */
export default class Box {
    /**
     * Przyjmuje i zapisuje do zmiennych informacje o pudełku.
     * @param {module:index#Position} position - Pozycja w której znajduje się pudełko
     * @param {boolean} inPlace - Pudełko jest / nie jest na celu
     */
    constructor(position, inPlace = false) {
        this.position = position
        this.inPlace = inPlace
    }
};

/**
 * Rysuje pudełko na {@link module:index#context}.
 * @name module:box#draw
 * @function
 * @param {module:box#Box} box - {@link module:box#Box Box}
 * @param {module:canvasImage#CanvasImage} canvasImage - {@link module:canvasImage#CanvasImage CanvasImage}
 */
export function draw(box, canvasImage) { canvasImage.drawBox(box.position) }

/**
 * Porusza pudełko o ilość jednostek przekazanych do funkcji.
 * @name module:box#move
 * @function
 * @param {module:box#Box} box - {@link module:box#Box Box}
 * @param {module:index#Position} move - Ilość jednostek o które zostanie przesunięte pudełko
 * @returns {boolean} Pudełko zostało / nie zostało (na drodze pudełka jest przeszkoda) przesunięte
 */
export function move(box, { x = 0, y = 0 } = {}) {
    if(
        box.position.x + x >= 0 &&
        box.position.x + x < BOARD_DIMENSIONS.x
    ) box.position.x += x;
    else return false;
    if(
        box.position.y + y >= 0 &&
        box.position.y + y < BOARD_DIMENSIONS.y
    ) box.position.y += y;
    else return false;

    return true;
}