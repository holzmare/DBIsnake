import Score from "./Score.js";
import Coord from "./Coord.js";
import EndScreen from "./EndScreen.js";
/**
 * implements a playing field as an HTML-canvas
 */
 export default class Field {
    stepWidth;
    /**
     * creates a canvas to fit available space
     * (size maximum possible multiple of gridsize)
     * @param {DOM-element} parentObj parent element the canvas should be a child of
     * @param {int} gridsize Amount of rows and columns the field should have
     * @param {String} bgcolor the fields color
     * @param {function} onReplayButtonCick functionality for replayButton in EndScreen
     * @param {function} onExitButtonClick functionality for exitButton in EndScreen
     }}
     */
    constructor(parentObj, gridsize, bgcolor, onReplayButtonCick, onExitButtonClick) {
        this.gridsize = gridsize;
        this.bgcolor = bgcolor;

        this.container = document.createElement("div");
        this.containerStyle();


        parentObj.appendChild(this.container);
        // console.log("container height: " + this.container.clientHeight);
        if (this.container.clientWidth == 0 || this.container.clientHeight == 0) {
            console.log("Parent has no fixed size, using 400px as default.");
            this.stepWidth = Math.floor(400 / this.gridsize);

        } else {
            this.stepWidth = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize);
        }
        this.size = this.stepWidth * this.gridsize;
        
        this.canvas = document.createElement("canvas");

        this.canvasStyle();

        this.container.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = this.bgcolor;
        this.clear();

        this.score = new Score(this.container);
        
        this.endScreen = new EndScreen(this.container, this.size, onReplayButtonCick, onExitButtonClick);
        this.resizeCanvasBound = this.resizeCanvas.bind(this);
        window.addEventListener("resize", this.resizeCanvasBound, false);
    };

     canvasStyle() {
         this.canvas.style.position = "absolute";
         this.canvas.style.top = 0;
         this.canvas.width = this.size;
         this.canvas.height = this.size;

         this.canvas.webkitImageSmoothingEnabled = false;
         this.canvas.mozImageSmoothingEnabled = false;
         this.canvas.imageSmoothingEnabled = false;
     }

     containerStyle() {
         this.container.style.width = "100%";
         this.container.style.position = "relative";
         this.container.style.height = "100%";
         this.container.style.display = "grid";
         this.container.style.alignItems = "center";
     }

     clear() {
         this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
     }

    /**
     * handles resize event
     */
    resizeCanvas() {
        this.size = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize) * this.gridsize;
        //console.log(this.size);
        this.canvas.style.height = this.size + "px";
        this.canvas.style.width = this.size + "px";
        this.endScreen.resize(this.size);
    };

    /**
     * Converts a grid unit to raw pixel values
     * @param {int} grid - grid-coord
     * @returns {int} - pixel value of beginning of the grid-field
     */
    gridToRaw(grid) {
        return grid * this.stepWidth;
    };

    /**
     * Converts a grid-object to the pixel coords of its left upper corner
     * @param {Coord} grid
     * @returns {Coord} - grid-coord object
     */
    gridToRawXY(grid) {
        return new Coord(parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    };

    renderSegment(segment, color = "white") {
        let point = this.gridToRawXY(segment);
        //console.log(point);
        let dim = this.stepWidth;
        this.context.fillStyle = color;
        this.context.fillRect(point.x, point.y, dim, dim);
    };

    destroy() {
        window.removeEventListener("resize", this.resizeCanvasBound, false);
        this.container.remove();
    };

}
