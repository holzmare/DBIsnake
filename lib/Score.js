"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * handles score display in a div element in the top left corner of its parent
 */
var Score = /*#__PURE__*/function () {
  //TODO: Allgemeiner, evtl teilweise in eine "Display"-Klasse auslagern

  /**
   * creates a new div to contain the score display as first child element of the specified parent and initializes the needed variables
   * The highscore is tracked in the localStorage-variable "highscore"
   * @param {DOM-Element} parentObj Parent element of the score display
   */
  function Score(parentObj) {
    _classCallCheck(this, Score);

    _defineProperty(this, "display", void 0);

    this.score = 0;
    var highscore = window.localStorage.getItem("highscore");

    if (highscore === null) {
      highscore = 0;
    }

    this.highscore = highscore;
    this.display = document.createElement("div");
    this.displayStyle(this.display);
    this.update();
    parentObj.insertBefore(this.display, parentObj.childNodes[0]);
  }
  /**
   * increments the score by 1
   */


  _createClass(Score, [{
    key: "inc",
    value: function inc() {
      this.score++;
      this.update();
    }
    /**
     * setter for the score
     * @param {int} score new score
     */

  }, {
    key: "set",
    value: function set(score) {
      this.score = score;
      this.update();
    }
    /**
     * setter for the highscore
     * @param {int} highscore new highscore
     */

  }, {
    key: "setHighscore",
    value: function setHighscore(highscore) {
      this.highscore = highscore;
      window.localStorage.setItem("highscore", highscore);
      this.update();
    }
    /**
     * updates the score display
     */

  }, {
    key: "update",
    value: function update() {
      this.display.innerHTML = "Score: " + this.score + " <br> Highscore: " + this.highscore;
    }
  }, {
    key: "displayStyle",
    value: function displayStyle(display) {
      display.style.position = "absolute";
      display.style.zIndex = "1";
      display.style.left = "10px";
      display.style.top = "10px";
      display.style.width = "200px";
      display.style.color = "white";
      display.style.fontWeight = "bold";
      display.style.fontFamily = "'Avenir',Helvetica,Arial,sans-serif";
    }
  }]);

  return Score;
}();

exports["default"] = Score;