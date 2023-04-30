import PATTERNS from "./mock/patterns";
import Pattern from './Pattern';
class PatternsList {
    constructor({ onMouseDown }) {
        this.listNode = document.querySelector('.patterns__list');
        this.handleMouseDawn = (event) => {
            if (event.target instanceof HTMLElement) {
                const { id } = event.target;
                const pattern = PATTERNS.find(({ name }) => name === id);
                if (pattern) {
                    onMouseDown(event, pattern);
                }
            }
        };
        this.list = [];
        const fragment = document.createDocumentFragment();
        for (const p of PATTERNS) {
            const listItemNode = document.createElement('li');
            listItemNode.classList.add('patterns__item');
            listItemNode.innerHTML = `
        <p>${p.label}</p>
      `;
            const newCanvas = document.createElement('canvas');
            newCanvas.id = p.name;
            listItemNode.appendChild(newCanvas);
            newCanvas.addEventListener('mousedown', this.handleMouseDawn);
            const newPattern = new Pattern({
                rows: p.rows,
                cols: p.cols,
                canvas: newCanvas,
                pattern: p.minimizedPattern,
                cellSize: p.cellSize
            });
            this.list.push({ pattern: newPattern, canvas: newCanvas });
            fragment.appendChild(listItemNode);
        }
        this.listNode.appendChild(fragment);
    }
    destructor() {
        for (const { canvas, pattern } of this.list) {
            canvas.removeEventListener('mousedown', this.handleMouseDawn);
            pattern.destructor();
        }
        this.list = [];
    }
}
export default PatternsList;
