"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SnakeUtility = /*#__PURE__*/function () {
  function SnakeUtility() {
    _classCallCheck(this, SnakeUtility);
  }

  _createClass(SnakeUtility, null, [{
    key: "mod",
    value:
    /**
     * Modulo with correct handling of negative divident
     * @param {int} num divident
     * @param {int} div divisor
     * @returns Modulo
     */
    function mod(num, div) {
      return (num % div + div) % div;
    }
  }, {
    key: "sleep",
    value:
    /**
     * sleeps for a specified time
     * @param {int} milliseconds time to wait for
     * @returns
     */
    function sleep(milliseconds) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, milliseconds);
      });
    }
  }]);

  return SnakeUtility;
}();

exports["default"] = SnakeUtility;