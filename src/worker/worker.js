import { BOARD_DIMENSIONS } from '/src/constants.js'
export default class Worker {
    constructor(position) {
        this.position = position;
    }

    // draw worker
    draw(canvasImage) {
        canvasImage.drawWorker(this.position);
    }

    // change worker by x and y
    move({ x = 0, y = 0 } = {}) {
        if(this.position.x + x >= 0 && this.position.x + x < BOARD_DIMENSIONS.x) this.position.x += x;
        if(this.position.y + y >= 0 && this.position.y + y < BOARD_DIMENSIONS.y) this.position.y += y;
    }
};