import Board from "./Board.js";
class Core extends Board {
    constructor({ rows, cols }) {
        super({ rows, cols });
        this.initial = this.board;
        this.time = 0;
    }
    nextBoardState() {
        const nextBoard = new Set();
        const cellsToCheck = new Set();
        for (const cell of this.board) {
            const [x, y] = cell.split(",").map(Number);
            cellsToCheck.add(cell);
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0)
                        continue;
                    const newRow = (x + r + this.rows) % this.rows;
                    const newCol = (y + c + this.cols) % this.cols;
                    cellsToCheck.add(`${newRow},${newCol}`);
                }
            }
        }
        for (const cell of cellsToCheck) {
            const [x, y] = cell.split(",").map(Number);
            let liveNeighbors = 0;
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0)
                        continue;
                    const newRow = (x + r + this.rows) % this.rows;
                    const newCol = (y + c + this.cols) % this.cols;
                    const neighbor = `${newRow},${newCol}`;
                    liveNeighbors += this.board.has(neighbor) ? 1 : 0;
                }
            }
            if (this.board.has(cell) && (liveNeighbors === 2 || liveNeighbors === 3)) {
                nextBoard.add(cell);
            }
            else if (!this.board.has(cell) && liveNeighbors === 3) {
                nextBoard.add(cell);
            }
        }
        this.time++;
        this.board = nextBoard;
        return nextBoard;
    }
    reset() {
        this.time = 0;
        this.board = new Set(this.initial);
    }
    *start() {
        this.initial = new Set(this.board);
        while (true) {
            yield this.nextBoardState();
        }
    }
}
export default Core;
