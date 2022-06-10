/**
 * handles score display in a div element in the top left corner of its parent
 */
export default class Score {
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
        this.score = score;
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
