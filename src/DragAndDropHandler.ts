import GameOfLife from "./GameOfLife"
import Pattern from "./Pattern"
import { PatternMockType, PatternType } from "./mock/patterns"

interface IDragAndDropHandlerProps {
  gameOfLife: GameOfLife
  cellSize: number
}

class DragAndDropHandler {
  isMouseDown: boolean
  cellSize: number
  gameOfLife: GameOfLife

  temporaryCanvas?: HTMLCanvasElement
  patternForTemporaryCanvas?: Pattern
  patternToAdd?: PatternType

  constructor({ gameOfLife, cellSize }: IDragAndDropHandlerProps) {
    this.isMouseDown = false
    this.cellSize = cellSize
    this.gameOfLife = gameOfLife

    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleDrop)
  }

  destructor() {
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleDrop)
  }

  public handleDragStart = (event: MouseEvent, patternMock: PatternMockType) => {
    this.isMouseDown = true

    const temporaryCanvas = document.createElement('canvas')
    temporaryCanvas.style.position = 'absolute'
    document.body.appendChild(temporaryCanvas)
    this.temporaryCanvas = temporaryCanvas

    const [
      rowsValues,
      colsValues
    ] = patternMock.pattern.reduce<[number[], number[]]>((acc, [row, col]) => {
      acc[0].push(row)
      acc[1].push(col)

      return acc
    }, [[], []])

    this.patternForTemporaryCanvas = new Pattern({
      rows: Math.max.apply(null, rowsValues) + 1,
      cols: Math.max.apply(null, colsValues) + 1,
      canvas: temporaryCanvas,
      pattern: patternMock.pattern,
      cellSize: this.cellSize
    })
    this.patternToAdd = patternMock.pattern

    this.updateCanvasDivPosition(event.pageX, event.pageY)

  }

  private handleDrag = (event: MouseEvent) => {
    if (this.isMouseDown) {
      this.updateCanvasDivPosition(event.pageX, event.pageY)
    }
  }

  private handleDrop = (event: MouseEvent) => {
    if (!this.isMouseDown) return

    if (event.target === this.gameOfLife.canvas) {
      const rect = this.gameOfLife.canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
    
      const row = Math.floor(y / this.cellSize)
      const col = Math.floor(x / this.cellSize)

      if (this.patternToAdd) {
        this.gameOfLife.addPattern(
          this.patternToAdd.map(([r, c]) => [r + row, c + col])
        )
      }
    }

    this.temporaryCanvas?.remove()
    this.isMouseDown = false
    this.patternForTemporaryCanvas?.destructor()
    this.patternToAdd = undefined
  }

  private updateCanvasDivPosition = (x: number, y: number) => {
    if (this.temporaryCanvas) {
      this.temporaryCanvas.style.left = `${x + 1}px`
      this.temporaryCanvas.style.top = `${y + 1}px`
    }
  }
}

export default DragAndDropHandler
