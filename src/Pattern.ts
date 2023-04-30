import Board, { IBoardProps } from "./Board";
import Draw2D, { IDraw2DProps } from "./draw/Draw2D";

interface IPatternProps extends IBoardProps, Omit<IDraw2DProps, 'board'> {
  pattern: [row: number, col: number][]
}

class Pattern {
  board: Board
  draw: Draw2D

  constructor({
    rows,
    cols,
    canvas,
    pattern,
    cellSize
  }: IPatternProps) {
    this.board = new Board({ rows, cols })  
    this.draw = new Draw2D({
      canvas,
      board: this.board.board,
      rows,
      cols,
      cellSize,
    })

    for (const [row, col] of pattern) {
      this.board.toggle(row, col)
    }

    this.draw.drawBoard(this.board.board)
  }

  destructor() {
    this.board.destructor()
    this.draw.destructor()
  }
}

export default Pattern
