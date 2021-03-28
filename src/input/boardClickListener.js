/**
 * @module boardClickListener
 */

import { draw, update } from '/src/board/levelBuilder.js';
import { OBJECT_SIZE } from '/src/constants.js'

/**
 * Pozwala na wykrycie kliknięć na planszę.
 */
export default class BoardClickListener {
    /**
     * Przyjmuje {@link levelBuilder:LevelBuilder}, który będzie aktualizowany po naciśnięciu na planszę.
     * @param {levelBuilder:LevelBuilder} levelBuilder - {@link levelBuilder:LevelBuilder}
     */
    constructor(levelBuilder) {
        this.isPaused = false;

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

/**
 * Wykonuje update i draw na danym {@link levelBuilder:LevelBuilder}, po kliknięciu na context.
 * @see levelBuilder:LevelBuilder
 * @param {levelBuilder:LevelBuilder} levelBuilder - {@link levelBuilder:LevelBuilder}
 * @param {MouseEvent} event - Zdarzenie kliknięcia
 */
function onEvent(levelBuilder, event) {
    if(!levelBuilder.isPaused) {
        let clickPosition = {
            'x': ~~(event.offsetX / OBJECT_SIZE),
            'y': ~~(event.offsetY / OBJECT_SIZE)
        }

        update(levelBuilder, clickPosition);
        draw(levelBuilder);
    }
}