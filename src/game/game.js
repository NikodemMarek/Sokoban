import InputHandler from '/src/input/input-handler.js'
import Worker from '/src/objects/worker.js'
import CanvasImage from '/src/canvas/canvas-image.js'
import { BOARD_SIZE } from '/src/constants.js'
import Box from '/src/objects/box.js'
import Boxes from '/src/objects/boxes.js'
import { isWall, draw as drawBoard } from '/src/board/board.js'

export default class Game {
    constructor(context) {
        this.context = context;
        this.canvasImage = new CanvasImage(context);

        this.worker = new Worker({ x: 15, y: 10 });
        this.boxes = new Boxes(
            [
                new Box({ x: 10, y: 10 }),
                new Box({ x: 15, y: 5 }),
                new Box({ x: 15, y: 15 }),
                new Box({ x: 20, y: 10 })
            ]
        );

        // draw objects on the board, and the worker in their initial localizations
        this.draw();

        // initialize user input handler
        this.inputHandler = new InputHandler(this);
    }
    
    // update game state
    update = function(workerMovement) {
        let canMove = true;

        // check for worker collision with a box
        canMove = this.boxes.move(
            {
                x: this.worker.position.x + workerMovement.x,
                y: this.worker.position.y + workerMovement.y
            },
            workerMovement
        );

        // update worker position
        if(
            canMove &&
            !isWall({ x: this.worker.position.x + workerMovement.x, y: this.worker.position.y + workerMovement.y})
        ) this.worker.move(workerMovement);

        // check for victory
        this.boxes.isVictory();
    }
    // draw objects on the board
    draw = function() {
        // clear the board
        this.context.clearRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

        // draw board
        drawBoard(this.canvasImage);

        // draw boxes
        this.boxes.draw(this.canvasImage);
        
        // draw worker on to the board
        this.worker.draw(this.canvasImage);
    }

    // unpause the game
    start() {
        this.inputHandler.start();
    }
    // pause the game
    stop() {
        this.inputHandler.stop();
    }
};
