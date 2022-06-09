async function main() {
    let game = new SnakeGame(document.body, 3);
    await game.start();
    game.destroy();
}

/**
 * implements the game snake
 */
class SnakeGame {
    // Config--------------------------------------------------------------
    DBIRED = "#EE2E31";
    DBIBLUE = "#1E345A";
    DBIWHITE = "#FFFFFF"; //TODO checken ob es wirklich FFFFFF ist
    GRIDSIZE = 15;
    BGCOLOR = this.DBIBLUE;
    INITSPEED = 500;
    SPEEDUP = 1.05;
    SPEEDLIMIT = 50;
    //---------------------------------------------------------------------
    snake;
    food;
    key = [];
    tickrate = this.INITSPEED;
    constructor(parent, length = 3) {
        this.field = new Field(parent, this.GRIDSIZE, this.BGCOLOR);
        this.snake = new Snake(length, this.GRIDSIZE, this.DBIWHITE, "grey");
        this.renderBody();
        this.placeFood();

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    }
    /**
     * starts the game
     */
    async start() {
        while (true) {
            console.log(this.key)
            this.snake.move(this.key.shift());
            this.checkCollision();
            this.renderBody(this.snake.color, this.snake.headColor);
            await SnakeUtility.sleep(this.tickrate);
        }
    }

    /**
     * renders snake on Canvas
     * @param {*} color Farbe für Schwanz
     * @param {*} headcolor Farbe für Kopf
     */
    renderBody(color = this.DBIWHITE, headcolor = "green") {
        var head = this.snake.body[0];
        var tail = this.snake.body.slice(1);
        tail.forEach(segment => {
            this.field.renderSegment(segment, color);
        });
        this.field.renderSegment(head, headcolor);
    }

