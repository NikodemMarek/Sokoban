/**
 * @module inputHandler
 */

import { update, draw } from '../game/game.js'

/**
 * Pozwala na wykrycie kliknięcia przycisku na klawiaturze.
 * @name module:inputHandler#InputHandler
 */
export default class InputHandler {
    /**
     * Przyjmuje {@link module:game#Game Game}, która będzie aktualizowana po naciśnięciu wasd lub klawiszy strzałek.
     * @param {module:game#Game} game - {@link module:game#Game Game}
     */
    constructor(game) {
        this.isPaused = true;

        document.addEventListener('keydown', (event) => {
            let workerMovement = { x: 0, y: 0 }

            if (!this.isPaused) {
                switch (event.key) {
                    case 'ArrowLeft':
                    case 'a':
                        workerMovement.x = -1
                        break;
                    case 'ArrowRight':
                    case 'd':
                        workerMovement.x = 1
                        break;
                    case 'ArrowUp':
                    case 'w':
                        workerMovement.y = -1
                        break;
                    case 'ArrowDown':
                    case 's':
                        workerMovement.y = 1
                        break;
                }

                update(game, workerMovement);
                draw(game);
            }
        });
    }
};