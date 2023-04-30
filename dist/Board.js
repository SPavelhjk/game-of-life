class Board {
    constructor({ rows, cols }) {
        this.board = new Set();
        this.rows = rows;
        this.cols = cols;
    }
    destructor() {
        this.board = new Set();
    }
    getHash(x, y) {
        return `${x},${y}`;
    }
    toggle(row, col) {
        const hash = this.getHash(row, col);
        if (this.board.has(hash)) {
            this.board.delete(hash);
        }
        else {
            this.board.add(hash);
        }
        return this;
    }
    clear() {
        this.board.clear();
    }
}
export default Board;
