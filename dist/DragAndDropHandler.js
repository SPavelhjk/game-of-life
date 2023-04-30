import Pattern from "./Pattern.js";
class DragAndDropHandler {
    constructor({ gameOfLife, cellSize }) {
        this.handleDragStart = (event, patternMock) => {
            this.isMouseDown = true;
            const temporaryCanvas = document.createElement('canvas');
            temporaryCanvas.style.position = 'absolute';
            document.body.appendChild(temporaryCanvas);
            this.temporaryCanvas = temporaryCanvas;
            const [rowsValues, colsValues] = patternMock.pattern.reduce((acc, [row, col]) => {
                acc[0].push(row);
                acc[1].push(col);
                return acc;
            }, [[], []]);
            this.patternForTemporaryCanvas = new Pattern({
                rows: Math.max.apply(null, rowsValues) + 1,
                cols: Math.max.apply(null, colsValues) + 1,
                canvas: temporaryCanvas,
                pattern: patternMock.pattern,
                cellSize: this.cellSize
            });
            this.patternToAdd = patternMock.pattern;
            this.updateCanvasDivPosition(event.pageX, event.pageY);
        };
        this.handleDrag = (event) => {
            if (this.isMouseDown) {
                this.updateCanvasDivPosition(event.pageX, event.pageY);
            }
        };
        this.handleDrop = (event) => {
            var _a, _b;
            if (!this.isMouseDown)
                return;
            if (event.target === this.gameOfLife.canvas) {
                const rect = this.gameOfLife.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const row = Math.floor(y / this.cellSize);
                const col = Math.floor(x / this.cellSize);
                if (this.patternToAdd) {
                    this.gameOfLife.addPattern(this.patternToAdd.map(([r, c]) => [r + row, c + col]));
                }
            }
            (_a = this.temporaryCanvas) === null || _a === void 0 ? void 0 : _a.remove();
            this.isMouseDown = false;
            (_b = this.patternForTemporaryCanvas) === null || _b === void 0 ? void 0 : _b.destructor();
            this.patternToAdd = undefined;
        };
        this.updateCanvasDivPosition = (x, y) => {
            if (this.temporaryCanvas) {
                this.temporaryCanvas.style.left = `${x + 1}px`;
                this.temporaryCanvas.style.top = `${y + 1}px`;
            }
        };
        this.isMouseDown = false;
        this.cellSize = cellSize;
        this.gameOfLife = gameOfLife;
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDrop);
    }
    destructor() {
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDrop);
    }
}
export default DragAndDropHandler;
