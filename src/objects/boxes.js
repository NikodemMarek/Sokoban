import { isWall, isTarget } from '/src/board/board.js'
import { draw as drawBox, move as moveBox } from '/src/objects/box.js'

export default class Boxes {
    constructor(boxes) {
        boxes == null ? this.boxes = []: this.boxes = boxes
    }
};

// draw all boxes to the board
export function draw(boxes, canvasImage) { boxes.boxes.forEach(box => drawBox(box, canvasImage)) }

// add box to boxes list
export function addBox(boxes, box) { boxes.boxes.push(box) }

// is there a box in given position
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

// move boxes
export function move(boxes, startPosition, direction) {
    if(isBox(boxes, startPosition)) {
        let behindBox = {
            x: startPosition.x + direction.x,
            y: startPosition.y + direction.y
        }

        if(
            !isBox(boxes, behindBox) &&
            !isWall(behindBox)
        ) return moveTo(boxes, startPosition, direction);
        else return false;
    }

    // return true if move was successful
    return true;
}
export function moveTo(boxes, startPosition, direction) {
    let canMove = true;

    boxes.boxes.forEach(box => {
        if(
            box.position.x == startPosition.x &&
            box.position.y == startPosition.y
        ) if(!moveBox(box, direction)) canMove = false;
        else box.inPlace = isTarget(box.position);
    });

    return canMove;
}

// check if all boxes are on the targets
export function isVictory(boxes) {
    let victory = true;

    boxes.boxes.forEach(box => {
        if(!box.inPlace) victory = false;
    });

    return victory;
}