import { BOARD_DIMENSIONS, CUSTOM_LEVEL_PREFIX } from '/src/constants.js'

export function saveLevel(levelName, board, boxes, worker) {
    localStorage.setItem(CUSTOM_LEVEL_PREFIX + levelName, convertToRawLevel(board, boxes, worker));
}

function convertToRawLevel(board, boxes, worker) {
    let rawLevel = 'e'.repeat(BOARD_DIMENSIONS.x * BOARD_DIMENSIONS.y);

    board.board.forEach((row, rowIndex) => {
        row.forEach((index, columnIndex) => {
            rawLevel = rawLevel.replaceAt(rowIndex * BOARD_DIMENSIONS.x + columnIndex, index);
        });
    });

    boxes.boxes.forEach(box => {
        let rawLevelPosition = box.position.y * BOARD_DIMENSIONS.x + box.position.x;

        if(rawLevel[rawLevelPosition] == 't') rawLevel = rawLevel.replaceAt(rawLevelPosition, 'h');
        else rawLevel = rawLevel.replaceAt(rawLevelPosition, 'b');
    });

    if(typeof worker != 'undefined') rawLevel = rawLevel.replaceAt(worker.position.y * BOARD_DIMENSIONS.x + worker.position.x, 'p');

    return rawLevel;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export function readLevels() {
    let savedLevels = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(CUSTOM_LEVEL_PREFIX))
        .forEach(key => {
            savedLevels.push({
                'name': key.replace(CUSTOM_LEVEL_PREFIX, ''),
                'data': localStorage.getItem(key)
            });
        });

    return savedLevels;
};