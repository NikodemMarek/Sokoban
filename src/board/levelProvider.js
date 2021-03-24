import Worker from '/src/objects/worker.js'
import Boxes, { addBox } from '/src/objects/boxes.js'
import Box from '/src/objects/box.js'
import { BOARD_DIMENSIONS } from '/src/constants.js'
import { readLevels } from '/src/storage/levelSaver.js'

let byDifficultyMode = {
    easy: [],
    intermediate: [],
    hard: []
}
let levelsMode = []
let customLevels = []

export default class BoardProvider {
    constructor(_callback) {
        readCustomLevels();

        fetch('/assets/levels/levels_difficulty.json')
            .then(response => response.json())
            .then(levels => {
                Object.keys(byDifficultyMode).forEach(difficulty => {
                    Object.keys(levels[difficulty]).forEach(key => {
                        byDifficultyMode[difficulty].push({ 'name': key, 'data': levels[difficulty][key] })
                    });
                });

                fetch('/assets/levels/levels_levels_mode.json')
                    .then(response => response.json())
                    .then(levels => {
                        Object.keys(levels).forEach(key => {
                            levelsMode.push({ 'name': key, 'data': levels[key] });
                        });

                        _callback();
                });
            });
    }
};

export function readCustomLevels() { customLevels = readLevels() }

function convertToLevel(rawLevel) {
    let row = 0;
    let column = 0;

    let board = new Array(BOARD_DIMENSIONS.y).fill('e').map(() => new Array(BOARD_DIMENSIONS.x).fill('e'));
    let worker = new Worker({ x: 0, y: 0 })
    let boxes = new Boxes();

    [...rawLevel].forEach(element => {
        if(column >= BOARD_DIMENSIONS.x) {
            column = 0;
            row ++;
        }

        switch(element) {
            case 'p':
                worker = new Worker({ x: column, y: row });
                board[row][column] = 'e'
                break;
            case 'b':
                addBox(boxes, new Box({ x: column, y: row }, false));
                board[row][column] = 'e';
                break;
            case 'h':
                addBox(boxes, new Box({ x: column, y: row }, true));
                board[row][column] = 't';
                break;
            default:
                board[row][column] = element
        }

        column ++
    });

    return {
        'board': board,
        'worker': worker,
        'boxes': boxes
    };
}

export function getLevelByDifficulty(difficulty) {
    let level = byDifficultyMode[difficulty][Math.floor(Math.random() * byDifficultyMode[difficulty].length)];
    
    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}
export function getLevelByLevelNumber(levelNumber) {
    let level = levelsMode.length > levelNumber ? levelsMode[levelNumber]: levelsMode[levelsMode.length - 1];

    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}
export function getCustomLevel(levelName) {
    let level = customLevels.find(level => level['name'] == levelName);

    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}

export function getCustomLevelsNames() { return customLevels.map(level => level['name']) }