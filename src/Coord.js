/**
 * data structure for x/y coordinates
 */
export class Coord {
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
}

//export {Coord}
