class Draw {
    constructor(board) {
        this.board = board;
    }
    drawBoard(board) {
        throw new Error('drawBoard must be implemented');
    }
}
export default Draw;
