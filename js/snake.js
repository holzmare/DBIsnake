// DBI Farben: Blau: #1E345A, Rot:
const DBIRED = "#EE2E31";
const DBIBLUE = "#1E345A";
const DBIWHITE = "#FFFFFF"; //TODO checken ob es wirklich FFFFFF ist
const GRIDSIZE = 15;
const BGCOLOR = DBIBLUE;
const INITSPEED = 500;
const SPEEDUP = 1.05;
const SPEEDLIMIT = 50;

function mod(num, div) {
    return ((num%div)+div)%div;
}


async function main(){
    let snake;
    field.init(document.body);
    snake = new Snake(3);
    document.addEventListener("keydown", this.keyDownHandler, false);
    window.addEventListener("resize", field.resizeCanvas, false);
    while(true){
        snake.renderBody(field);
        await sleep(field.tickrate);
        snake.move(field.key);
    }
}   

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}  

class Coord {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    setXY(x,y){
        this.x = x;
        this.y = y;
    }
}

class Score {
    //TODO: Allgemeiner, evtl teilweise in eine "Display"-Klasse auslagern
    constructor(parent){
        this.score = 0;
        let highscore = window.localStorage.getItem("highscore");
        if (highscore == null){
            highscore = 0;
        }
        this.highscore = highscore;
        this.display = document.createElement("div"),
        this.display.setAttribute("style", "position: absolute; z-index: 1; left: 10px; top: 10px; width:200px;color: white;font-weight: bold;font-size: 14pt;");
        this.update();
        parent.insertBefore(this.display, parent.childNodes[0]);
    }

    inc (){
        this.score++;
        this.update;
    }

    set (score){
        this.score = score
        this.update();
    }

    setHighscore(highscore) {
        this.highscore = highscore;
        window.localStorage.setItem("highscore", highscore);
    }

    update (){
        this.display.innerHTML = "Score: "+this.score+" <br> Highscore: "+this.highscore;
    }
}

var field = {
    container : document.createElement("div"),
    canvas : document.createElement("canvas"),
    stepWidth : 4,
    key: "no",
    tickrate: INITSPEED,
    init : function(parent){
        this.context = this.canvas.getContext("2d");
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;
        this.container.width = 100;
        this.container.setAttribute("style", "height:100%;");
        parent.insertBefore(this.container, parent.childNodes[0]);
        console.log("container height: " + this.container.clientHeight);
        if(this.container.clientWidth == 0 || this.container.clientHeight == 0){
            console.log("Parent has no fixed size, using 400px as default.")
            this.stepWidth = Math.floor(400/GRIDSIZE);

        }else{
            this.stepWidth = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight)/GRIDSIZE);
        }
        this.canvas.width = this.stepWidth*GRIDSIZE;
        this.canvas.height = this.stepWidth*GRIDSIZE;
        this.score = new Score(this.container);
        this.container.insertBefore(this.canvas, this.container.childNodes[0]);
        this.context.fillStyle = BGCOLOR;
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    },

    resizeCanvas: function(){
        let newSize = Math.floor(Math.min(field.container.clientWidth, field.container.clientHeight)/GRIDSIZE)*GRIDSIZE;
        console.log(newSize)
        field.canvas.style.height = newSize+"px";
        field.canvas.style.width = newSize+"px";
    },

    /**
     * @description - Converts a grid unit to raw pixel values
     * @param {int} grid - grid-coord
     * @returns {int} - pixel value of beginning of the grid-field
     */
    gridToRaw : function  (grid){
    return grid * this.stepWidth;
    },

    /**
     * @description - Converts a grid-object to the pixel coords of its left upper corner
     * @param {{x: int, y: int}} grid 
     * @returns Coord - grid-coord object
     */
    gridToRawXY : function(grid){
    return new Coord(parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    },

    renderSegment : function  (segment, color=DBIWHITE){
        point = this.gridToRawXY(segment);
        //console.log(point);
        var dim = this.stepWidth;
        this.context.fillStyle = color;
        this.context.fillRect(point.x, point.y,dim, dim);
    }
};

class Snake {
    body = [];
    heading = new Coord(0,1);
    food;
    initLength = 3;
    constructor(length=3){
        this.initLength = length;
        let y = Math.floor(GRIDSIZE/2)-length;
        for(var i=0; i<length; i++){
            this.body.unshift(new Coord(Math.floor(GRIDSIZE/2), mod(y+i,GRIDSIZE)));
        }
        this.placeFood();
    }

