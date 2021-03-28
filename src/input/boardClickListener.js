/**
 * @module boardClickListener
 */

import { draw, update } from '/src/board/levelBuilder.js';
import { OBJECT_SIZE } from '/src/constants.js'

/**
 * Pozwala na wykrycie kliknięć na planszę.
 * @name module:boardClickListener#BoardClickListener
 */
export default class BoardClickListener {
    /**
     * Przyjmuje {@link module:levelBuilder#LevelBuilder LevelBuilder}, który będzie aktualizowany po naciśnięciu na planszę.
     * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
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
 * Wykonuje update i draw na danym {@link module:levelBuilder#LevelBuilder LevelBuilder}, po kliknięciu na context.
 * @name module:boardClickListener#onEvent
 * @function
 * @see module:levelBuilder#LevelBuilder
 * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
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