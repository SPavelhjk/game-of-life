/// <reference lib="esnext" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
class GameOfLife {
    constructor(rows, cols) {
        this.board = new Set();
        this.initial = new Set();
        this.time = 0;
        this.rows = rows;
        this.cols = cols;
    }
    getHash(x, y) {
        return `${x},${y}`;
    }
    toggle(row, col) {
        const hash = this.getHash(row, col);
        if (this.board.has(hash)) {
            this.board.delete(hash);
        }
        else {
            this.board.add(hash);
        }
        return this;
    }
    nextBoardState() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (!this.worker) {
                    this.worker = new Worker("gameOfLifeWorkerCopy.js");
                    this.worker.addEventListener("message", (event) => {
                        const { board } = event.data;
                        this.board = new Set(board);
                        this.time++;
                        this.workerResolve && this.workerResolve(this.board);
                    });
                }
                this.worker.postMessage({
                    action: "nextBoardState",
                    payload: { board: [...this.board], rows: this.rows, cols: this.cols },
                });
                this.workerResolve = resolve;
            });
        });
    }
    clear() {
        this.board.clear();
    }
    reset() {
        this.time = 0;
        this.board = new Set(this.initial);
    }
    start() {
        return __asyncGenerator(this, arguments, function* start_1() {
            this.initial = new Set(this.board);
            while (true) {
                const nextState = yield __await(this.nextBoardState());
                yield yield __await(new Set(nextState));
            }
        });
    }
}
export default GameOfLife;
