export default class InputHandler {
    constructor() {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                case 'a':
                    // move left
                    break;
                case 'ArrowRight':
                case 'd':
                    // move right
                    break;
                case 'ArrowUp':
                case 'w':
                    // move up
                    break;
                case 'ArrowDown':
                case 's':
                    // move down
                    break;
            }
        });
    }
};
