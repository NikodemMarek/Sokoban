export default class InputHandler {
    constructor(update, draw, worker) {
        document.addEventListener('keydown', (event) => {
            let workerMovement = { x: 0, y: 0 }

            switch(event.key) {
                case 'ArrowLeft':
                case 'a':
                    // move left
                    workerMovement.x = -1
                    break;
                case 'ArrowRight':
                case 'd':
                    // move right
                    workerMovement.x = 1
                    break;
                case 'ArrowUp':
                case 'w':
                    // move up
                    workerMovement.y = -1
                    break;
                case 'ArrowDown':
                case 's':
                    // move down
                    workerMovement.y = 1
                    break;
            }

            // update and draw all objects
            update(workerMovement);
            draw();
        });
    }
};
