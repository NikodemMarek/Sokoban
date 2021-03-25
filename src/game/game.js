import InputHandler from '/src/input/inputHandler.js'
import { draw as drawWorker, move as moveWorker } from '/src/objects/worker.js'
import { BOARD_SIZE } from '/src/constants.js'
import { draw as drawBoxes, move as moveBoxes, isVictory } from '/src/objects/boxes.js'
import { isWall, draw as drawBoard } from '/src/board/board.js'
import GameHistory, { addMove, undoMove as undoMoveInHistory } from './gameHistory.js'
import Board from '/src/board/board.js'

export default class Game {
    constructor(context, canvasImage, level, onVictory, movesMade = 0, movesUndone = 0) {
        this.context = context;
        this.canvasImage = canvasImage;
        this.onVictory = onVictory;

        // set the board for the level
        this.board = new Board(canvasImage, level['board']);

        this.worker = level['worker'];
        this.boxes = level['boxes'];

        this.movesMade = movesMade;
        this.movesUndone = movesUndone;
        document.getElementById('s_moves_number').innerText = this.movesMade;

        // start saving the moves
        this.gameHistory = new GameHistory(this.worker, this.boxes, this.movesMade);

        // draw objects on the board, and the worker in their initial localizations
        draw(this);

        // check if game is already in victory state
        // initialize user input handler
        if(isVictory(this.boxes)) victory(this);
        else this.inputHandler = new InputHandler(this);
    }
}

// update game state
export function update(game, workerMovement) {
    if (!game.isPaused) {
        let canMove = true;

        // check for worker collision with a box
        canMove = moveBoxes(
            game.board,
            game.boxes, {
                x: game.worker.position.x + workerMovement.x,
                y: game.worker.position.y + workerMovement.y
            },
            workerMovement
        );

        // update worker position
        if (
            canMove &&
            !isWall(game.board, { x: game.worker.position.x + workerMovement.x, y: game.worker.position.y + workerMovement.y })
        ) {
            moveWorker(game.worker, workerMovement);

            if (workerMovement.x != 0 || workerMovement.y != 0) {
                // update number of moves
                document.getElementById('s_moves_number').innerText = ++ game.movesMade;

                addMove(game.gameHistory, game.worker, game.boxes, game.movesMade);
            }
        }

        // check for victory
        if(isVictory(game.boxes)) {
            draw(game);
            victory(game);
        }
    }
}

// draw objects on the board
export function draw(game) {
    if(!game.isPaused) {
        // draw game background
        game.canvasImage.drawBackground();

        // draw board
        drawBoard(game.board, game.canvasImage);

        // draw boxes
        drawBoxes(game.boxes, game.canvasImage);

        // draw worker on to the board
        drawWorker(game.worker, game.canvasImage);
    }
}

// undo last move
export function undoMove(game) {
    game.movesUndone ++;

    // undo move
    undoMoveInHistory(game.gameHistory);
    ({ 'worker': game.worker, 'boxes': game.boxes, 'moves': game.movesMade } = undoMoveInHistory(game.gameHistory));
    addMove(game.gameHistory, game.worker, game.boxes, game.movesMade);

    // draw changes
    draw(game);
    document.getElementById('s_moves_number').innerText = game.movesMade;
}

// handle win
function victory(game) {
    stop(game);

    // show victory message
    game.canvasImage.drawVictoryScreen();

    // show score
    game.context.fillStyle = 'rgba(0, 0, 0, 0.9)'
    game.context.font = '64px sans-serif';
    game.context.textAlign = 'center';
    game.context.fillText('Twój wynik: ' + game.onVictory(game.movesMade, game.movesUndone), BOARD_SIZE.x / 2, BOARD_SIZE.y / 2 + 31);
}

// unpause the game
export function start(game) {
    if(typeof game != 'undefined') {
        game.isPaused = false;
        if(typeof game.inputHandler != 'undefined') game.inputHandler.isPaused = false;
    }
}
// pause the game
export function stop(game) {
    if(typeof game != 'undefined') {
        game.isPaused = true;
        if(typeof game.inputHandler != 'undefined') game.inputHandler.isPaused = true;
    }
}
