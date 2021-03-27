/**
 * @module worker
 */

import { BOARD_DIMENSIONS } from '/src/constants.js'

/**
 * Przechowuje informacje o magazynierze i pozwala na wykonywanie na nim operacji.
 */
export default class Worker {
    /**
     * Przyjmuje i zapisuje do zmiennej początkową pozycje magazyniera.
     * @param {index:Position} position - Pozycja początkowa magazyniera
     */
    constructor(position) {
        this.position = position;
    }
};

/**
 * Rysuje magazyniera na planszy.
 * @param {Worker} worker - {@link worker:Worker}
 * @param {canvasImage:CanvasImage} canvasImage - {@link canvasImage:CanvasImage}
 */
export function draw(worker, canvasImage) { canvasImage.drawWorker(worker.position) }

/**
 * Sprawdza czy magazynier może poruszyć się o daną liczbę jednostek i jeśli może, porusza go.
 * @param {Worker} worker - {@link Worker}
 * @param {index:Position} direction - Liczba jednostek o które ma zostać poruszony magazynier
 */
export function move(worker, { x = 0, y = 0 } = {}) {
    if(worker.position.x + x >= 0 && worker.position.x + x < BOARD_DIMENSIONS.x) worker.position.x += x;
    if(worker.position.y + y >= 0 && worker.position.y + y < BOARD_DIMENSIONS.y) worker.position.y += y;
}