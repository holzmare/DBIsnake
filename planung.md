# Snake
## Regeln
* Zweidimensionales Spielfeld mit fester Größe
* Eine Schlange bewegt sich periodisch
* Der Spieler kann die Richtung, in die sich die Schlange bewegt kontrollieren
* Ziel des Spiels ist es, die Schlange möglichst lang werden zu lassen
* Auf einem zufälligen Feld wird Nahrung platziert
* Bewegt sich der Kopf der Schlange auf dieses Feld frisst die Schlange die Nahrung, d.h. sie wird ein Feld länger und es wird ein neues Nahrungsfeld gewählt
* Bewegt sich eine n-lange Schlange, so bleiben ihre n-1 zuvor besetzten Felder belegt
* Trifft sich die Schlange beim bewegen ist das Spiel zu Ende
## Elemente
### field
Spielfeld
* Unbesetzte Felder tracken. Möglichkeiten:
    * alle Permutationen berechnen und als frei:[int] ablegen und auf snake.body filtern
        * kurz rechenaufwändig
        * nur bei eat() notwendig -> nicht so schlimm?
    * statt auf snake.body zu filtern Elemente zwischen den Arrays hin und her moven
        * Speicheraufwändiger
        * Speicheroperationen bei jeder Bewegung notwendig
* eat()
    * Nahrung neu platzieren
    * random, aber nur aus nicht besetzten Feldern

### snake
Attribute:
* body: [{x: int, y: int}]
    * 
* direction: char

Methoden:
* changeDir(dir: char)
    * Setter für snake.direction
    * n,e,s,w für Himmelsrichtungen
        * 180° Wende verbieten
        * nur eine Änderung pro Bewegungszyklus
* move(dir: char)
    * periodisch aufgerufen (wird schneller?)
    * unshift nächstes Feld in bewegungsrichtung auf body
    * wenn neues feld in body ist -> game Over
    * wenn neues Feld Nahrung ist -> field.eat()
    * sonst body.pop()
    * Zielkoordinaten immer Modulo ("weiche" Border)

## Mögliche Technologien
### HTML5 Canvas
* Canvas auf W3Schools:  
https://www.w3schools.com/html/html5_canvas.asp
* Canvas bei Mozilla:  
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
* Mozilla Tutorial für Breakout mit HTML5 und JS auf \<Canvas\>:  
    https://developer.mozilla.org/pt-BR/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
* Weiteres Tutorial:  
    https://www.russellgood.com/create-game-javascript-html5-canvas/