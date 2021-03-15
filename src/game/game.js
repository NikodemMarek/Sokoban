import InputHandler from '/src/input/input-handler.js'
import { draw as drawWorker, move as moveWorker } from '/src/objects/worker.js'
import CanvasImage from '/src/canvas/canvas-image.js'
import { BOARD_SIZE } from '/src/constants.js'
import { draw as drawBoxes, move as moveBoxes, isVictory } from '/src/objects/boxes.js'
import { isWall, draw as drawBoard, setBoard } from '/src/board/board.js'

export default class Game {
    constructor(context, board) {
        this.context = context;
        this.canvasImage = new CanvasImage(context);

        // set the board for the level
        setBoard(board['board']);

        this.worker = board['worker'];
        this.boxes = board['boxes'];

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
            canMove = moveBoxes(
                this.boxes,
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
            ) moveWorker(this.worker, workerMovement);

            // check for victory
            if(isVictory(this.boxes)) {
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
            drawBoxes(this.boxes, this.canvasImage);
            
            // draw worker on to the board
            drawWorker(this.worker, this.canvasImage);
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