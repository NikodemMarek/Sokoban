/**
 * @module canvasImage
 */

import { OBJECT_SIZE, BOARD_SIZE } from '/src/constants.js'

/**
 * Pozwala na rysowanie obrazów w {@link module:index#context context}.
 * @name module:canvasImage#CanvasImage
 */
export default class CanvasImage {
    /**
     * Przyjmuje i zapisuje do zmiennej {@link module:index#context context}.
     * Wczytuje obrazy elementów w grze.
     * @param {CanvasRenderingContext2D} context - Context w którym będą rysowane elementy
     */
    constructor(context) {
        this.context = context;

        this.backgroundImage = document.getElementById('background_image');

        this.workerImage = document.getElementById('worker_image');
        this.boxImage = document.getElementById('box_image');

        this.wallImage = document.getElementById('wall_image');
        this.targetImage = document.getElementById('target_image');

        this.victoryImage = document.getElementById('victory_image');
    }

    /**
     * Rysuje tło na całej planszy.
     * @name module:canvasImage#drawBackground
     * @method
     */
    drawBackground() {
        this.context.drawImage(
            this.backgroundImage,
            0, 0,
            BOARD_SIZE.x, BOARD_SIZE.y
        );
    }

    /**
     * Rysuje magazyniera w danej pozycji na planszy.
     * @name module:canvasImage#drawWorker
     * @method
     * @param {module:index#Position} position - Pozycja w której będzie narysowany magazynier
     */
    drawWorker(position) {
        this.context.drawImage(
            this.workerImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
    /**
     * Rysuje pudełko w danej pozycji na planszy.
     * @name module:canvasImage#drawBox
     * @method
     * @param {module:index#Position} position - Pozycja w której będzie narysowane pudełko
     */
    drawBox(position) {
        this.context.drawImage(
            this.boxImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }

    /**
     * Rysuje ścianę w danej pozycji na planszy.
     * @name module:canvasImage#drawWall
     * @method
     * @param {module:index#Position} position - Pozycja w której będzie narysowana ściana
     */
    drawWall(position) {
        this.context.drawImage(
            this.wallImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }
    /**
     * Rysuje cel w danej pozycji na planszy.
     * @name module:canvasImage#drawTarget
     * @method
     * @param {module:index#Position} position - Pozycja w której będzie narysowany cel
     */
    drawTarget(position) {
        this.context.drawImage(
            this.targetImage,
            position.x * OBJECT_SIZE, position.y * OBJECT_SIZE,
            OBJECT_SIZE, OBJECT_SIZE
        );
    }

    /**
     * Rysuje ekran wygranej na całej planszy.
     * @name module:canvasImage#drawVictoryScreen
     * @method
     */
    drawVictoryScreen() {
        this.context.drawImage(
            this.victoryImage,
            0, 0,
            BOARD_SIZE.x, BOARD_SIZE.y
        );
    }
};