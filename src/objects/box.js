import { BOARD_DIMENSIONS } from '/src/constants.js'

export default class Box {
    constructor(position, inPlace) {
        this.position = position
        this.inPlace = inPlace
    }

    draw(canvasImage) {
        canvasImage.drawBox(this.position);
    }

    move({ x = 0, y = 0 } = {}) {
        if(
            this.position.x + x >= 0 &&
            this.position.x + x < BOARD_DIMENSIONS.x
        ) this.position.x += x;
        else return false;
        if(
            this.position.y + y >= 0 &&
            this.position.y + y < BOARD_DIMENSIONS.y
        ) this.position.y += y;
        else return false;

        return true;
    }
};
