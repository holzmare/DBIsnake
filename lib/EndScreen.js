/**
 * implements an Overlay that contains a Score Display and controls to restart the game
 */
export default class EndScreen {
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

}