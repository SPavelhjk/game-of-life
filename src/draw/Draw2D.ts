import Draw, { IDraw } from './Draw'

export interface IDraw2DProps extends IDraw {
  canvas: HTMLCanvasElement
  board: Set<string>
  rows: number
  cols: number
}

class Draw2D extends Draw {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor({
    canvas,
    board,
    rows,
    cols,
    cellSize
  }: IDraw2DProps) {
    super({ board, cellSize })

    this.canvas = canvas
    this.canvas.height = rows * cellSize
    this.canvas.width = cols * cellSize
    this.ctx = canvas.getContext('2d')!

    this.drawBoard(board)
  }

  destructor() {
    this.board = new Set<string>()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawBoard(board: Set<string>) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const cell of board) {
      const [cellY, cellX] = cell.split(',').map(Number)
      this.drawCell(cellX, cellY)
    }

    this.drawGrid()
  }

  private drawCell(cellX: number, cellY: number) {
    this.ctx.fillStyle = 'rgb(0, 0, 0)'
    this.ctx.fillRect(cellX * this.cellSize, cellY * this.cellSize, this.cellSize, this.cellSize)
  }

  private drawGrid() {
    const ctx = this.ctx
    ctx.strokeStyle = 'rgb(252, 217, 43)'
    ctx.lineWidth = 1

    for (let y = 0; y <= this.canvas.height; y += this.cellSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.canvas.width, y)
      ctx.stroke()
    }

    for (let x = 0; x <= this.canvas.width; x += this.cellSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, this.canvas.height)
      ctx.stroke()
    }
  }
}

export default Draw2D
