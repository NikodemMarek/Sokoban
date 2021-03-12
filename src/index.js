import InputHandler from './input/input-handler.js'
import Worker from './objects/worker.js'
import CanvasImage from './canvas/canvas-image.js'
import { BOARD_SIZE } from './constants.js'
import Box from './objects/box.js';
import Board from './board/board.js';

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let board = new Board();
let worker = new Worker({ x: 15, y: 10 });

let boxes = [
    new Box({ x: 10, y: 10 }, false),
    new Box({ x: 15, y: 5 }, false),
    new Box({ x: 15, y: 15 }, false),
    new Box({ x: 20, y: 10 }, false)
]

let canvasImage = new CanvasImage(context);

// update game state
const update = function(workerMovement) {
    let canMove = true;

    // check for worker collision with a box
    boxes.forEach(box => {
        if(
            box.position.x == worker.position.x + workerMovement.x &&
            box.position.y == worker.position.y + workerMovement.y
        ) {
            boxes.forEach(boxBehind => {
                if(
                    boxBehind.position.x == worker.position.x + workerMovement.x * 2 &&
                    boxBehind.position.y == worker.position.y + workerMovement.y * 2 ||
                    board.isWall({ x: worker.position.x + workerMovement.x * 2, y: worker.position.y + workerMovement.y * 2 })
                ) canMove = false;
            });

            if(canMove && !box.move(workerMovement)) canMove = false;
        }
    });

    // update worker position
    if(
        canMove &&
        !board.isWall({ x: worker.position.x + workerMovement.x, y: worker.position.y + workerMovement.y})
    ) worker.move(workerMovement);
}
// draw objects on the board
const draw = function() {
    // clear the board
    context.clearRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

    // draw board
    board.draw(canvasImage);

    // draw boxes
    boxes.forEach(box => box.draw(canvasImage));
    
    // draw worker on to the board
    worker.draw(canvasImage);
}

// draw objects on the board, and the worker in their initial localizations
draw(context);

// initialize user input handler and start the game
new InputHandler(update, draw);