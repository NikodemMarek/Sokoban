import { OBJECT_SIZE } from '/src/constants.js'

export default class CanvasImage {
    constructor(context) {
        this.context = context;

        // get images of game objects
        this.workerImage = document.getElementById('workerImage');
    }

    // draw worker image in the right spot on the board
    drawWorker(position) {
        this.context.drawImage(
            this.workerImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
};