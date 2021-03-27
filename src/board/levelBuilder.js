/**
 * @module levelBuilder
 */

import BoardClickListener from '/src/input/boardClickListener.js'
import Board, { draw as drawBoard, setElement, isWall, isTarget } from '/src/board/board.js'
import Boxes, { draw as drawBoxes, addBox, removeBox, isBox } from '/src/objects/boxes.js'
import Box from '/src/objects/box.js'
import Worker, { draw as drawWorker } from '/src/objects/worker.js'

/**
 * Klasa przechowywuje informacje o obecnie edytowanym poziomie.
 */
export default class LevelBuilder {
    /**
     * Konstruktor przyjmuje i zapisuje do zmiennych {@link index:context} oraz {@link index:canvasImage}, uruchamia {@link boardClickListener:BoardClickListener} i rysuje poziom w domyślnym ustawieniu.
     * @param {CanvasRenderingContext2D} context - Context w którym jest rysowany poziom
     * @param {CanvasImage} canvasImage - CanvasImage którego będzie używać plansza
     */
    constructor(context, canvasImage) {
        this.context = context;
        this.canvasImage = canvasImage;

        /**
         * Zmienna trzymająca informacje o stanie edytora poziomów (wstrzymany / działający).
         * @type {boolean}
         */
        this.isPaused = false;
        /**
         * Wybrany przez gracza obiekt, który jest stawiany na plansz.
         * @type {string}
         */
        this.object = 'e';
        /**
         * Liczba celów ustawionych na planszy.
         * @type {number}
         */
        this.targetsNumber = 0;

        /**
         * Pudełka ustawione na planszy.
         * @see {@link boxes:Boxes}
         * @type {Boxes}
         */
        this.boxes = new Boxes();
        /**
         * Plansza która będzie edytowana.
         * @see {@link board:Board}
         * @type {Board}
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
 * Funkcja rysująca poziom.
 * @param {LevelBuilder} levelBuilder - Obiekt klasy {@link LevelBuilder}
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
 * Funkcja aktualizująca poziom, po naciśnięciu na canvas.
 * @param {LevelBuilder} levelBuilder - Obiekt klasy {@link LevelBuilder}
 * @param {index:Position} clickPosition - Pozycja w której kliknięty został canvas
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
 * Funkcja która sprawdza czy w podanej pozycji znajduje się magazynier.
 * @see {@link worker:Worker}
 * @param {Worker} worker - Obiekt klasy {@link worker:Worker}
 * @param {index:Position} position - Pozycja do sprawdzenia
 * @returns {boolean} Czy w podanej pozycji znajduje się magazynier
 */
function isWorker(worker, position) {
    if(typeof worker == 'undefined') return false;
    else return worker.position.x == position.x && worker.position.y == position.y;
}

/**
 * Funkcja rozpoczynająca kreator poziomów.
 * @param {LevelBuilder} levelBuilder - Obiekt klasy {@link LevelBuilder}
 */
export function start(levelBuilder) {
    levelBuilder.isPaused = false;
    levelBuilder.boardClickListener.isPaused = false;
}
/**
 * Funkcja zatrzymująca kreator poziomów.
 * @param {LevelBuilder} levelBuilder - Obiekt klasy {@link LevelBuilder}
 */
export function stop(levelBuilder) {
    levelBuilder.isPaused = true;
    levelBuilder.boardClickListener.isPaused = true;
}