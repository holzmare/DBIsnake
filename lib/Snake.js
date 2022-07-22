import Coord from "./Coord.js";
import SnakeUtility from "./SnakeUtility.js";
export default class Snake {
  body = [];
  initLength;
  heading = new Coord(0, 1);
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
      this.body.unshift(new Coord(Math.floor(this.gridSize / 2), SnakeUtility.mod(y + i, this.gridSize)));
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

    this.body.unshift(new Coord(SnakeUtility.mod(this.body[0].x + this.heading.x, this.gridSize), SnakeUtility.mod(this.body[0].y + this.heading.y, this.gridSize)));
  }

}