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
 * implements an Overlay that contains a Score Display and controls to restart the game
 */
var EndScreen = /*#__PURE__*/function () {
  function EndScreen(parentObj, size) {
    var onReplayButtonCick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.onReplayButtonCick;
    var onExitButtonClick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.onExitButtonClick;

    _classCallCheck(this, EndScreen);

    _defineProperty(this, "highscore", 0);

    _defineProperty(this, "score", 0);

    this.parentObj = parentObj;
    this.container = document.createElement("div");
    this.parentObj.insertBefore(this.container, this.parentObj.childNodes[0]);
    this.containerStyle(this.container, size);
    this.content = document.createElement("div");
    this.container.appendChild(this.content);
    this.contentStyle(this.content);
    this.content.innerHTML = "<h2 style='margin: 2%'>GAME OVER!</h2>";
    this.text = document.createElement("span");
    this.content.appendChild(this.text);
    this.setText(0, 0);
    this.buttons = document.createElement("span");
    this.content.appendChild(this.buttons);
    this.replayButton = document.createElement("button");
    this.buttonStyle(this.replayButton, "#EE2E31");
    this.buttons.appendChild(this.replayButton);
    this.replayButton.innerHTML = "Play Again!";
    this.replayButton.onclick = onReplayButtonCick.bind(this);
    this.exitButton = document.createElement("button");
    this.buttonStyle(this.exitButton, "#1E345A");
    this.buttons.appendChild(this.exitButton);
    this.exitButton.innerHTML = "Stop Playing!";
    this.exitButton.onclick = onExitButtonClick.bind(this);
    this.hide();
  }

  _createClass(EndScreen, [{
    key: "resize",
    value: function resize(size) {
      this.container.style.height = size + "px";
      this.container.style.width = size + "px";
    }
  }, {
    key: "setText",
    value: function setText(score, highscore) {
      if (score > highscore) {
        this.text.innerHTML = "New Highscore!!!<br>Score: " + score + "<br>previous Highscore: " + highscore + "</span></h2>";
      } else {
        this.text.innerHTML = "<span>Score: " + score + "<br>Highscore: " + highscore + "</span></h2>";
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.container.style.visibility = "visible";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.container.style.visibility = "hidden";
    }
  }, {
    key: "onReplayButtonCick",
    value: function onReplayButtonCick() {
      this.hide();
    }
  }, {
    key: "onExitButtonClick",
    value: function onExitButtonClick() {
      this.hide();
    }
  }, {
    key: "buttonStyle",
    value: function buttonStyle(button, color) {
      button.style.margin = "2vmin";
      button.style.border = "2px";
      button.style.borderStyle = "solid";
      button.style.backgroundColor = color;
      button.style.borderColor = "white";
      button.style.color = "white";
      button.style.padding = "1vmin";
      button.style.textAlign = "center";
      button.style.textDecoration = "none";
      button.style.display = "inline-block";
      button.style.fontSize = "3vmin";
      button.style.cursor = "pointer";
      button.fontFamily = "'Avenir',Helvetica,Arial,sans-serif";
    }
  }, {
    key: "contentStyle",
    value: function contentStyle(content) {
      content.style.position = "relative";
      content.style.display = "grid";
      content.style.placeItems = "center";
      content.style.width = "80%";
      content.style.height = "50%";
      content.style.backgroundColor = "#1E345A";
      content.style.color = "white";
      content.style.border = "8px solid #FFF";
      content.style.fontWeight = "bold";
      content.style.fontSize = "5vmin";
      content.style.fontFamily = "'Avenir',Helvetica,Arial,sans-serif";
    }
  }, {
    key: "containerStyle",
    value: function containerStyle(container, size) {
      container.style.position = "relative";
      container.style.display = "grid";
      container.style.zIndex = "2";
      container.style.placeItems = "center";
      container.backgroundColor = "rgba(0,0,0,0.3)";
      this.container.style.height = size + "px";
      this.container.style.width = size + "px";
    }
  }]);

  return EndScreen;
}();

exports["default"] = EndScreen;