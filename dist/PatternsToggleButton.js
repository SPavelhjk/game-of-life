import Pattern from "./Pattern.js";
class PatternsToggleButton {
    constructor() {
        this.handleButtonClick = (event) => {
            if (!(event.target instanceof HTMLElement))
                return;
            let element = event.target;
            while (element && !element.classList.contains('patterns')) {
                if (element.parentNode instanceof HTMLElement) {
                    element = element.parentNode;
                }
                else {
                    break;
                }
            }
            if (element) {
                element.classList.toggle('patterns--opened');
            }
        };
        this.patternsButton = document.querySelector('.patterns__toggle-button');
        this.patternCanvas = document.querySelector('.patterns__toggle-button canvas');
        this.initPattern();
        this.patternsButton.addEventListener('click', this.handleButtonClick);
    }
    destructor() {
        var _a;
        this.patternsButton.removeEventListener('click', this.handleButtonClick);
        (_a = this === null || this === void 0 ? void 0 : this.pattern) === null || _a === void 0 ? void 0 : _a.destructor();
    }
    initPattern() {
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
        });
    }
}
export default PatternsToggleButton;
