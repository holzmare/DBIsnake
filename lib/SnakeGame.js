"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SnakeUtility = _interopRequireDefault(require("./SnakeUtility.js"));

var _Coord = _interopRequireDefault(require("./Coord.js"));

var _Field = _interopRequireDefault(require("./Field.js"));

var _Snake = _interopRequireDefault(require("./Snake.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * implements the game snake
 */
class SnakeGame {
  snake;
  food;
  key = [];
  /**
   * 
   * @param {HTMLElement} parent Game will be initialized as first child of this element
   * @param {Object} config possible Values: int initLength, int gridSize, int initSpeed, float speedUp, 
   *      int speedLimit, Object color {String bgColor, String bodyColor, String headColor}
   */

  constructor(parent, config) {
    this.loadConfiguration(parent, config);
    this.field = new _Field.default(parent, this.GRIDSIZE, this.BGCOLOR, () => {
      this.field.endScreen.hide();
      this.running = true;
      this.start();
    }, () => {
      this.destroy();
    });
    this.keyDownHandlerBound = this.keyDownHandler.bind(this);
    document.addEventListener("keydown", this.keyDownHandlerBound, false);
    this.running = true;
  }

  loadConfiguration(parent, config) {
    var _config$gridSize, _config$bgColor, _config$initSpeed, _config$speedUp, _config$speedLimit, _config$headColor, _config$bodyColor, _config$initLength;

    this.parent = parent;
    this.DBIRED = "#EE2E31";
    this.DBIBLUE = "#1E345A";
    this.DBIWHITE = "#FFFFFF"; //TODO checken ob es wirklich FFFFFF ist

    this.GRIDSIZE = (_config$gridSize = config.gridSize) !== null && _config$gridSize !== void 0 ? _config$gridSize : 15;
    this.BGCOLOR = (_config$bgColor = config.bgColor) !== null && _config$bgColor !== void 0 ? _config$bgColor : this.DBIBLUE;
    this.INITSPEED = (_config$initSpeed = config.initSpeed) !== null && _config$initSpeed !== void 0 ? _config$initSpeed : 500;
    this.tickrate = this.INITSPEED;
    this.SPEEDUP = (_config$speedUp = config.speedUp) !== null && _config$speedUp !== void 0 ? _config$speedUp : 1.05;
    this.SPEEDLIMIT = (_config$speedLimit = config.speedLimit) !== null && _config$speedLimit !== void 0 ? _config$speedLimit : 50;
    this.HEADCOLOR = (_config$headColor = config.headColor) !== null && _config$headColor !== void 0 ? _config$headColor : "grey";
    this.BODYCOLOR = (_config$bodyColor = config.bodyColor) !== null && _config$bodyColor !== void 0 ? _config$bodyColor : this.DBIWHITE;
    this.INITLENGTH = (_config$initLength = config.initLength) !== null && _config$initLength !== void 0 ? _config$initLength : 3;
  }
  /**
   * starts the game
   */


  async start() {
    this.field.clear();
    this.snake = new _Snake.default(this.INITLENGTH, this.GRIDSIZE, this.BODYCOLOR, this.HEADCOLOR); // TODO: move this into start() function, so snake can't automatically crash when restarting

    this.renderBody();
    this.placeFood();
    this.key = [];
    this.field.score.set(0);
    this.field.score.update();

    while (this.running) {
      // console.log(this.key);
      this.snake.move(this.key.shift());

      if (this.checkBodyCollision()) {
        this.gameOver();
        return;
      } else if (this.checkFoodCollision()) {
        this.field.score.set(this.snake.body.length - this.snake.initLength); //Speedup

        if (Math.floor(this.tickrate / this.SPEEDUP) > this.SPEEDLIMIT) {
          this.tickrate = Math.floor(this.tickrate / this.SPEEDUP);
        }

        this.placeFood();
      } else {
        this.field.renderSegment(this.snake.body.pop(), this.BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
      }

      this.renderBody(this.snake.color, this.snake.headColor);
      await _SnakeUtility.default.sleep(this.tickrate);
    }
  }
  /**
   * renders snake on Canvas
   * @param {*} color Farbe für Schwanz
   * @param {*} headcolor Farbe für Kopf
   */


  renderBody(color = this.DBIWHITE, headcolor = "green") {
    let head = this.snake.body[0];
    let tail = this.snake.body.slice(1);
    tail.forEach(segment => {
      this.field.renderSegment(segment, color);
    });
    this.field.renderSegment(head, headcolor);
  }
  /**
   * checks if head has collided with part of the snakes body
   */


  checkBodyCollision() {
    // checks collision with snake itself
    if (this.snake.body.slice(1, -1).some(coord => {
      return _Coord.default.collides(coord, this.snake.body[0]);
    })) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * checks if the head collides with food
   */


  checkFoodCollision() {
    if (_Coord.default.collides(this.food, this.snake.body[0])) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * places Food on an empty field
   */


  placeFood() {
    let free = this.notBody(); // console.log(free);

    this.food = free[Math.floor(Math.random() * free.length)];
    this.field.renderSegment(this.food, this.DBIRED);
  }
  /**
   * handles what happens at the end of a game
   */


  gameOver() {
    this.running = false;
    this.field.score.set(this.snake.body.length - (this.snake.initLength + 1));
    this.field.endScreen.setText(parseInt(this.field.score.score), parseInt(this.field.score.highscore));
    this.field.endScreen.show();

    if (parseInt(this.field.score.score) > parseInt(this.field.score.highscore)) {
      this.field.score.setHighscore(this.field.score.score);
    }

    this.tickrate = this.INITSPEED;
  }
  /**
   * generates an array with every field the snake is NOT on
   * @returns {Coord[]}
   */


  notBody() {
    //generate all available fields
    let free = [];
    let c;

    for (let i = 0; i < this.GRIDSIZE; i++) {
      for (let j = 0; j < this.GRIDSIZE; j++) {
        c = new _Coord.default(i, j);

        if (!this.snake.body.some(field => _Coord.default.collides(field, c))) {
          free.push(c);
        }
      }
    }
    /*
    console.log(free);
    free.forEach(segment => {
        field.renderSegment(segment,"red")
    });
    */


    return free;
  }
  /**
   * handles what happens on keyboard Events (left and right arrow)
   * @param {keyDownEvent} e
   */


  keyDownHandler(e) {
    //console.log(this.key)
    if (this.key.length <= 2) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        this.key.push("r");
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.key.push("l");
      }
    } //console.log(this.key);

  }
  /**
   * cleans up handlers
   */


  destroy() {
    document.removeEventListener("keydown", this.keyDownHandlerBound, false);
    this.field.destroy();
  }

}

exports.default = SnakeGame;