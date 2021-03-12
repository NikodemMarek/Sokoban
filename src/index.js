import InputHandler from './input/input-handler.js'
import Worker from './objects/worker.js'
import CanvasImage from './canvas/canvas-image.js'
import { BOARD_SIZE } from './constants.js'
import Box from './objects/box.js'
import Boxes from './objects/boxes.js'
import { isWall, draw as drawBoard } from './board/board.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let worker = new Worker({ x: 15, y: 10 });
let boxes = new Boxes(
    [
        new Box({ x: 10, y: 10 }, false),
        new Box({ x: 15, y: 5 }, false),
        new Box({ x: 15, y: 15 }, false),
        new Box({ x: 20, y: 10 }, false)
    ]
);

let canvasImage = new CanvasImage(context);

// update game state
const update = function(workerMovement) {
    let canMove = true;

    // check for worker collision with a box
    canMove = boxes.move(
        {
            x: worker.position.x + workerMovement.x,
            y: worker.position.y + workerMovement.y
        },
        workerMovement
    )

    // update worker position
    if(
        canMove &&
        !isWall({ x: worker.position.x + workerMovement.x, y: worker.position.y + workerMovement.y})
    ) worker.move(workerMovement);

    // check for victory
    boxes.isVictory();
}
// draw objects on the board
const draw = function() {
    // clear the board
    context.clearRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

    // draw board
    drawBoard(canvasImage);

    // draw boxes
    boxes.draw(canvasImage);
    
    // draw worker on to the board
    worker.draw(canvasImage);
}

// draw objects on the board, and the worker in their initial localizations
draw(context);

// initialize user input handler and start the game
new InputHandler(update, draw);