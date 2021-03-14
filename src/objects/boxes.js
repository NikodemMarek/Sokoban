import { isWall, isTarget } from '/src/board/board.js';

export default class Boxes {
    constructor(boxes) {
        boxes == null ? this.boxes = []: this.boxes = boxes
    }

    // draw all boxes to the board
    draw = canvasImage => this.boxes.forEach(box => box.draw(canvasImage));

    // add box to boxes list
    addBox = box => this.boxes.push(box);

    // is there a box in given position
    isBox(position) {
        let isBox = false;

        this.boxes.forEach(box => {
            if(
                box.position.x == position.x &&
                box.position.y == position.y
            ) isBox = true;
        });

        return isBox;
    }

    // move boxes
    move(startPosition, direction) {
        if(this.isBox(startPosition)) {
            let behindBox = {
                x: startPosition.x + direction.x,
                y: startPosition.y + direction.y
            }

            if(
                !this.isBox(behindBox) &&
                !isWall(behindBox)
            ) return this.moveTo(startPosition, direction);
            else return false;
        }

        // return true if move was successful
        return true;
    }
    moveTo(startPosition, direction) {
        let canMove = true;

        this.boxes.forEach(box => {
            if(
                box.position.x == startPosition.x &&
                box.position.y == startPosition.y
            ) if(!box.move(direction)) canMove = false;
            else box.inPlace = isTarget(box.position);
        });

        return canMove;
    }

    // check if all boxes are on the targets
    isVictory() {
        let victory = true;

        this.boxes.forEach(box => {
            if(!box.inPlace) victory = false;
        });
    
        return victory;
    }
};
