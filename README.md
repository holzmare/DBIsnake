# DBIsnake
An Implementation of the classic video-game "Snake" as a pure JavaScript Module published as an NPM-package. The game uses an HTML-Canvas to display it's content

# Usage
- Import it into your project
- Create a new instance of the game. The constructor needs a parent DOM-element to attach the canvas
- Start the game loop with the start() method
- The listeners the game creates can be cleaned up after the game was terminated with the destroy() method
- The status of the game can be checked anytime via the "status" variable (0=game was terminated, 1 = pre init, 2 = game in progress, 3 = Game Over)
