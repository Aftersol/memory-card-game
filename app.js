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

function createMenu()
{

}

/* PIXI app starts here */

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

var button2 = new PIXI.Sprite(textureButton);

button2.buttonMode = true;
button2.anchor.set(0.5);
button2.x = 300;
button2.y = 300;

// make the button interactive...
button.eventMode = 'static';
button.on('pointerdown', (event) => {
    console.log('Hooray!\n')
});

// make the button interactive...
button2.eventMode = 'static';
button2.on('pointerdown', (event) => {
    console.log('Yay!\n')
});

app.stage.addChild(button);
app.stage.addChild(button2);

// calls every frame
app.ticker.add(function() {
    
});