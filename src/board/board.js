import { BOARD_DIMENSIONS } from "/src/constants.js";
export default class Board {
    constructor(canvasImage, board) {
        // board with obstacles and targets
        // e - empty tile, t - target tile, w - wall tile
        this.canvasImage = canvasImage;
        this.board = board;
    }
};

// draw elements on the board
export function draw(board) {
    for(const [y, row] of board.board.entries()) {
        for(const [x, index] of row.entries()) {
            switch(index) {
                case 'w':
                    board.canvasImage.drawWall({ x: x, y: y });
                    break;
                case 't':
                    board.canvasImage.drawTarget({ x: x, y: y });
                    break;
            }
        }
    }
}

// check if wall is in given position
export function isWall(board, position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board.board[position.y][position.x] == 'w';
    else return true;
}
// check if target tile is in given position
export function isTarget(board, position) {
    if(
        position.x >= 0 && position.x < BOARD_DIMENSIONS.x &&
        position.y >= 0 && position.y < BOARD_DIMENSIONS.y 
    ) return board.board[position.y][position.x] == 't';
    else return true;
}
