import { BOARD_DIMENSIONS } from '/src/constants.js'

export default class Box {
    constructor(position, inPlace = false) {
        this.position = position
        this.inPlace = inPlace
    }
};

export function draw(box, canvasImage) { canvasImage.drawBox(box.position) }

export function move(box, { x = 0, y = 0 } = {}) {
    if(
        box.position.x + x >= 0 &&
        box.position.x + x < BOARD_DIMENSIONS.x
    ) box.position.x += x;
    else return false;
    if(
        box.position.y + y >= 0 &&
        box.position.y + y < BOARD_DIMENSIONS.y
    ) box.position.y += y;
    else return false;

    return true;
}