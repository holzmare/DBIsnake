/**
 * implements an Overlay that contains a Score Display and controls to restart the game
 */
 export default class EndScreen {
    constructor(parentObj, size, onReplayButtonCick=this.onReplayButtonCick, onExitButtonClick=this.onExitButtonClick) {     
        // Initialize variables
        this.highscore = 0;
        this.score = 0;
        this.parentObj = parentObj;

        // create and style container element
        this.container = document.createElement("div");
        this.parentObj.insertBefore(this.container, this.parentObj.childNodes[0]);
        this.containerStyle(this.container, size);
        
        // create, style and fill the content element
        this.content = document.createElement("div");
        this.container.appendChild(this.content);
        this.contentStyle(this.content);
        this.content.innerHTML = "<h2>GAME OVER!</h2>";

        this.text = document.createElement("span");
        this.content.appendChild(this.text);
        
        this.setText(0, 0);

        // create button section
        this.buttons = document.createElement("span");

        this.replayButton = document.createElement("button");
        this.replayButton.innerHTML = "Play Again!";
        this.replayButton.onclick = onReplayButtonCick.bind(this);

        this.exitButton = document.createElement("button");
        this.exitButton.innerHTML = "Stop Playing!";
        this.exitButton.onclick = onExitButtonClick.bind(this);
        
        this.buttonsStyle(this.buttons);
        this.buttonStyle(this.exitButton, "#1E345A");
        this.buttonStyle(this.replayButton, "#EE2E31");
        
        this.content.appendChild(this.buttons);
        this.buttons.appendChild(this.replayButton);
        this.buttons.appendChild(this.exitButton);
        

        this.hide();

    }

    resize(size){
        this.container.style.height = size + "px";
        this.container.style.width = size + "px";
        this.container.style.fontSize = size/20 + "px";
    }

    setText(score, highscore) {
        if (score > highscore) {
            this.text.innerHTML = "New Highscore!!!<br>Score: " + score + "<br>previous Highscore: " + highscore + "</span></h2>";
        }else{
            this.text.innerHTML = "<span>Score: " + score + "<br>Highscore: " + highscore + "</span></h2>";
        }
    }


    show(){
        this.container.style.visibility = "visible";
    }

    hide(){
        this.container.style.visibility = "hidden";
    }

    onReplayButtonCick(){
        this.hide();
    }

    onExitButtonClick(){
        this.hide();
    }

    buttonsStyle(buttons){
        buttons.style.whiteSpace = "nowrap";
    }

    buttonStyle(button, color){
        button.style.margin = "1.5%";
        button.style.border = "2px";
        button.style.borderStyle = "solid"
        button.style.backgroundColor = color;
        button.style.borderColor = "white";
        button.style.color = "white";
        button.style.padding = "1.5%";
        button.style.textAlign = "center";
        button.style.textDecoration = "none";
        button.style.display = "inline-block";
        button.style.fontSize = ".75em";
        button.style.cursor = "pointer";
        button.fontFamily = "'Avenir',Helvetica,Arial,sans-serif"
    }

    contentStyle(content){
        content.style.position = "relative";
        content.style.display = "flex";
        content.style.flexDirection = "column";
        content.style.justifyContent = "center";
        content.style.width = "80%";
        content.style.height = "50%";
        content.style.backgroundColor = "#1E345A";
        content.style.color = "white";
        content.style.border = "6px solid #FFF";
        content.style.fontWeight = "bold";
        content.style.fontSize = "1.1em";
        content.style.fontFamily = "'Avenir',Helvetica,Arial,sans-serif";
    }

    containerStyle(container, size){
        container.style.position = "relative";
        container.style.display = "grid";
        container.style.zIndex = "2";
        container.style.placeItems = "center";
        container.backgroundColor = "rgba(0,0,0,0.3)";
        this.resize(size);
    }

}
