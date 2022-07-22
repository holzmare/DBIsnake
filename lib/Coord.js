/**
 * data structure for x/y coordinates
 */
export default class Coord {
  /**
   * initializes a new Coord
   * @param {int} x
   * @param {int} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * changes the coordinates of a Coord
   * @param {int} x
   * @param {int} y
   */


  setXY(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * evaluates if two Coord-objects refer to the same coordinates
   * @param {Coord} obj1
   * @param {Coord} obj2
   * @returns {boolean}
   */


  static collides(obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y;
  }

}