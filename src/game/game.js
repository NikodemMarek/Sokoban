/**
 * @module game
 */

import InputHandler from '../input/inputHandler.js'
import { draw as drawWorker, move as moveWorker } from '../objects/worker.js'
import { BOARD_SIZE } from '../constants.js'
import { draw as drawBoxes, move as moveBoxes, isVictory } from '../objects/boxes.js'
import { isWall, draw as drawBoard } from '../board/board.js'
import GameHistory, { addMove, undoMove as undoMoveInHistory } from './gameHistory.js'
import Board from '../board/board.js'
import { events, playSound } from '../canvas/sounds.js'

/**
 * Przechowuje informacje o rozgrywanej grze.
 * @name module:game#Game
 */
export default class Game {
    /**
     * Przypisuje początkowe wartości zmiennym.
     * @param {CanvasRenderingContext2D} context - Context w którym będzie rysowana gra
     * @param {module:canvasImage#CanvasImage} canvasImage - {@link module:canvasImage#CanvasImage CanvasImage}
     * @param {module:levelProvider#Level} level - Dane planszy
     * @param {module:index#onVictory} onVictory - Funkcja wykonująca się wygranej
     * @param {number} movesMade - Ilość wykonanych ruchów
     * @param {number} movesUndone - Ilość cofniętych ruchów
     */
    constructor(context, canvasImage, level, onVictory, movesMade = 0, movesUndone = 0) {
        this.context = context;
        this.canvasImage = canvasImage;
        this.onVictory = onVictory;

        this.board = new Board(canvasImage, level['board']);

        this.worker = level['worker'];
        this.boxes = level['boxes'];

        this.movesMade = movesMade;
        this.movesUndone = movesUndone;
        document.getElementById('s_moves_number').innerText = this.movesMade;

        this.gameHistory = new GameHistory(this.worker, this.boxes, this.movesMade);

        draw(this);

        if(isVictory(this.boxes)) victory(this);
        else this.inputHandler = new InputHandler(this);
    }
}

/**
 * Aktualizuje grę, jęsli gra nie jest zatrzymana.
 * Na początku sprawdza czy na drodze magazyniera nie stoi pudełko lub ściana, jeśli nie, porusza magazyniera o podaną odległość.
 * Jeśli na drodze magazyniera stoi pudełko funkcja sprawdza czy można nim poruszyć, jeśli tak, przesuwa magazyniera i pudełko, jeśli nie, nie robi nic.
 * Na końcu sprawdza czy nastąpiła wygrana.
 * @name module:game#update
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 * @param {module:index#Position} workerMovement - Ilość jednostek o które ma zostać przesunięty magazynier.
 */
export function update(game, workerMovement) {
    if (!game.isPaused) {
        let canMove = true;

        canMove = moveBoxes(
            game.board,
            game.boxes, {
                x: game.worker.position.x + workerMovement.x,
                y: game.worker.position.y + workerMovement.y
            },
            workerMovement
        );

        if (
            canMove &&
            !isWall(game.board, { x: game.worker.position.x + workerMovement.x, y: game.worker.position.y + workerMovement.y })
        ) {
            moveWorker(game.worker, workerMovement);

            if (workerMovement.x != 0 || workerMovement.y != 0) {
                playSound(events.WORKER_MOVE);
                document.getElementById('s_moves_number').innerText = ++ game.movesMade;
                addMove(game.gameHistory, game.worker, game.boxes, game.movesMade);
            }
        }

        if(isVictory(game.boxes)) {
            draw(game);
            victory(game);
        }
    }
}
/**
 * Rysuje obecny stan gry.
 * @name module:game#draw
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 */
export function draw(game) {
    if(!game.isPaused) {
        game.canvasImage.drawBackground();

        drawBoard(game.board, game.canvasImage);

        drawBoxes(game.boxes, game.canvasImage);
        drawWorker(game.worker, game.canvasImage);
    }
}
/**
 * Cofa grę o jeden ruch do tyłu.
 * @see gameHistory
 * @name module:game#undoMove
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 */
export function undoMove(game) {
    game.movesUndone ++;

    undoMoveInHistory(game.gameHistory);
    ({ 'worker': game.worker, 'boxes': game.boxes, 'moves': game.movesMade } = undoMoveInHistory(game.gameHistory));
    addMove(game.gameHistory, game.worker, game.boxes, game.movesMade);

    draw(game);
    document.getElementById('s_moves_number').innerText = game.movesMade;
}

/**
 * Wykonuje się na końcu gry, podczas wygranej.
 * Liczy wynik i rysuje ekran wygranej.
 * @name module:game#victory
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 */
function victory(game) {
    stop(game);
    playSound(events.VICTORY);

    game.canvasImage.drawVictoryScreen();

    game.context.fillStyle = 'rgba(0, 0, 0, 0.9)'
    game.context.font = '64px sans-serif';
    game.context.textAlign = 'center';
    game.context.fillText('Twój wynik: ' + game.onVictory(game.movesMade, game.movesUndone), BOARD_SIZE.x / 2, BOARD_SIZE.y / 2 + 31);
}

/**
 * Rozpoczyna lub wznawia grę.
 * @name module:game#start
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 */
export function start(game) {
    if(typeof game != 'undefined') {
        game.isPaused = false;
        if(typeof game.inputHandler != 'undefined') game.inputHandler.isPaused = false;
    }
}
/**
 * Zatrzymuje grę.
 * @name module:game#stop
 * @function
 * @param {module:game#Game} game - {@link module:game#Game Game}
 */
export function stop(game) {
    if(typeof game != 'undefined') {
        game.isPaused = true;
        if(typeof game.inputHandler != 'undefined') game.inputHandler.isPaused = true;
    }
}
