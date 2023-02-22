states = ["menu", "game", "score"];

class Card
{
    #type; // card type

    get type()
    {
        return this.type;
    }

    constructor(type)
    {
        this.type = type;
    }
}


class tileSet
{
    tiles;

    constructor(x, y)
    {
        tiles = Array(x);
        for (var i = 0; i < x; i++)
        {
            tiles[i] = Array(y);
        }
    }

}

class Game
{

    score;

    constructor() {
        this.score = 0;

    }
}

function setState(newGameState)
{
    return newGameState;
}

const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500
});

document.body.appendChild(app.view);

gameInstance = new Game();

state = "menu"; // would have used enum but there is no enum in JavaScript

const Graphics = PIXI.Graphics;
const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.drawRect(200, 200, 100, 120)
.endFill();

var textureButton = PIXI.Texture.from('https://dl.dropboxusercontent.com/s/mi2cibdajml8qj9/arrow_wait.png?dl=0');
var button = new PIXI.Sprite(textureButton);

button.buttonMode = true;
button.anchor.set(0.5);
button.x = 200;
button.y = 200;

// make the button interactive...
button.eventMode = 'static';
button.on('pointerdown', (event) => {
    console.log('Yay!\n')
});
function createMenu()
{

}

app.stage.addChild(button);

// calls every frame
app.ticker.add(function() {
    
});