import Draw from "./DrawCopy.js";
const CELL_SIZE = 20;
class DrawWebGL extends Draw {
    constructor(canvas, board, boardHeight, boardWidth) {
        super(board);
        this.canvas = canvas;
        this.canvas.height = boardHeight * CELL_SIZE;
        this.canvas.width = boardWidth * CELL_SIZE;
        this.ctx = canvas.getContext('webgl2');
        this._createShaders();
        this._createProgramAndSetAttributes();
        this._createBuffers();
        this.drawBoard(board);
    }
    drawBoard(board) {
        const projectionMatrix = this._createOrthographicProjectionMatrix(0, this.canvas.width, this.canvas.height, 0, -1, 1);
        this.ctx.uniformMatrix4fv(this.modelMatrixUniformLocation, false, projectionMatrix);
        const instanceData = [];
        for (const cell of board) {
            const [cellY, cellX] = cell.split(',').map(Number);
            instanceData.push(cellX * CELL_SIZE, cellY * CELL_SIZE);
        }
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.instanceBuffer);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(instanceData), this.ctx.STREAM_DRAW);
        this.ctx.clearColor(1, 1, 1, 1);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
        this.ctx.useProgram(this.program);
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.vertexBuffer);
        this.ctx.enableVertexAttribArray(this.positionAttributeLocation);
        this.ctx.vertexAttribPointer(this.positionAttributeLocation, 2, this.ctx.FLOAT, false, 0, 0);
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.instanceBuffer);
        this.ctx.enableVertexAttribArray(1);
        this.ctx.vertexAttribPointer(1, 2, this.ctx.FLOAT, false, 0, 0);
        this.ctx.vertexAttribDivisor(1, 1);
        this.ctx.uniform4f(this.colorUniformLocation, 0, 0, 0, 1);
        this.ctx.drawArraysInstanced(this.ctx.TRIANGLE_STRIP, 0, 4, instanceData.length / 2);
        this._drawGrid();
    }
    _createShaders() {
        const vertexShaderSource = `
      attribute vec4 a_position;
      attribute vec2 a_offset;
      uniform mat4 u_modelMatrix;
      void main() {
        gl_Position = u_modelMatrix * (a_position + vec4(a_offset, 0, 0));
      }
    `;
        const fragmentShaderSource = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
      #else
        precision mediump float;
      #endif
      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `;
        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`, gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }
        const vertexShader = createShader(this.ctx, this.ctx.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(this.ctx, this.ctx.FRAGMENT_SHADER, fragmentShaderSource);
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }
    _createProgramAndSetAttributes() {
        const program = (this.program = this.ctx.createProgram());
        this.ctx.attachShader(program, this.vertexShader);
        this.ctx.attachShader(program, this.fragmentShader);
        this.ctx.linkProgram(program);
        if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
            console.error("Error linking program:", this.ctx.getProgramInfoLog(program));
            return;
        }
        this.ctx.useProgram(program);
        this.positionAttributeLocation = this.ctx.getAttribLocation(program, "a_position");
        this.modelMatrixUniformLocation = this.ctx.getUniformLocation(program, "u_modelMatrix");
        this.colorUniformLocation = this.ctx.getUniformLocation(program, "u_color");
    }
    _createBuffers() {
        const vertexBuffer = this.vertexBuffer = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, vertexBuffer);
        const vertices = [
            0, 0,
            CELL_SIZE, 0,
            0, CELL_SIZE,
            CELL_SIZE, CELL_SIZE,
        ];
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(vertices), this.ctx.STATIC_DRAW);
        const instanceBuffer = this.instanceBuffer = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, instanceBuffer);
    }
    _drawGrid() {
        const boardWidth = this.canvas.width;
        const boardHeight = this.canvas.height;
        const gridColor = [0.8, 0.8, 0.8, 1];
        this.ctx.uniform4fv(this.colorUniformLocation, gridColor);
        const gridVertices = [];
        for (let x = 0; x <= boardWidth; x += CELL_SIZE / 2) {
            gridVertices.push(x, 0, x, boardHeight);
        }
        for (let y = 0; y <= boardHeight; y += CELL_SIZE / 2) {
            gridVertices.push(0, y, boardWidth, y);
        }
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(gridVertices), this.ctx.STATIC_DRAW);
        this.ctx.vertexAttribPointer(this.positionAttributeLocation, 2, this.ctx.FLOAT, false, 0, 0);
        this.ctx.vertexAttribDivisor(1, 0);
        this.ctx.drawArrays(this.ctx.LINES, 0, gridVertices.length / 2);
    }
    _createOrthographicProjectionMatrix(left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        return new Float32Array([
            -2 * lr, 0, 0, 0,
            0, -2 * bt, 0, 0,
            0, 0, 2 * nf, 0,
            (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1,
        ]);
    }
}
export default DrawWebGL;
