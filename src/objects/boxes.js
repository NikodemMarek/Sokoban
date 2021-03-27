/**
 * @module boxes
 */

import { isWall, isTarget } from '/src/board/board.js'
import { draw as drawBox, move as moveBox } from '/src/objects/box.js'

/**
 * Przechowuje informacje o wszystkich pudełkach w grze.
 * @see box:Box
 */
export default class Boxes {
    /**
     * Przyjmuje tablicę pudełek i zapisuje ją do zmiennej, lub tworzy nową pustą tablicę pudełek.
     * @see box:Box
     * @param {Array.<box:Box>} boxes - Tablica pudełek
     */
    constructor(boxes) {
        boxes == null ? this.boxes = []: this.boxes = boxes
    }
};

/**
 * Rysuje wszystkie pudełka na planszy.
 * @param {Boxes} boxes - {@link Boxes}
 * @param {canvasImage:CanvasImage} canvasImage - {@link canvasImage:CanvasImage}
 */
export function draw(boxes, canvasImage) { boxes.boxes.forEach(box => drawBox(box, canvasImage)) }

/**
 * Dodaje pudełko na planszę.
 * @param {Boxes} boxes - {@link Boxes}
 * @param {box:Box} box - {@link box:Box}
 */
export function addBox(boxes, box) { boxes.boxes.push(box) }
/**
 * Usuwa pudełko z planszy.
 * @param {Boxes} boxes - {@link Boxes}
 * @param {index:Position} position - pozycja w której znajduje się pudełko
 */
export function removeBox(boxes, position) {
    boxes.boxes.forEach((box, index) => {
        if(box.position.x == position.x && box.position.y == position.y) boxes.boxes.splice(index, 1);
    });
}

/**
 * Sprawdza czy w podanej pozycji znajduje się pudełko.
 * @see box:Box
 * @param {Boxes} boxes - {@link Boxes}
 * @param {index:Position} position - Pozycja do sprawdzenia
 * @returns {boolean} Pudełko jest / nie jest w danej pozycji
 */
export function isBox(boxes, position) {
    let isBox = false;

    boxes.boxes.forEach(box => {
        if(
            box.position.x == position.x &&
            box.position.y == position.y
        ) isBox = true;
    });

    return isBox;
}

/**
 * Sprawdza czy pudełkiem z danej pozycji można poruszyć o podaną liczbę jednostek (czy na drodze stoi inne pudełko lub ściana).
 * Jeśli może, porusza pudełko i zwraca true, jeśli nie, zwraca false.
 * @see box:Box
 * @param {board:Board} board - {@link board:Board}
 * @param {Boxes} boxes - {@link Boxes}
 * @param {index:Position} startPosition - Pozycja w której znajduje się pudełko, które zostanie poruszone
 * @param {index:Position} direction - Ilość jednostek, o które zostanie przesunięte pudełko
 * @returns {boolean} Pudełko zostało / nie zostało (na drodze stoi inne pudełko lub ściana) przesunięte
 */
export function move(board, boxes, startPosition, direction) {
    if(isBox(boxes, startPosition)) {
        let behindBox = {
            x: startPosition.x + direction.x,
            y: startPosition.y + direction.y
        }

        if(
            !isBox(boxes, behindBox) &&
            !isWall(board, behindBox)
        ) return moveTo(board, boxes, startPosition, direction);
        else return false;
    }

    return true;
}
/**
 * sprawdza czy pudełko w podanej pozycji może być przesunięte o podaną liczbę jednostek i jeśli tak, przesuwa je, oraz zwraca true, jeśli nie zwraca false.
 * Jeśli pudełko zostało przesunięte sprawdza czy pudełko znalazło się na celu.
 * @see box:Box
 * @param {board:Board} board - {@link board:Board}
 * @param {Boxes} boxes - {@link Boxes}
 * @param {index:Position} startPosition - Pozycja w której znajduje się pudełko, które zostanie prezsunięte
 * @param {indes:Position} direction - Liczba jednostek, o które zostanie przesunięte pudełko
 * @returns {boolean} Pudełko zostało przesunięte / nie zostało przesunięte
 */
export function moveTo(board, boxes, startPosition, direction) {
    let canMove = true;

    boxes.boxes.forEach(box => {
        if(
            box.position.x == startPosition.x &&
            box.position.y == startPosition.y
        ) if(!moveBox(box, direction)) canMove = false;
        else box.inPlace = isTarget(board, box.position);
    });

    return canMove;
}

/**
 * Sprawdza czy pudełka są na polach z celami i zwraca true lub false.
 * @param {Boxes} boxes - {@link Boxes}
 * @returns {boolean} Pudełka są / nie są w wygrywającej pozycji
 */
export function isVictory(boxes) {
    let victory = true;

    boxes.boxes.forEach(box => {
        if(!box.inPlace) victory = false;
    });

    return victory;
}