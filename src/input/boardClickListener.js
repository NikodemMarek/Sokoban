import { draw, update } from '/src/board/levelBuilder.js';
import { OBJECT_SIZE } from '/src/constants.js'

export default class BoardClickListener {
    constructor(levelBuilder) {
        let canvas = document.getElementById('c_game_screen');

        let clicked = false;
        canvas.addEventListener('mousedown', (event) => {
            clicked = true;
            onEvent(levelBuilder, event);
        });
        canvas.addEventListener('mouseup', (event) => clicked = false);

        canvas.addEventListener('mousemove', (event) => { if(clicked) onEvent(levelBuilder, event); });
    }
};

function onEvent(levelBuilder, event) {
    let clickPosition = {
        'x': ~~(event.offsetX / OBJECT_SIZE),
        'y': ~~(event.offsetY / OBJECT_SIZE)
    }

    update(levelBuilder, clickPosition);
    draw(levelBuilder);
}