/**
 * @module levelBuilder
 */

import BoardClickListener from '../input/boardClickListener.js'
import Board, { draw as drawBoard, setElement, isWall, isTarget } from './board.js'
import Boxes, { draw as drawBoxes, addBox, removeBox, isBox } from '../objects/boxes.js'
import Box from '../objects/box.js'
import Worker, { draw as drawWorker } from '../objects/worker.js'

/**
 * Przechowywuje informacje o obecnie edytowanym poziomie.
 * @name module:levelBuilder#LevelBuilder
 */
export default class LevelBuilder {
    /**
     * Przyjmuje i zapisuje do zmiennych {@link module:index#context context} oraz {@link @name module:canvasImage#CanvasImage CanvasImage}, uruchamia {@link module:boardClickListener#BoardClickListener BoardClickListener} i rysuje poziom w domyślnym ustawieniu.
     * @param {CanvasRenderingContext2D} context - Context w którym jest rysowany poziom
     * @param {module:canvasImage#CanvasImage} canvasImage - CanvasImage którego będzie używać plansza
     */
    constructor(context, canvasImage) {
        this.context = context;
        this.canvasImage = canvasImage;

        /**
         * Zmienna trzymająca informacje o stanie edytora poziomów (wstrzymany / działający).
         * @name module:levelBuilder#CanvasImage.isPaused
         * @type {boolean}
         */
        this.isPaused = false;
        /**
         * Wybrany przez gracza obiekt, który jest stawiany na plansz.
         * @name module:levelBuilder#CanvasImage.object
         * @type {string}
         */
        this.object = 'e';
        /**
         * Liczba celów ustawionych na planszy.
         * @name module:levelBuilder#CanvasImage.targetsNumber
         * @type {number}
         */
        this.targetsNumber = 0;

        /**
         * Pudełka ustawione na planszy.
         * @see {@link module:boxes#Boxes}
         * @name module:levelBuilder#LevelBuilder.boxes
         * @type {Boxes}
         */
        this.boxes = new Boxes();
        /**
         * Plansza która będzie edytowana.
         * @see {@link module:board#Board}
         * @type {module:board#Board}
         */
        this.board = new Board(
            canvasImage,
            [
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            ]
        );

        draw(this);

        this.boardClickListener = new BoardClickListener(this);
    }
};

/**
 * Rysuje poziom.
 * @name module:levelBuilder#draw
 * @function
 * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
 */
export function draw(levelBuilder) {
    if(!levelBuilder.isPaused) {
        levelBuilder.canvasImage.drawBackground();

        drawBoard(levelBuilder.board, levelBuilder.canvasImage);

        drawBoxes(levelBuilder.boxes, levelBuilder.canvasImage);
        if(typeof levelBuilder.worker != 'undefined') drawWorker(levelBuilder.worker, levelBuilder.canvasImage);
    }
}
/**
 * Aktualizuje poziom, po naciśnięciu na canvas.
 * @name module:levelBuilder#update
 * @function
 * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
 * @param {module:index#Position} clickPosition - Pozycja w której kliknięty został canvas
 */
export function update(levelBuilder, clickPosition) {
    if(!levelBuilder.isPaused) {
        switch(levelBuilder.object) {
            case 'e':
                removeBox(levelBuilder.boxes, clickPosition);
                if(isWorker(levelBuilder.worker, clickPosition)) levelBuilder.worker = undefined;

                if(isTarget(levelBuilder.board, clickPosition)) levelBuilder.targetsNumber --;
                setElement(levelBuilder.board, clickPosition, levelBuilder.object);
                break;
            case 'w':
                if(
                    !isWorker(levelBuilder.worker, clickPosition) &&
                    !isBox(levelBuilder.boxes, clickPosition)
                ) setElement(levelBuilder.board, clickPosition, levelBuilder.object);
                break;
            case 't':
                if(!isTarget(levelBuilder.board, clickPosition)) {
                    setElement(levelBuilder.board, clickPosition, levelBuilder.object);

                    levelBuilder.targetsNumber ++;
                }
                break;
            case 'b':
                if(
                    !isWall(levelBuilder.board, clickPosition) &&
                    !isWorker(levelBuilder.worker, clickPosition) &&
                    !isBox(levelBuilder.boxes, clickPosition)
                ) {
                    addBox(
                        levelBuilder.boxes,
                        new Box(
                            clickPosition,
                            isTarget(levelBuilder.board, clickPosition)
                        )
                    );
                }
                break;
            case 'p':
                if(
                    !isWall(levelBuilder.board, clickPosition) &&
                    !isBox(levelBuilder.boxes, clickPosition)
                ) levelBuilder.worker = new Worker(clickPosition);
                break;
        }
    }
}

/**
 * Sprawdza czy w podanej pozycji znajduje się magazynier.
 * @see {@link module:worker#Worker}
 * @name module:levelBuilder#isWorker
 * @function
 * @param {module:worker#Worker} worker - {@link module:worker#Worker Worker}
 * @param {module:index#Position} position - Pozycja do sprawdzenia
 * @returns {boolean} W podanej pozycji znajduje się / nie znajduje się magazynier
 */
function isWorker(worker, position) {
    if(typeof worker == 'undefined') return false;
    else return worker.position.x == position.x && worker.position.y == position.y;
}

/**
 * Rozpoczyna kreator poziomów.
 * @name module:levelBuilder#start
 * @function
 * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
 */
export function start(levelBuilder) {
    levelBuilder.isPaused = false;
    levelBuilder.boardClickListener.isPaused = false;
}
/**
 * Zatrzymuje kreator poziomów.
 * @name module:levelBuilder#stop
 * @function
 * @param {module:levelBuilder#LevelBuilder} levelBuilder - {@link module:levelBuilder#LevelBuilder LevelBuilder}
 */
export function stop(levelBuilder) {
    levelBuilder.isPaused = true;
    levelBuilder.boardClickListener.isPaused = true;
}