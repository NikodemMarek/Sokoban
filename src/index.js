import InputHandler from './input/input-handler.js'

let canvas = document.getElementById('gameScreen');
let context = canvas.getContext('2d');

let SCREEN_SIZE = { x: 900, y: 600 }

// initialize user input handler
new InputHandler();