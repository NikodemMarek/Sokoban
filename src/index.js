import InputHandler from './input/input-handler.js'
import Worker from './worker/worker.js'
import CanvasImage from './canvas/canvas-image.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const BOARD_SIZE = { x: 900, y: 600 }
const OBJECT_SIZE = 30;

let worker = new Worker({ x: 15, y: 10 });

let canvasImage = new CanvasImage(context, BOARD_SIZE, OBJECT_SIZE);

// update game state
const update = function() {
    
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
new InputHandler(update, draw, worker);