"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Coord = _interopRequireDefault(require("./Coord.js"));

var _SnakeUtility = _interopRequireDefault(require("./SnakeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Snake = /*#__PURE__*/function () {
  function Snake() {
    var initLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    var gridSize = arguments.length > 1 ? arguments[1] : undefined;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "white";
    var headColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "grey";

    _classCallCheck(this, Snake);

    _defineProperty(this, "body", []);

    _defineProperty(this, "initLength", void 0);

    _defineProperty(this, "heading", new _Coord["default"](0, 1));

    _defineProperty(this, "gridSize", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "headColor", void 0);

    this.initLength = initLength;
    this.gridSize = gridSize;
    this.color = color;
    this.headColor = headColor;
    var y = Math.floor(this.gridSize / 2) - this.initLength;

    for (var i = 0; i < this.initLength; i++) {
      this.body.unshift(new _Coord["default"](Math.floor(this.gridSize / 2), _SnakeUtility["default"].mod(y + i, this.gridSize)));
    }
  }
  /**
  * moves the snake
  */


  _createClass(Snake, [{
    key: "move",
    value: function move(dir) {
      if (dir === "l") {
        this.heading.setXY(this.heading.y, -this.heading.x);
      } else if (dir === "r") {
        this.heading.setXY(-this.heading.y, this.heading.x);
      }

      this.body.unshift(new _Coord["default"](_SnakeUtility["default"].mod(this.body[0].x + this.heading.x, this.gridSize), _SnakeUtility["default"].mod(this.body[0].y + this.heading.y, this.gridSize)));
    }
  }]);

  return Snake;
}();

exports["default"] = Snake;