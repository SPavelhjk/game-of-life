import Core from './Core';
import Draw from './draw/DrawWebGL';
import { throttle } from './utils';
const CELL_SIZE = 20;
const FRAME_RATE = 20;
const FRAME_INTERVAL = 1000 / FRAME_RATE;
let lastFrameTime = 0;
class GameOfLife {
    constructor({ rows, cols, canvas }) {
        var _a, _b, _c;
        this.step = (currentTime) => {
            if (!this.isRunning)
                return;
            if (currentTime - lastFrameTime >= FRAME_INTERVAL) {
                try {
                    const nextState = this.iterator.next();
                    const updatedBoard = nextState.value;
                    this.draw.drawBoard(updatedBoard);
                    lastFrameTime = currentTime;
                }
                catch (error) {
                    console.error('An error has occured:', error);
                    return;
                }
            }
            requestAnimationFrame(this.step.bind(this));
        };
        this.handleCanvasClick = (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const row = Math.floor(y / CELL_SIZE);
            const col = Math.floor(x / CELL_SIZE);
            this.core.toggle(row, col);
            this.draw.drawBoard(this.core.board);
        };
        this.handleStartClick = () => {
            this.isRunning = true;
            requestAnimationFrame(this.step);
        };
        this.handlePauseClick = () => {
            this.isRunning = false;
        };
        this.handleResetClick = () => {
            this.isRunning = false;
            this.core.reset();
            this.draw.drawBoard(this.core.board);
        };
        this.handleClearClick = () => {
            this.isRunning = false;
            this.core.clear();
            this.draw.drawBoard(this.core.board);
        };
        this.toggle = throttle(() => {
            const element = document.getElementById('toggle');
            if (this.isRunning) {
                this.handlePauseClick();
                element.textContent = 'Start';
            }
            else {
                this.handleStartClick();
                element.textContent = 'Pause';
            }
        }, 100);
        this.handleKeydown = (event) => {
            switch (event.key) {
                case ' ':
                    this.toggle();
                    break;
                case 'r':
                    this.handleResetClick();
                    break;
                case 'c':
                    this.handleClearClick();
                    break;
                default:
                    break;
            }
        };
        this.core = new Core({ rows, cols });
        this.draw = new Draw({ canvas, board: this.core.board, rows, cols, cellSize: 20 });
        this.canvas = canvas;
        this.iterator = this.core.start();
        this.isRunning = false;
        canvas.addEventListener('click', this.handleCanvasClick);
        (_a = document.getElementById('toggle')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.toggle);
        (_b = document.getElementById('reset')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handleResetClick);
        (_c = document.getElementById('clear')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.handleClearClick);
        document.addEventListener('keydown', this.handleKeydown);
    }
    destructor() {
        var _a, _b, _c;
        this.canvas.removeEventListener('click', this.handleCanvasClick);
        (_a = document.getElementById('toggle')) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this.toggle);
        (_b = document.getElementById('reset')) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.handleResetClick);
        (_c = document.getElementById('clear')) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.handleClearClick);
        document.removeEventListener('keydown', this.handleKeydown);
    }
    addPattern(pattern) {
        for (const [row, col] of pattern) {
            this.core.toggle(row, col);
        }
        this.draw.drawBoard(this.core.board);
    }
}
export default GameOfLife;
