"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Coord = _interopRequireDefault(require("./Coord.js"));

var _SnakeUtility = _interopRequireDefault(require("./SnakeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Snake {
  body = [];
  initLength;
  heading = new _Coord.default(0, 1);
  gridSize;
  color;
  headColor;

  constructor(initLength = 3, gridSize, color = "white", headColor = "grey") {
    this.initLength = initLength;
    this.gridSize = gridSize;
    this.color = color;
    this.headColor = headColor;
    let y = Math.floor(this.gridSize / 2) - this.initLength;

    for (let i = 0; i < this.initLength; i++) {
      this.body.unshift(new _Coord.default(Math.floor(this.gridSize / 2), _SnakeUtility.default.mod(y + i, this.gridSize)));
    }
  }
  /**
  * moves the snake
  */


  move(dir) {
    if (dir === "l") {
      this.heading.setXY(this.heading.y, -this.heading.x);
    } else if (dir === "r") {
      this.heading.setXY(-this.heading.y, this.heading.x);
    }

    this.body.unshift(new _Coord.default(_SnakeUtility.default.mod(this.body[0].x + this.heading.x, this.gridSize), _SnakeUtility.default.mod(this.body[0].y + this.heading.y, this.gridSize)));
  }

}

exports.default = Snake;