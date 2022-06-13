import SnakeUtility from "./SnakeUtility.js";
import Coord from "./Coord.js";
import Field from "./Field.js";
import Snake from "./Snake.js";
/**
 * implements the game snake
 */
export default class SnakeGame {
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
            // console.log(this.key);
            this.snake.move(this.key.shift());
            if (this.checkBodyCollision()) {
                this.gameOver();
            } else if (this.checkFoodCollision()) {
                this.field.score.set(this.snake.body.length - (this.snake.initLength));
                //Speedup
                if (Math.floor(this.tickrate / this.SPEEDUP) > this.SPEEDLIMIT) {
                    this.tickrate = Math.floor(this.tickrate / this.SPEEDUP);
                }
                this.placeFood();
            } else {
                this.field.renderSegment(this.snake.body.pop(), this.BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
            }
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
        if (this.snake.body.slice(1, -1).some(coord => { return this.collides(coord, this.snake.body[0]); })) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * checks if the head collides with food
     */
    checkFoodCollision() {
        if (this.collides(this.food, this.snake.body[0])) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * places Food on an empty field
     */
    placeFood() {
        let free = this.notBody();
        // console.log(free);
        this.food = free[Math.floor(Math.random() * free.length)];
        this.field.renderSegment(this.food, this.DBIRED);
    }

    /**
     * handles what happens at the end of a game
     */
    gameOver() {
        // console.log(this.snake.body.length + "-" + this.snake.initLength);
        this.field.score.set(this.snake.body.length - (this.snake.initLength + 1));
        if (this.field.score.score > this.field.score.highscore) {
            alert("GAME OVER!!! \nScore: " + this.field.score.score + "\nNEW HIGHSCORE!!! \nPrevious Highscore: " + this.field.score.highscore);
            this.field.score.setHighscore(this.field.score.score);
        }
        else {
            alert("GAME OVER!!! \nScore: " + this.field.score.score + "\nHighscore: " + this.field.score.highscore);
        }
        //Restart
        let discard = this.snake.body.slice(this.snake.initLength, this.snake.body.length);
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
        let free = [];
        let c;
        for (let i = 0; i < this.GRIDSIZE; i++) {
            for (let j = 0; j < this.GRIDSIZE; j++) {
                c = new Coord(i, j);
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
