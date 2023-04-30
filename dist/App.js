import GameOfLife from "./GameOfLife";
import PatternsList from "./PatternsList";
import DragAndDropHandler from "./DragAndDropHandler";
import PatternsToggleButton from "./PatternsToggleButton";
const CELL_SIZE = 20;
class App {
    constructor({ canvas }) {
        this.game = new GameOfLife({
            rows: Math.floor(window.innerHeight / CELL_SIZE) - (40 / CELL_SIZE),
            cols: Math.floor(window.innerWidth / CELL_SIZE),
            canvas: canvas
        });
        this.dragAndDropHandler = new DragAndDropHandler({
            gameOfLife: this.game,
            cellSize: CELL_SIZE
        });
        this.patternsList = new PatternsList({ onMouseDown: this.dragAndDropHandler.handleDragStart });
        this.patternsToggleButton = new PatternsToggleButton();
    }
    destructor() {
        this.game.destructor();
        this.patternsList.destructor();
        this.dragAndDropHandler.destructor();
        this.patternsToggleButton.destructor();
    }
}
new App({
    canvas: document.getElementById('game')
});
