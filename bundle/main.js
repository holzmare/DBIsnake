(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/SnakeUtility.js
  var SnakeUtility = class {
    static mod(num, div) {
      return (num % div + div) % div;
    }
    static sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
  };

  // src/Coord.js
  var Coord = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    setXY(x, y) {
      this.x = x;
      this.y = y;
    }
    static collides(obj1, obj2) {
      return obj1.x === obj2.x && obj1.y === obj2.y;
    }
  };

  // src/Score.js
  var Score = class {
    constructor(parentObj) {
      __publicField(this, "display");
      this.score = 0;
      let highscore = window.localStorage.getItem("highscore");
      if (highscore === null) {
        highscore = 0;
      }
      this.highscore = highscore;
      this.display = document.createElement("div");
      this.displayStyle(this.display);
      this.update();
      parentObj.insertBefore(this.display, parentObj.childNodes[0]);
    }
    inc() {
      this.score++;
      this.update();
    }
    set(score) {
      this.score = score;
      this.update();
    }
    setHighscore(highscore) {
      this.highscore = highscore;
      window.localStorage.setItem("highscore", highscore);
      this.update();
    }
    update() {
      this.display.innerHTML = "Score: " + this.score + " <br> Highscore: " + this.highscore;
    }
    displayStyle(display) {
      display.style.position = "absolute";
      display.style.zIndex = "1";
      display.style.left = "10px";
      display.style.top = "10px";
      display.style.width = "200px";
      display.style.color = "white";
      display.style.fontWeight = "bold";
      display.style.fontFamily = "'Avenir',Helvetica,Arial,sans-serif";
      display.style.textAlign = "left";
    }
  };

  // src/EndScreen.js
  var EndScreen = class {
    constructor(parentObj, size, onReplayButtonCick = this.onReplayButtonCick, onExitButtonClick = this.onExitButtonClick) {
      this.highscore = 0;
      this.score = 0;
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
    resize(size) {
      this.container.style.height = size + "px";
      this.container.style.width = size + "px";
    }
    setText(score, highscore) {
      if (score > highscore) {
        this.text.innerHTML = "New Highscore!!!<br>Score: " + score + "<br>previous Highscore: " + highscore + "</span></h2>";
      } else {
        this.text.innerHTML = "<span>Score: " + score + "<br>Highscore: " + highscore + "</span></h2>";
      }
    }
    show() {
      this.container.style.visibility = "visible";
    }
    hide() {
      this.container.style.visibility = "hidden";
    }
    onReplayButtonCick() {
      this.hide();
    }
    onExitButtonClick() {
      this.hide();
    }
    buttonStyle(button, color) {
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
    contentStyle(content) {
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
    containerStyle(container, size) {
      container.style.position = "relative";
      container.style.display = "grid";
      container.style.zIndex = "2";
      container.style.placeItems = "center";
      container.backgroundColor = "rgba(0,0,0,0.3)";
      this.container.style.height = size + "px";
      this.container.style.width = size + "px";
    }
  };

  // src/Field.js
  var Field = class {
    constructor(parentObj, gridsize, bgcolor, onReplayButtonCick, onExitButtonClick) {
      __publicField(this, "stepWidth");
      this.gridsize = gridsize;
      this.bgcolor = bgcolor;
      this.container = document.createElement("div");
      this.containerStyle();
      parentObj.appendChild(this.container);
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
    }
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
    resizeCanvas() {
      this.size = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize) * this.gridsize;
      this.canvas.style.height = this.size + "px";
      this.canvas.style.width = this.size + "px";
      this.endScreen.resize(this.size);
    }
    gridToRaw(grid) {
      return grid * this.stepWidth;
    }
    gridToRawXY(grid) {
      return new Coord(parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    }
    renderSegment(segment, color = "white") {
      let point = this.gridToRawXY(segment);
      let dim = this.stepWidth;
      this.context.fillStyle = color;
      this.context.fillRect(point.x, point.y, dim, dim);
    }
    destroy() {
      window.removeEventListener("resize", this.resizeCanvasBound, false);
      this.container.remove();
    }
  };

  // src/Snake.js
  var Snake = class {
    constructor(initLength = 3, gridSize, color = "white", headColor = "grey") {
      __publicField(this, "body", []);
      __publicField(this, "initLength");
      __publicField(this, "heading", new Coord(0, 1));
      __publicField(this, "gridSize");
      __publicField(this, "color");
      __publicField(this, "headColor");
      this.initLength = initLength;
      this.gridSize = gridSize;
      this.color = color;
      this.headColor = headColor;
      let y = Math.floor(this.gridSize / 2) - this.initLength;
      for (let i = 0; i < this.initLength; i++) {
        this.body.unshift(new Coord(Math.floor(this.gridSize / 2), SnakeUtility.mod(y + i, this.gridSize)));
      }
    }
    move(dir) {
      if (dir === "l") {
        this.heading.setXY(this.heading.y, -this.heading.x);
      } else if (dir === "r") {
        this.heading.setXY(-this.heading.y, this.heading.x);
      }
      this.body.unshift(new Coord(SnakeUtility.mod(this.body[0].x + this.heading.x, this.gridSize), SnakeUtility.mod(this.body[0].y + this.heading.y, this.gridSize)));
    }
  };

  // src/SnakeGame.js
  var SnakeGame = class {
    constructor(parent, config) {
      __publicField(this, "snake");
      __publicField(this, "food");
      __publicField(this, "key", []);
      this.loadConfiguration(parent, config);
      this.field = new Field(parent, this.GRIDSIZE, this.BGCOLOR, () => {
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
      var _a, _b, _c, _d, _e, _f, _g, _h;
      this.parent = parent;
      this.DBIRED = "#EE2E31";
      this.DBIBLUE = "#1E345A";
      this.DBIWHITE = "#FFFFFF";
      this.GRIDSIZE = (_a = config.gridSize) != null ? _a : 15;
      this.BGCOLOR = (_b = config.bgColor) != null ? _b : this.DBIBLUE;
      this.INITSPEED = (_c = config.initSpeed) != null ? _c : 500;
      this.tickrate = this.INITSPEED;
      this.SPEEDUP = (_d = config.speedUp) != null ? _d : 1.05;
      this.SPEEDLIMIT = (_e = config.speedLimit) != null ? _e : 50;
      this.HEADCOLOR = (_f = config.headColor) != null ? _f : "grey";
      this.BODYCOLOR = (_g = config.bodyColor) != null ? _g : this.DBIWHITE;
      this.INITLENGTH = (_h = config.initLength) != null ? _h : 3;
    }
    start() {
      return __async(this, null, function* () {
        this.field.clear();
        this.snake = new Snake(this.INITLENGTH, this.GRIDSIZE, this.BODYCOLOR, this.HEADCOLOR);
        this.renderBody();
        this.placeFood();
        this.key = [];
        this.field.score.set(0);
        this.field.score.update();
        while (this.running) {
          this.snake.move(this.key.shift());
          if (this.checkBodyCollision()) {
            this.gameOver();
            return;
          } else if (this.checkFoodCollision()) {
            this.field.score.set(this.snake.body.length - this.snake.initLength);
            if (Math.floor(this.tickrate / this.SPEEDUP) > this.SPEEDLIMIT) {
              this.tickrate = Math.floor(this.tickrate / this.SPEEDUP);
            }
            this.placeFood();
          } else {
            this.field.renderSegment(this.snake.body.pop(), this.BGCOLOR);
          }
          this.renderBody(this.snake.color, this.snake.headColor);
          yield SnakeUtility.sleep(this.tickrate);
        }
      });
    }
    renderBody(color = this.DBIWHITE, headcolor = "green") {
      let head = this.snake.body[0];
      let tail = this.snake.body.slice(1);
      tail.forEach((segment) => {
        this.field.renderSegment(segment, color);
      });
      this.field.renderSegment(head, headcolor);
    }
    checkBodyCollision() {
      if (this.snake.body.slice(1, -1).some((coord) => {
        return Coord.collides(coord, this.snake.body[0]);
      })) {
        return true;
      } else {
        return false;
      }
    }
    checkFoodCollision() {
      if (Coord.collides(this.food, this.snake.body[0])) {
        return true;
      } else {
        return false;
      }
    }
    placeFood() {
      let free = this.notBody();
      this.food = free[Math.floor(Math.random() * free.length)];
      this.field.renderSegment(this.food, this.DBIRED);
    }
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
    notBody() {
      let free = [];
      let c;
      for (let i = 0; i < this.GRIDSIZE; i++) {
        for (let j = 0; j < this.GRIDSIZE; j++) {
          c = new Coord(i, j);
          if (!this.snake.body.some((field) => Coord.collides(field, c))) {
            free.push(c);
          }
        }
      }
      return free;
    }
    keyDownHandler(e) {
      if (this.key.length <= 2) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.key.push("r");
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.key.push("l");
        }
      }
    }
    destroy() {
      document.removeEventListener("keydown", this.keyDownHandlerBound, false);
      this.field.destroy();
    }
  };
})();
