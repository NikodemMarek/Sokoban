/**
 * @module boxes
 */

import { events, playSound } from '../canvas/sounds.js'
import { isWall, isTarget } from '../board/board.js'
import { draw as drawBox, move as moveBox } from '../objects/box.js'

/**
 * Przechowuje informacje o wszystkich pudełkach w grze.
 * @see module:box#Box
 * @name module:boxes#Boxes
 */
export default class Boxes {
    /**
     * Przyjmuje tablicę pudełek i zapisuje ją do zmiennej, lub tworzy nową pustą tablicę pudełek.
     * @see module:box#Box
     * @param {Array.<module:box#Box>} boxes - Tablica pudełek
     */
    constructor(boxes) {
        boxes == null ? this.boxes = []: this.boxes = boxes
    }
};

/**
 * Rysuje wszystkie pudełka na planszy.
 * @name module:boxes#draw
 * @function
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:canvasImage#CanvasImage} canvasImage - {@link module:canvasImage#CanvasImage CanvasImage}
 */
export function draw(boxes, canvasImage) { boxes.boxes.forEach(box => drawBox(box, canvasImage)) }

/**
 * Dodaje pudełko na planszę.
 * @name module:boxes#addBox
 * @function
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:box#Box} box - {@link nodule:box#Box Box}
 */
export function addBox(boxes, box) { boxes.boxes.push(box) }
/**
 * Usuwa pudełko z planszy.
 * @name module:boxes#removeBox
 * @function
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:index#Position} position - pozycja w której znajduje się pudełko
 */
export function removeBox(boxes, position) {
    boxes.boxes.forEach((box, index) => {
        if(box.position.x == position.x && box.position.y == position.y) boxes.boxes.splice(index, 1);
    });
}

/**
 * Sprawdza czy w podanej pozycji znajduje się pudełko.
 * @see module:box#Box
 * @name module:boxes#isBox
 * @function
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:index#Position} position - Pozycja do sprawdzenia
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
 * @see module:box#Box
 * @name module:boxes#move
 * @function
 * @param {board:Board} board - {@link module:board#Board Board}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:index#Position} startPosition - Pozycja w której znajduje się pudełko, które zostanie poruszone
 * @param {module:index#Position} direction - Ilość jednostek, o które zostanie przesunięte pudełko
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
 * @see module:box#Box
 * @name module:boxes#moveTo
 * @function
 * @param {board:Board} board - {@link module:board#Board Board}
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @param {module:index#Position} startPosition - Pozycja w której znajduje się pudełko, które zostanie prezsunięte
 * @param {module:indes#Position} direction - Liczba jednostek, o które zostanie przesunięte pudełko
 * @returns {boolean} Pudełko zostało przesunięte / nie zostało przesunięte
 */
export function moveTo(board, boxes, startPosition, direction) {
    let canMove = true;

    boxes.boxes.forEach(box => {
        if(
            box.position.x == startPosition.x &&
            box.position.y == startPosition.y
        ) if(!moveBox(box, direction)) canMove = false;
        else {
            let onTarget = isTarget(board, box.position);
            box.inPlace = onTarget;
            
            if(onTarget) playSound(events.BOX_ON_TARGET);
        }
    });

    return canMove;
}

/**
 * Sprawdza czy pudełka są na polach z celami i zwraca true lub false.
 * @name module:boxes#isVictory
 * @function
 * @param {module:boxes#Boxes} boxes - {@link module:boxes#Boxes Boxes}
 * @returns {boolean} Pudełka są / nie są w wygrywającej pozycji
 */
export function isVictory(boxes) {
    let victory = true;

    boxes.boxes.forEach(box => {
        if(!box.inPlace) victory = false;
    });

    return victory;
}