    /**
     * checks if any event should be triggered
     */
    checkCollision() {
        // checks collision with snake itself
        if (this.snake.body.slice(1, -1).some(coord => { return this.collides(coord, this.snake.body[0]); })) {
            this.gameOver();
        }

        // checks collision with food
        else if (this.collides(this.food, this.snake.body[0])) {
            this.field.score.set(this.snake.body.length - (this.snake.initLength));
            this.placeFood();
            //Speedup
            if (Math.floor(this.tickrate / this.SPEEDUP) > this.SPEEDLIMIT) {
                this.tickrate = Math.floor(this.tickrate / this.SPEEDUP);

            }
        }
        else {
            this.field.renderSegment(this.snake.body.pop(), this.BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
        }
    }

    /**
     * places Food on an empty field
     */
    placeFood() {
        var free = this.notBody();
        console.log(free)
        this.food = free[Math.floor(Math.random() * free.length)];
        this.field.renderSegment(this.food, this.DBIRED);
    }

    /**
     * handles what happens at the end of a game
     */
    gameOver() {
        console.log(this.snake.body.length + "-" + this.snake.initLength);
        this.field.score.set(this.snake.body.length - (this.snake.initLength + 1));
        if (this.field.score.score > this.field.score.highscore) {
            alert("GAME OVER!!! \nScore: " + this.field.score.score + "\nNEW HIGHSCORE!!! \nPrevious Highscore: " + this.field.score.highscore);
            window.localStorage.setItem("highscore", this.field.score.score);
        }
        else {
            alert("GAME OVER!!! \nScore: " + this.field.score.score + "\nHighscore: " + this.field.score.highscore);
        }
        //Restart
        var discard = this.snake.body.slice(this.snake.initLength, this.snake.body.length);
        discard.forEach(segment => {
            this.field.renderSegment(segment, this.BGCOLOR);
        });
        this.tickrate = this.INITSPEED;
        this.snake.body = this.snake.body.slice(0, this.snake.initLength);
        this.key = [];
        this.field.score.set(0);
        this.field.score.update();
    }

    /**
     * evaluates if two Coord-objects refer to the same coordinates
     * @param {Coord} obj1 
     * @param {Coord} obj2 
     * @returns {boolean}
     */
    collides(obj1, obj2) {
        return obj1.x == obj2.x && obj1.y == obj2.y;
    }

    /**
     * generates an array with every field the snake is NOT on
     * @returns {Coord[]}
     */
    notBody() {
        //generate all available fields
        var free = [];
        var c;
        for (var i = 0; i < this.GRIDSIZE; i++) {
            for (var j = 0; j < this.GRIDSIZE; j++) {
                c = new Coord(i, j)
                if (!this.snake.body.some(field => this.collides(field, c))) {
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
            if (e.key == "Right" || e.key == "ArrowRight") {
                this.key.push("r");
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                this.key.push("l");
            }
        }
        //console.log(this.key);
    }

    /**
     * cleans up handlers
     */
    destroy() {
        document.removeEventListener("keydown", this.keyDownHandler, false);
    }
}

class SnakeUtility {
    /**
     * Modulo with correct handling of negative divident
     * @param {int} num divident
     * @param {int} div divisor
     * @returns Modulo
     */
    static mod(num, div) {
        return ((num % div) + div) % div;
    };
    
    /**
     * sleeps for a specified time
     * @param {int} milliseconds time to wait for
     * @returns 
     */
    static sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
}


/**
 * data structure for x/y coordinates
 */
class Coord {
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

/**
 * handles score display in a div element in the top left corner of its parent
 */
class Score {
    display;
    //TODO: Allgemeiner, evtl teilweise in eine "Display"-Klasse auslagern

    /**
     * creates a new div to contain the score display as first child element of the specified parent and initializes the needed variables
     * The highscore is tracked in the localStorage-variable "highscore"
     * @param {DOM-Element} parentObj Parent element of the score display
     */
    constructor(parentObj) {
        this.score = 0;
        let highscore = window.localStorage.getItem("highscore");
        if (highscore == null) {
            highscore = 0;
        }
        this.highscore = highscore;
        this.display = document.createElement("div"),
            this.display.setAttribute("style", "position: absolute; z-index: 1; left: 10px; top: 10px; width:200px;color: white;font-weight: bold;font-size: 14pt;");
        this.update();
        parentObj.insertBefore(this.display, parentObj.childNodes[0]);
    }

    /**
     * increments the score by 1
     */
    inc() {
        this.score++;
        this.update();
    }

    /**
     * setter for the score
     * @param {int} score new score
     */
    set(score) {
        this.score = score
        this.update();
    }

    /**
     * setter for the highscore
     * @param {int} highscore new highscore
     */
    setHighscore(highscore) {
        this.highscore = highscore;
        window.localStorage.setItem("highscore", highscore);
        this.update();
    }

    /**
     * updates the score display
     */
    update() {
        this.display.innerHTML = "Score: " + this.score + " <br> Highscore: " + this.highscore;
    }
}

/**
 * implements a playing field as an HTML-canvas
 */
class Field {
    container = document.createElement("div");
    canvas = document.createElement("canvas");
    stepWidth;
    /**
     * creates a canvas to fit available space 
     * (size maximum possible multiple of gridsize)
     * @param {DOM-element} parentObj parent element the canvas should be a child of
     * @param {int} gridsize Amount of rows and columns the field should have
     * @param {String} bgcolor the fields color
     */
    constructor(parentObj, gridsize, bgcolor) {
        this.gridsize = gridsize;
        this.bgcolor = bgcolor;
        this.context = this.canvas.getContext("2d");
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;
        this.container.width = 100;
        this.container.setAttribute("style", "height:100%;");
        parentObj.insertBefore(this.container, parentObj.childNodes[0]);
        console.log("container height: " + this.container.clientHeight);
        if (this.container.clientWidth == 0 || this.container.clientHeight == 0) {
            console.log("Parent has no fixed size, using 400px as default.")
            this.stepWidth = Math.floor(400 / this.gridsize);

        } else {
            this.stepWidth = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize);
        }
        this.canvas.width = this.stepWidth * this.gridsize;
        this.canvas.height = this.stepWidth * this.gridsize;
        this.score = new Score(this.container);
        this.container.insertBefore(this.canvas, this.container.childNodes[0]);
        this.context.fillStyle = this.bgcolor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        window.addEventListener("resize", this.resizeCanvas, false);
    };

    /**
     * handles resize event
     */
    resizeCanvas() {
        let newSize = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / this.gridsize) * this.gridsize;
        console.log(newSize)
        this.canvas.style.height = newSize + "px";
        this.canvas.style.width = newSize + "px";
    };

    /**
     * Converts a grid unit to raw pixel values
     * @param {int} grid - grid-coord
     * @returns {int} - pixel value of beginning of the grid-field
     */
    gridToRaw(grid) {
        return grid * this.stepWidth;
    };

    /**
     * Converts a grid-object to the pixel coords of its left upper corner
     * @param {Coord} grid 
     * @returns {Coord} - grid-coord object
     */
    gridToRawXY(grid) {
        return new Coord(parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    };

    renderSegment(segment, color = "magenta") {
        let point = this.gridToRawXY(segment);
        //console.log(point);
        var dim = this.stepWidth;
        this.context.fillStyle = color;
        this.context.fillRect(point.x, point.y, dim, dim);
    };

}

class Snake{    
    body = [];
    initLength;
    heading = new Coord(0, 1);
    gridSize;
    color;
    headColor;
    constructor(initLength = 3, gridSize, color="white", headColor="grey") {
        this.initLength = initLength;
        this.gridSize = gridSize;
        this.color = color;
        this.headColor = headColor;
        let y = Math.floor(this.gridSize / 2) - this.initLength;
        for (var i = 0; i < this.initLength; i++) {
            this.body.unshift(new Coord(Math.floor(this.gridSize / 2), SnakeUtility.mod(y + i, this.gridSize)));
        }
    }

    /**
    * moves the snake
    */
    move(dir) {
        if (dir == "l") {
            this.heading.setXY(this.heading.y, -this.heading.x);
        }
        else if (dir == "r") {
            this.heading.setXY(-this.heading.y, this.heading.x);
        }
        this.body.unshift(new Coord(SnakeUtility.mod(this.body[0].x + this.heading.x, this.gridSize), SnakeUtility.mod(this.body[0].y + this.heading.y, this.gridSize)));
    }
}






/*
//WIP
function renderRoundedBody (body, ctx, cornerHardness){
    ctx.beginPath();
    ctx.moveTo(100,50);
    ctx.arcTo(150,50, 150, 100, cornerHardness);
    ctx.lineTo(150,100);
    ctx.strokeStyle = "white";
    ctx.stroke();

    point = {x:"300", y:"200"};
    ctx.moveTo(point.x-50, )
}
*/
