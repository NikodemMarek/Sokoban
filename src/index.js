import InputHandler from './input/input-handler.js'
import Worker from './objects/worker.js'
import CanvasImage from './canvas/canvas-image.js'
import { BOARD_SIZE } from './constants.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let worker = new Worker({ x: 15, y: 10 });

let canvasImage = new CanvasImage(context);

// update game state
const update = function(workerMovement) {
    // update worker position
    worker.move(workerMovement)
}
// draw objects on the board
const draw = function() {
    // clear the board
    context.clearRect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

    // draw worker on to the board
    worker.draw(canvasImage);
}

// draw objects on the board, and the worker in their initial localizations
draw(context);

// initialize user input handler and start the game
new InputHandler(update, draw);