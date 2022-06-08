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
    let field;
    field = new Field(document.body);
    snake = new Snake(field,3);
    while(true){
        snake.renderBody();
        await sleep(field.tickrate);
        snake.move(snake.key);
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
    constructor(parentObj){
        this.score = 0;
        let highscore = window.localStorage.getItem("highscore");
        if (highscore == null){
            highscore = 0;
        }
        this.highscore = highscore;
        this.display = document.createElement("div"),
        this.display.setAttribute("style", "position: absolute; z-index: 1; left: 10px; top: 10px; width:200px;color: white;font-weight: bold;font-size: 14pt;");
        this.update();
        parentObj.insertBefore(this.display, parentObj.childNodes[0]);
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

class Field {
    
    container = document.createElement("div");
    canvas = document.createElement("canvas");
    stepWidth;
    key = "s";
    tickrate = INITSPEED;
    constructor(parentObj){
        this.context = this.canvas.getContext("2d");
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;
        this.container.width = 100;
        this.container.setAttribute("style", "height:100%;");
        parentObj.insertBefore(this.container, parentObj.childNodes[0]);
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

        window.addEventListener("resize", this.resizeCanvas, false);
    };

    resizeCanvas(){
        let newSize = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight)/GRIDSIZE)*GRIDSIZE;
        console.log(newSize)
        this.canvas.style.height = newSize+"px";
        this.canvas.style.width = newSize+"px";
    };

    /**
     * @description - Converts a grid unit to raw pixel values
     * @param {int} grid - grid-coord
     * @returns {int} - pixel value of beginning of the grid-field
     */
    gridToRaw(grid){
    return grid * this.stepWidth;
    };

    /**
     * @description - Converts a grid-object to the pixel coords of its left upper corner
     * @param {{x: int, y: int}} grid 
     * @returns Coord - grid-coord object
     */
    gridToRawXY(grid){
    return new Coord(parseInt(this.gridToRaw(grid.x)), parseInt(this.gridToRaw(grid.y)));
    };

    renderSegment(segment, color = DBIWHITE){
        let point = this.gridToRawXY(segment);
        //console.log(point);
        var dim = this.stepWidth;
        this.context.fillStyle = color;
        this.context.fillRect(point.x, point.y,dim, dim);
    };
    
}

class Snake {
    body = [];
    heading = new Coord(0,1);
    food;
    key = ["s","s"];
    initLength = 3;
    constructor(field, length=3){
        this.field = field;
        this.initLength = length;
        let y = Math.floor(GRIDSIZE/2)-length;
        for(var i=0; i<length; i++){
            this.body.unshift(new Coord(Math.floor(GRIDSIZE/2), mod(y+i,GRIDSIZE)));
        }
        this.placeFood();

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    }

    /**
     * @description Schlange auf Canvas zeichnen
     * @param {*} field Spielfeld
     * @param {*} color Farbe für Schwanz
     * @param {*} headcolor Farbe für Kopf
     */
    renderBody(color=DBIWHITE, headcolor="green"){
        var head = this.body[0];
        var tail = this.body.slice(1);
        tail.forEach(segment => {
            this.field.renderSegment(segment,color);
        });
        this.field.renderSegment(head,headcolor);
    }    
    
    /**
    * @description Schlangenbewegung
    * @param {char} dir : r,l -> lenken
    */
   async move(dir){
        console.log(this.key)
        dir = this.key.shift();
        this.key.push("s");
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
            this.field.renderSegment(this.body.pop(), BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
        }
        else {// Wenn Essen
            this.field.score.set(this.body.length-(this.initLength));
            this.placeFood();
            //Speedup
            if (Math.floor(this.field.tickrate/SPEEDUP) > SPEEDLIMIT){
                this.field.tickrate = Math.floor(this.field.tickrate/SPEEDUP);
            }
        }
    }

    placeFood(){
        var free = this.notBody();
        console.log(free)
        this.food = free[Math.floor(Math.random()*free.length)];
        this.field.renderSegment(this.food, DBIRED);
    }

    gameOver() {
        console.log(this.body.length + "-" + this.initLength);
        this.field.score.set(this.body.length-(this.initLength+1));
        if (this.field.score.score > this.field.score.highscore){
            alert("GAME OVER!!! \nScore: "+this.field.score.score+"\nNEW HIGHSCORE!!! \nPrevious Highscore: "+this.field.score.highscore);
            window.localStorage.setItem("highscore",this.field.score.score);
        }
        else{
            alert("GAME OVER!!! \nScore: "+this.field.score.score+"\nHighscore: "+this.field.score.highscore);
        }
        //Restart
        var discard = this.body.slice(this.initLength,this.body.length);
        discard.forEach(segment => {
            this.field.renderSegment(segment,BGCOLOR);
        });
        this.field.tickrate = INITSPEED;
        this.body = this.body.slice(0,this.initLength);
        this.field.score.set(0);
    }


    collides(obj1, obj2){
        //console.log(obj1.x == obj2.x && obj1.y == obj2.y);
        return obj1.x == obj2.x && obj1.y == obj2.y;
    }

    notBody(){
        //generate all available fields
        var free = [];
        var c;
        for(var i = 0; i<GRIDSIZE; i++){
            for(var j = 0; j<GRIDSIZE; j++){
                c = new Coord(i,j)
                if(!this.body.some(field => field.x === c.x && field.y === c.y)){
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

    keyDownHandler(e) {
        //console.log(this.key)
        let found = this.key.indexOf("s");
        if (found >= 0){
            if(e.key == "Right" || e.key == "ArrowRight") {
                this.key[found] = "r";
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                this.key[found] = "l";
            }
        }

        //console.log(this.key);
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



 

//WIP
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