    /**
     * @description Schlange auf Canvas zeichnen
     * @param {*} field Spielfeld
     * @param {*} color Farbe für Schwanz
     * @param {*} headcolor Farbe für Kopf
     */
    renderBody(field, color=DBIWHITE, headcolor="green"){
        var head = this.body[0];
        var tail = this.body.slice(1);
        tail.forEach(segment => {
            field.renderSegment(segment,color);
        });
        field.renderSegment(head,headcolor);
    }    
    
    /**
    * @description Schlangenbewegung
    * @param {char} dir : r,l -> lenken
    */
   move(dir){
        field.key = "no";
        if (dir == "l"){
           this.heading.setXY(this.heading.y, -this.heading.x);
        }
        else if (dir == "r"){
            this.heading.setXY(-this.heading.y, this.heading.x);
        }
        this.body.unshift(new Coord(mod(this.body[0].x+this.heading.x,GRIDSIZE), mod(this.body[0].y+this.heading.y,GRIDSIZE)));
        //Kollisionscheck Schlange
        this.checkCollision();
   }

    checkCollision() {
        if (this.body.slice(1,-1).some(coord => { return this.collides(coord, this.body[0]); })) {
            this.gameOver();
        }

        // Kollisionscheck Essen (wenn kein Essen)
        else if (!this.collides(this.food, this.body[0])) {
            field.renderSegment(this.body.pop(), BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
        }
        else {// Wenn Essen
            field.score.set(this.body.length-(this.initLength));
            this.placeFood();
            //Speedup
            if (Math.floor(field.tickrate/SPEEDUP) > SPEEDLIMIT){
                field.tickrate = Math.floor(field.tickrate/SPEEDUP);
            }
        }
    }

    placeFood(){
        var free = this.notBody();
        this.food = free[Math.floor(Math.random()*free.length)];
        field.renderSegment(this.food, DBIRED);
    }

    gameOver() {
        console.log(this.body.length + "-" + this.initLength);
        field.score.set(this.body.length-(this.initLength+1));
        if (field.score.score > field.score.highscore){
            alert("GAME OVER!!! \nScore: "+field.score.score+"\nNEW HIGHSCORE!!! \nPrevious Highscore: "+field.score.highscore);
            window.localStorage.setItem("highscore",field.score.score);
        }
        else{
            alert("GAME OVER!!! \nScore: "+field.score.score+"\nHighscore: "+field.score.highscore);
        }
        //Restart
        var discard = this.body.slice(this.initLength,this.body.length);
        discard.forEach(segment => {
            field.renderSegment(segment,BGCOLOR);
        });
        field.tickrate = INITSPEED;
        this.body = this.body.slice(0,this.initLength);
        field.score.set(0);
    }


    collides(obj1, obj2){
        console.log(obj1.x == obj2.x && obj1.y == obj2.y);
        return obj1.x == obj2.x && obj1.y == obj2.y;
    }

    notBody(){
        //generate all available fields
        var fields = [];
        for(var i = 0; i<GRIDSIZE; i++){
            for(var j = 0; j<GRIDSIZE; j++){
                fields.push({x: i, y: j});
            }
        }
        var free = fields.filter(field => !this.body.some(part => part.x === field.x && part.y === field.y));
        /*
        console.log(free);
        free.forEach(segment => {
            field.renderSegment(segment,"red")
        });
        */
        return free;
    }

    /*
    heading(){
        let hdng = {x: this.body[0].x-this.body[1].x, y: this.body[0].y-this.body[1].y};
        if (hdng.x>1 || hdng.x<-1){
            hdng.x/=Math.abs(hdng.x);
        }
        if (hdng.y>1 || hdng.y<-1){
            hdng.y/=Math.abs(hdng.y);
        } 
        return hdng;
    }
*/

}


function keyDownHandler(e) {
    console.log("test")
    if(e.key == "Right" || e.key == "ArrowRight") {
        field.key = "r";
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        field.key = "l";
    }
    console.log(field.key);
}

 
function resizeCanvas(e) {
    field.canvas.resizeCanvas();
}


function renderRoundedBody (body, ctx, cornerHardness){
    ctx.beginPath();
    ctx.moveTo(100,50);
    ctx.arcTo(150,50, 150, 100, cornerHardness);
    ctx.lineTo(150,100);
    ctx.strokeStyle = DBIWHITE;
    ctx.stroke();

    point = {x:"300", y:"200"};
    ctx.moveTo(point.x-50, )
}



