import { OBJECT_SIZE } from '/src/constants.js'

export default class CanvasImage {
    constructor(context) {
        this.context = context;

        // get images of game objects
        this.workerImage = document.getElementById('workerImage');
        this.boxImage = document.getElementById('boxImage');

        // get image of elements on the board
        this.wallImage = document.getElementById('wallImage');
        this.targetImage = document.getElementById('targetImage');
    }

    // draw worker image in the right spot on the board
    drawWorker(position) {
        this.context.drawImage(
            this.workerImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
    // draw box image in the right spot on the board
    drawBox(position) {
        this.context.drawImage(
            this.boxImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }

    // draw wall image in the right spot on the board
    drawWall(position) {
        this.context.drawImage(
            this.wallImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
    // draw target tile image in the right spot on the board
    drawTarget(position) {
        this.context.drawImage(
            this.targetImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
};