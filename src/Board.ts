export interface IBoardProps {
  rows: number
  cols: number
}

class Board {
  board: Set<string>
  rows: number
  cols: number

  constructor({ rows, cols }: IBoardProps) {
    this.board = new Set<string>()
    this.rows = rows
    this.cols = cols
  }

  destructor() {
    this.board = new Set<string>()
  }

  getHash(x: number, y: number): string {
    return `${x},${y}`
  }

  toggle(row: number, col: number) {
    const hash = this.getHash(row, col)
    if (this.board.has(hash)) {
      this.board.delete(hash)
    } else {
      this.board.add(hash)
    }
    return this
  }

  clear() {
    this.board.clear()
  }
}

export default Board
