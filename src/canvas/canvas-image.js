export default class CanvasImage {
    constructor(context, boardSize, objectsSize) {
        this.context = context;
        this.boardSize = boardSize;
        this.objectsSize = objectsSize;

        // get images of game objects
        this.workerImage = document.getElementById('workerImage');
    }

    // draw image
    drawWorker(position) {
        this.context.drawImage(
            this.workerImage,
            position.x * this.objectsSize, position.y * this.objectsSize,
            this.objectsSize, this.objectsSize
        );
    }
};