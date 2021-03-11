import Worker from '/src/worker/worker.js';
export default class InputHandler {
    constructor(update, draw, worker) {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                case 'a':
                    // move left
                    worker.move({ x: -1 });
                    break;
                case 'ArrowRight':
                case 'd':
                    // move right
                    worker.move({ x: 1 });
                    break;
                case 'ArrowUp':
                case 'w':
                    // move up
                    worker.move({ y: -1 });
                    break;
                case 'ArrowDown':
                case 's':
                    // move down
                    worker.move({ y: 1 });
                    break;
            }

            // update and draw all objects
            update();
            draw();
        });
    }
};
