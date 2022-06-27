"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * data structure for x/y coordinates
 */
var Coord = /*#__PURE__*/function () {
  /**
   * initializes a new Coord
   * @param {int} x
   * @param {int} y
   */
  function Coord(x, y) {
    _classCallCheck(this, Coord);

    this.x = x;
    this.y = y;
  }
  /**
   * changes the coordinates of a Coord
   * @param {int} x
   * @param {int} y
   */


  _createClass(Coord, [{
    key: "setXY",
    value: function setXY(x, y) {
      this.x = x;
      this.y = y;
    }
    /**
     * evaluates if two Coord-objects refer to the same coordinates
     * @param {Coord} obj1
     * @param {Coord} obj2
     * @returns {boolean}
     */

  }], [{
    key: "collides",
    value: function collides(obj1, obj2) {
      return obj1.x === obj2.x && obj1.y === obj2.y;
    }
  }]);

  return Coord;
}();

exports["default"] = Coord;