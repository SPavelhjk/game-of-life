import Board from "./Board.js";
import Draw2D from "./draw/Draw2D";
class Pattern {
    constructor({ rows, cols, canvas, pattern, cellSize }) {
        this.board = new Board({ rows, cols });
        this.draw = new Draw2D({
            canvas,
            board: this.board.board,
            rows,
            cols,
            cellSize,
        });
        for (const [row, col] of pattern) {
            this.board.toggle(row, col);
        }
        this.draw.drawBoard(this.board.board);
    }
    destructor() {
        this.board.destructor();
        this.draw.destructor();
    }
}
export default Pattern;
