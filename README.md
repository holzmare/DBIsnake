# DBIsnake
An Implementation of the classic video-game "Snake" as a pure JavaScript Module published as an NPM-package. The game uses an HTML-Canvas to display it's content

## Usage
- Import it into your project
- Create a new instance of the game. The constructor needs to be passed a parent DOM-element to attach the canvas to and an Object for configuration options
- Start the game loop with the start() method
- The listeners the game creates can be cleaned up after the game was terminated with the destroy() method
- The status of the game can be checked anytime via the "status" variable (0=game was terminated, 1 = pre init, 2 = game in progress, 3 = Game Over)

## Configuration
Configuration is done via the configuration object passed to the constructor. The configuration object may contain the following properties:
- gridSize - specifies the amount of rows and columns to use for the playing field
- bgColor - sets the background color of the playing field
- initSpeed - sets how fast the snake moves at the beginning of the game
- speedUp - how the snakes speed should change any time it eats food. 1.1 equals to a 10% speedup
- speedLimit - the minimum tick rate for the snakes movement
- headColor- - color to use for the snakes head
- config.bodyColor - color to use as the snakes body
- config.initLength - how long the snake should be at the start of the game. This length does not count towards the score