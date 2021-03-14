import { BOARD_DIMENSIONS } from "/src/constants.js";

// board with obstacles and targets
// e - empty tile, t - target tile, w - wall tile
let board

// set the board
export function setBoard(newBoard) { board = newBoard }

// draw elements on the board
export function draw(canvasImage) {
    for(const [y, row] of board.entries()) {
        for(const [x, index] of row.entries()) {
            switch(index) {
                case 'w':
                    canvasImage.drawWall({ x: x, y: y });
                    break;
                case 't':
                    canvasImage.drawTarget({ x: x, y: y });
                    break;
            }
        }
    }
}

// check if wall is in given position
export function isWall(position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board[position.y][position.x] == 'w';
    else return true;
}

// check if target tile is in given position
export function isTarget(position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board[position.y][position.x] == 't';
    else return true;
}
