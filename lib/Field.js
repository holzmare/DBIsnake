"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Score = _interopRequireDefault(require("./Score.js"));

var _Coord = _interopRequireDefault(require("./Coord.js"));

var _EndScreen = _interopRequireDefault(require("./EndScreen.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * implements a playing field as an HTML-canvas
 */
var Field = /*#__PURE__*/function () {
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
  function Field(parentObj, gridsize, bgcolor, onReplayButtonCick, onExitButtonClick) {
    _classCallCheck(this, Field);

    _defineProperty(this, "container", document.createElement("div"));

    _defineProperty(this, "canvas", document.createElement("canvas"));

    _defineProperty(this, "stepWidth", void 0);

    this.gridsize = gridsize;
    this.bgcolor = bgcolor;
    this.context = this.canvas.getContext("2d");
    this.canvas.webkitImageSmoothingEnabled = false;
    this.canvas.mozImageSmoothingEnabled = false;
    this.canvas.imageSmoothingEnabled = false;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = 0;
    this.container.width = 100;
    this.container.style.position = "relative";
    this.container.style.height = "100%";
    parentObj.insertBefore(this.container, parentObj.childNodes[0]); // console.log("container height: " + this.container.clientHeight);

    if (this.container.clientWidth == 0 || this.container.clientHeight == 0) {
      console.log("Parent has no fixed size, using 400px as default.");
      this.stepWidth = Math.floor(400 / this.gridsize);
    } else {
      this.stepWidth = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize);
    }

    this.size = this.stepWidth * this.gridsize;
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.score = new _Score["default"](this.container);
    this.container.appendChild(this.canvas);
    this.context.fillStyle = this.bgcolor;
    this.clear();
    this.endScreen = new _EndScreen["default"](this.container, this.size, onReplayButtonCick, onExitButtonClick);
    this.resizeCanvasBound = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.resizeCanvasBound, false);
  }

  _createClass(Field, [{
    key: "clear",
    value: function clear() {
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * handles resize event
     */

  }, {
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.size = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize) * this.gridsize; //console.log(this.size);

      this.canvas.style.height = this.size + "px";
      this.canvas.style.width = this.size + "px";
      this.endScreen.resize(this.size);
    }
  }, {
    key: "gridToRaw",
    value:
    /**
     * Converts a grid unit to raw pixel values
     * @param {int} grid - grid-coord
     * @returns {int} - pixel value of beginning of the grid-field
     */
    function gridToRaw(grid) {
      return grid * this.stepWidth;
    }
  }, {
    key: "gridToRawXY",
    value:
    /**
     * Converts a grid-object to the pixel coords of its left upper corner
     * @param {Coord} grid
     * @returns {Coord} - grid-coord object
     */
    function gridToRawXY(grid) {
      return new _Coord["default"](parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    }
  }, {
    key: "renderSegment",
    value: function renderSegment(segment) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "white";
      var point = this.gridToRawXY(segment); //console.log(point);

      var dim = this.stepWidth;
      this.context.fillStyle = color;
      this.context.fillRect(point.x, point.y, dim, dim);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener("resize", this.resizeCanvasBound, false);
      this.container.remove();
    }
  }]);

  return Field;
}();

exports["default"] = Field;