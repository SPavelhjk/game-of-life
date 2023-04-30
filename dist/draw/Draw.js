class Draw {
    constructor({ board, cellSize }) {
        this.board = board;
        this.cellSize = cellSize;
    }
    drawBoard(board) {
        throw new Error('drawBoard method must be implemented');
    }
}
export default Draw;
