import InputHandler from './input/input-handler.js'
import Worker from './worker/worker.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

const SCREEN_SIZE = { x: 900, y: 600 }

let worker = new Worker({ x: 15, y: 10 });

// update game state
const update = function() {
    
}
// draw objects on the board
const draw = function() {
    worker.draw(context);
}

// draw objects on the board, and the worker in their initial localizations
draw(context);

// initialize user input handler and start the game
new InputHandler(update, draw, worker);