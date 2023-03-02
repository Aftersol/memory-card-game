class tiles
{
    id;
    sprite;
    
    constructor(id, sprite)
    {
        this.id = id;
        this.sprite = sprite;
    }
}

class Game
{
    timeStarted;
    cardsHeld;
    constructor() {
        this.time = 0;
        this.cardsHeld = null;
    }
}

var cards = new Array(104);

function shuffledCards(items) {
    /* Shuffles cards using Sattolo's algorithm */
    let i = items.length;
    while (i > 1) {
        i--;
        let j = Math.floor(Math.random() * i);

        // swap cards
        let temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
}

function initalizeCards() {
    for (let i = 0; i < 52; i++) {
        cards[2*i] = i;
        cards[(2*i)+1] = i;
        
    }

    shuffledCards(cards);
}

var textureSprites = new Array(104);
var tileSet = new Array(52);

/* PIXI app starts here */

const Application = PIXI.Application;

const app = new Application({
    width: 1280,
    height: 720
});

var texture = PIXI.Texture.from('images/back_card_128px.png')
var tile = new tiles(0, new PIXI.Sprite(texture));


document.body.appendChild(app.view);

for (let i = 0; i < 12; i++)
{
    for (let j = 0; j < 4; j++)
    {
        console.log((i*4) + j);
        tileSet[(i*4) + j] = new tiles((4 * i) + j, new PIXI.Sprite(texture))
        // make the button interactive...
        tileSet[(i*4) + j].sprite.buttonMode = true;
        tileSet[(i*4) + j].sprite.anchor.set(0.5);
        tileSet[(i*4) + j].sprite.x = 72 + (96 * i);
        tileSet[(i*4) + j].sprite.y = 72 + (144 * j);

        tileSet[(i*4) + j].sprite.eventMode = 'static';
        tileSet[(i*4) + j].sprite.on('pointerdown', (event) => {
            console.log(tileSet[(i*4) + j].id);
        });
        app.stage.addChild(tileSet[(i*4) + j].sprite);
    }
}


// make the button interactive...
/*tile.sprite.buttonMode = true;
tile.sprite.anchor.set(0.5);
tile.sprite.x = (1280 * 1.25)/8;
tile.sprite.y = 600;

tile.sprite.eventMode = 'static';
tile.sprite.on('pointerdown', (event) => {
    console.log(tile.id);
});*/
//app.stage.addChild(tile.sprite);

// calls every frame
app.ticker.add(function() {
    
});