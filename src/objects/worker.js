import { BOARD_DIMENSIONS } from '/src/constants.js'

export default class Worker {
    constructor(position) {
        this.position = position;
    }
};

// draw worker
export function draw(worker, canvasImage) { canvasImage.drawWorker(worker.position) }

// change worker by x and y
export function move(worker, { x = 0, y = 0 } = {}) {
    if(worker.position.x + x >= 0 && worker.position.x + x < BOARD_DIMENSIONS.x) worker.position.x += x;
    if(worker.position.y + y >= 0 && worker.position.y + y < BOARD_DIMENSIONS.y) worker.position.y += y;
}