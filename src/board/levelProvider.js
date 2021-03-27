/**
 * @module levelProvider
 */

import Worker from '/src/objects/worker.js'
import Boxes, { addBox } from '/src/objects/boxes.js'
import Box from '/src/objects/box.js'
import { BOARD_DIMENSIONS } from '/src/constants.js'
import { readLevels } from '/src/storage/levelSaver.js'

/**
 * Format poziomu używany przez klasę {@link game#Game}.
 * @typedef {{
 *          board: board:Board,
 *          worker: worker:Worker,
 *          boxes: boxes:Boxes
 *      }} Level
 */

/**
 * Wczytane poziomy z trybu 1, w postaci tekstu, podzielone na poziomy trudności.
 * Poziomy są wczytywane z assets\levels\levels_difficulty.json.
 * @see readLevelsByDifficulty
 * @type {
 *      Array.<{
 *          string: Array.<{ name: string, data: string }>,
 *          string: Array.<{ name: string, data: string }>,
 *          string: Array.<{ name: string, data: string }>
 *      }>
 * }
 */
let byDifficultyMode = {
    easy: [],
    intermediate: [],
    hard: []
}
/**
 * Wczytane poziomy z trybu 2, w postaci tekstu.
 * Poziomy są wczytywane z assets\levels\levels_levels_mode.json.
 * @see readLevelsLevelsByLevelNumber
 * @type {
 *      Array.<{
 *          name: string,
 *          data: string
 *      }>
 * }
 */
let levelsMode = []
/**
 * Wczytane poziomy stworzone przez gracza z trybu 3, w postaci tekstu.
 * Poziomy są wczytywane z localStorage.
 * @see readCustomLevels
 * @type {
 *      Array.<{
 *          name: string,
 *          data: string
 *      }>
 * }
 */
let customLevels = []

/**
 * Klasa która po włączeniu strony wczytuje poziomy.
 */
export default class LevelProvider {
    /**
     * Konstruktor zwraca Promise który wczytuje poziomy.
     * Poziomy do 1 i 2 trybu gry są wczytywane z assets\levels, a do 3 trybu z localStorage.
     * @returns {Promise} Promise wczytujący poziomy
     */
    constructor() {
        return new Promise(async (resolve, reject) => {
            try {
                readCustomLevels();

                await readLevelsByDifficulty();
                await readLevelsLevelsByLevelNumber();

                resolve();
            } catch(error) {
                reject(error);
            }
        });
    }
};

/**
 * Funkcja wczytuje poziomy z assets\levels\levels_levels_mode.json do 1 trybu gry i zapisuje je do tablicy {@link byDifficultyMode}.
 */
export async function readLevelsByDifficulty() {
    await fetch('/assets/levels/levels_difficulty.json')
            .then(response => response.json())
            .then(levels => {
                Object.keys(byDifficultyMode).forEach(difficulty => {
                    Object.keys(levels[difficulty]).forEach(key => {
                        byDifficultyMode[difficulty].push({ 'name': key, 'data': levels[difficulty][key] })
                    });
                });
            });
}
/**
 * Funkcja wczytuje poziomy z assets\levels\levels_difficulty.json do 2 trybu gry i zapisuje je do tablicy {@link levelsMode}.
 */
export async function readLevelsLevelsByLevelNumber() {
    await fetch('/assets/levels/levels_levels_mode.json')
            .then(response => response.json())
            .then(levels => {
                Object.keys(levels).forEach(key => {
                    levelsMode.push({ 'name': key, 'data': levels[key] });
                });
            });
}
/**
 * Funkcja wczytuje poziomy z localStorage do 3 trybu gry i zapisuje je do tablicy {@link customLevels}.
 * @see {levelSaver:readLevels}
 */
export function readCustomLevels() { customLevels = readLevels() }

/**
 * Funkcja przyjmuje poziom w postaci tekstu i konwertuje go na {@link Level}.
 * @param {string} rawLevel - Poziom w postaci tekstu
 * @returns {Level} Poziom po konwersji
 */
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

/**
 * Funkcja zwraca losowy poziom o podanym poziomie trudności, z 1 trybu gry.
 * @param {string} difficulty - Poziom trudności
 * @returns {
 *      {
 *          name: string,
 *          level: Level
 *      }
 * } Poziom z nazwą
 */
export function getLevelByDifficulty(difficulty) {
    let level = byDifficultyMode[difficulty][Math.floor(Math.random() * byDifficultyMode[difficulty].length)];
    
    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}
/**
 * Funkcja zwraca poziom o podanym numerze, z 2 trybu gry.
 * @param {number} levelNumber - Numer poziomu
 * @returns {
 *      {
 *          name: string,
 *          level: Level
 *      }
 * } Poziom z nazwą
 */
export function getLevelByLevelNumber(levelNumber) {
    let level = levelsMode.length > levelNumber ? levelsMode[levelNumber]: levelsMode[levelsMode.length - 1];

    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}
/**
 * Funkcja zwraca poziom o podanej nazwie, z 3 trybu gry.
 * @param {string} levelName - Nazwa poziomu
 * @returns {
 *      {
 *          name: string,
 *          level: Level
 *      }
 * } Poziom z nazwą
 */
export function getCustomLevel(levelName) {
    let level = customLevels.find(level => level['name'] == levelName);

    return {
        'name': level['name'],
        'level': convertToLevel(level['data'])
    }
}

/**
 * Funkcja zwraca nazwy wczytanych poziomów z 3 trybu gry.
 * @returns {Array.<string>} 
 */
export function getCustomLevelsNames() { return customLevels.map(level => level['name']) }