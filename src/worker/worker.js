export default class Worker {
    constructor(position) {
        this.position = position;
    }

    // draw worker
    draw(context) {
        // TODO draw worker on to the board
    }

    // change worker by x and y
    move({ x = 0, y = 0 } = {}) {
        this.position.x += x;
        this.position.y += y;
    }
};