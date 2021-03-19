import { OBJECT_SIZE, BOARD_SIZE } from '/src/constants.js'

export default class CanvasImage {
    constructor(context) {
        this.context = context;

        // get background image
        this.backgroundImage = document.getElementById('background_image');

        // get images of game objects
        this.workerImage = document.getElementById('worker_image');
        this.boxImage = document.getElementById('box_image');

        // get image of elements on the board
        this.wallImage = document.getElementById('wall_image');
        this.targetImage = document.getElementById('target_image');

        this.victoryImage = document.getElementById('victory_image');
    }

    // draw background image in the background
    drawBackground() {
        this.context.drawImage(
            this.backgroundImage,
            0, 0,
            BOARD_SIZE.x, BOARD_SIZE.y
        );
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

    drawVictoryScreen() {
        this.context.drawImage(
            this.victoryImage,
            0, 0,
            BOARD_SIZE.x, BOARD_SIZE.y
        );
    }
};