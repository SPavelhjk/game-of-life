import Core from './Core'
import Draw from './draw/DrawWebGL'
import { throttle } from './utils'

const CELL_SIZE = 20
const FRAME_RATE = 20
const FRAME_INTERVAL = 1000 / FRAME_RATE

let lastFrameTime = 0

interface IGameOfLife {
  rows: number
  cols: number
  canvas: HTMLCanvasElement
}

class GameOfLife {
  core: Core
  draw: Draw
  canvas: HTMLCanvasElement
  private isRunning: boolean
  private iterator: Generator<Set<string>>

  constructor({ rows, cols, canvas }: IGameOfLife) {
    this.core = new Core({ rows, cols })
    this.draw = new Draw({ canvas, board: this.core.board, rows, cols, cellSize: 20 })
    this.canvas = canvas
    this.iterator = this.core.start()

    this.isRunning = false

    canvas.addEventListener('click', this.handleCanvasClick)
    document.getElementById('toggle')?.addEventListener('click', this.toggle)
    document.getElementById('reset')?.addEventListener('click', this.handleResetClick)
    document.getElementById('clear')?.addEventListener('click', this.handleClearClick)
    document.addEventListener('keydown', this.handleKeydown)
  }

  destructor() {
    this.canvas.removeEventListener('click', this.handleCanvasClick)
    document.getElementById('toggle')?.removeEventListener('click', this.toggle)
    document.getElementById('reset')?.removeEventListener('click', this.handleResetClick)
    document.getElementById('clear')?.removeEventListener('click', this.handleClearClick)
    document.removeEventListener('keydown', this.handleKeydown)
  }

  addPattern(pattern: [row: number, col: number][]) {
    for (const [row, col] of pattern) {
      this.core.toggle(row, col)
    }

    this.draw.drawBoard(this.core.board)
  }

  private step = (currentTime: number) => {
    if (!this.isRunning) return 

    if (currentTime - lastFrameTime >= FRAME_INTERVAL) {
      try {
        const nextState = this.iterator.next()
        const updatedBoard = nextState.value!
        this.draw.drawBoard(updatedBoard)
        lastFrameTime = currentTime
      } catch (error) {
        console.error('An error has occured:', error)
        return
      }
    }
  
    requestAnimationFrame(this.step.bind(this))
  }

  private handleCanvasClick = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const row = Math.floor(y / CELL_SIZE)
    const col = Math.floor(x / CELL_SIZE)

    this.core.toggle(row, col)
    this.draw.drawBoard(this.core.board)
  }

  private handleStartClick = () => {
    this.isRunning = true
    requestAnimationFrame(this.step)
  }

  private handlePauseClick = () => {
    this.isRunning = false
  }

  private handleResetClick = () => {
    this.isRunning = false
    this.core.reset()
    this.draw.drawBoard(this.core.board)
  }

  private handleClearClick = () => {
    this.isRunning = false
    this.core.clear()
    this.draw.drawBoard(this.core.board)
  }

  private toggle = throttle(() => {
    const element = document.getElementById('toggle') as HTMLButtonElement

    if (this.isRunning) {
      this.handlePauseClick()
      element.textContent = 'Start'
    } else {
      this.handleStartClick()
      element.textContent = 'Pause'
    }
  }, 100)

  private handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case ' ':
        this.toggle()
        break
      case 'r':
        this.handleResetClick()
        break
      case 'c':
        this.handleClearClick()
        break

      default:
        break
    }
  }
}

export default GameOfLife
