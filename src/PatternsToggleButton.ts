import Pattern from './Pattern'

class PatternsToggleButton {
  private patternsButton: HTMLButtonElement
  private patternCanvas: HTMLCanvasElement
  private pattern?: Pattern

  constructor() {
    this.patternsButton = document.querySelector('.patterns__toggle-button') as HTMLButtonElement
    this.patternCanvas = document.querySelector('.patterns__toggle-button canvas') as HTMLCanvasElement
    this.initPattern()

    this.patternsButton.addEventListener('click', this.handleButtonClick)
  }

  destructor() {
    this.patternsButton.removeEventListener('click', this.handleButtonClick)
    this?.pattern?.destructor()
  }

  private handleButtonClick = (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return

    let element = event.target

    while (element && !element.classList.contains('patterns')) {
      if (element.parentNode instanceof HTMLElement) {
        element = element.parentNode
      } else {
        break
      }
    }

    if (element) {
      element.classList.toggle('patterns--opened')
    }
  }

  private initPattern() {
    this.pattern = new Pattern({
      rows: 15,
      cols: 15,
      canvas: this.patternCanvas,
      pattern: [
        [6, 7],
        [7, 8],
        [8, 6],
        [8, 7],
        [8, 8],
      ],
      cellSize: 4,
    })
  }
}

export default PatternsToggleButton
