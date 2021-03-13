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
                new Box({ x: 10, y: 5 }),
                new Box({ x: 10, y: 10 })
            ]
        );

        // draw objects on the board, and the worker in their initial localizations
        this.draw();

        // initialize user input handler
        this.inputHandler = new InputHandler(this);
    }
    
    // update game state
    update = function(workerMovement) {
        if(!this.isPaused) {
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
            if(this.boxes.isVictory()) {
                this.draw();
                this.victory();
            }
        }
    }
    // draw objects on the board
    draw = function() {
        if(!this.isPaused) {
            // clear the board
            this.context.clearRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

            // draw game background
            this.canvasImage.drawBackground();

            // draw board
            drawBoard(this.canvasImage);

            // draw boxes
            this.boxes.draw(this.canvasImage);
            
            // draw worker on to the board
            this.worker.draw(this.canvasImage);
        }
       
    }

    // handle win
    victory() {
        this.isPaused = true;

        // show victory message
        this.context.fillStyle = 'rgba(0, 255, 0, 0.5)'
        this.context.fillRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

        this.context.fillStyle = 'rgba(0, 0, 0, 0.9)'
        this.context.font = '72px sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText('Victory', BOARD_SIZE.x / 2, BOARD_SIZE.y / 2);
    }

    // unpause the game
    start() {
        this.isPaused = false;
        this.inputHandler.isPaused = false;
    }
    // pause the game
    stop() {
        this.isPaused = true;
        this.inputHandler.isPaused = true;
    }
};