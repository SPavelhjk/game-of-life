export interface IDraw {
  board: Set<string>
  cellSize: number
}

class Draw implements IDraw {
  board: Set<string>
  cellSize: number

  constructor({ board, cellSize }: IDraw) {
    this.board = board
    this.cellSize = cellSize
  }

  drawBoard(board: Set<string>) {
    throw new Error('drawBoard method must be implemented')
  }
}

export default Draw
