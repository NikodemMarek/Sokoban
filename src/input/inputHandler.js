/**
 * @module inputHandler
 */

import { update, draw } from '/src/game/game.js'

/**
 * Pozwala na wykrycie kliknięcia przycisku na klawiaturze.
 */
export default class InputHandler {
    /**
     * Przyjmuje {@link game:Game}, która będzie aktualizowana po naciśnięciu wasd lub klawiszy strzałek.
     * @param {game:Game} game - {@link game:Game}
     */
    constructor(game) {
        this.isPaused = true;

        document.addEventListener('keydown', (event) => {
            let workerMovement = { x: 0, y: 0 }

            if (!this.isPaused) {
                switch (event.key) {
                    case 'ArrowLeft':
                    case 'a':
                        // move left
                        workerMovement.x = -1
                        break;
                    case 'ArrowRight':
                    case 'd':
                        // move right
                        workerMovement.x = 1
                        break;
                    case 'ArrowUp':
                    case 'w':
                        // move up
                        workerMovement.y = -1
                        break;
                    case 'ArrowDown':
                    case 's':
                        // move down
                        workerMovement.y = 1
                        break;
                }

                // update and draw all objects
                update(game, workerMovement);
                draw(game);
            }
        });
    }
};