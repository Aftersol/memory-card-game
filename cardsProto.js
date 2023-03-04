class tiles
{
    id;
    sprite;
    canBeSelected;

    disableSelect()
    {
        this.canBeSelected = false;
    }

    enableSelect()
    {
        this.canBeSelected = true;
    }

    changeTexture(newTexture)
    {
        this.sprite.texture = newTexture;
    }

    constructor(id, sprite)
    {
        this.id = id;
        this.sprite = sprite;
        this.canBeSelected = true;
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

var backCardTexture = PIXI.Texture.from('images/back_card_128px.png');
var testFrontTexture = PIXI.Texture.from('images/Asset_15.png');
var tile = new tiles(0, new PIXI.Sprite(backCardTexture));
var cardTextures = new Array(54);
for (let i = 0; i < 54; i++)
{
    cardTextures[i] = PIXI.Texture.from(('images/cards/card_' + i.toString() + '.png'));
}

var canSelect = true;
document.body.appendChild(app.view);
var gameInstance = new Game();
for (let i = 0; i < 12; i++)
{
    for (let j = 0; j < 4; j++)
    {
        //console.log((i*4) + j);
        tileSet[(i*4) + j] = new tiles((4 * i) + j, new PIXI.Sprite(cardTextures[53]));
        // make the button interactive...
        tileSet[(i*4) + j].sprite.buttonMode = true;
        tileSet[(i*4) + j].sprite.anchor.set(0.5);
        tileSet[(i*4) + j].sprite.x = 72 + (96 * i);
        tileSet[(i*4) + j].sprite.y = 72 + (144 * j);

        tileSet[(i*4) + j].sprite.eventMode = 'static';
        tileSet[(i*4) + j].sprite.on('pointerdown', (event) => {
            if (tileSet[(i*4) + j].canBeSelected === true && canSelect === true) // check if cards can be selected
            {
                //console.log(tileSet[(i*4) + j].id);
                if (gameInstance.cardsHeld === null)
                {
                    console.log(tileSet[(i*4) + j].id);
                    gameInstance.cardsHeld = tileSet[(i*4) + j];
                    
                    gameInstance.cardsHeld.changeTexture(cardTextures[gameInstance.cardsHeld.id]); 
                    gameInstance.cardsHeld.disableSelect(); // prevent button from being interacted with
                }
                else
                {
                    tileSet[(i*4) + j].changeTexture(cardTextures[tileSet[(i*4) + j].id]);
                    console.log(tileSet[(i*4) + j].id.toString() + " " + gameInstance.cardsHeld.id.toString());
                    
                    canSelect = false;
                    setTimeout(function()
                    {
                        gameInstance.cardsHeld.enableSelect();
                    
                        gameInstance.cardsHeld.changeTexture(cardTextures[53]);
                        tileSet[(i*4) + j].changeTexture(cardTextures[53]);
    
                        gameInstance.cardsHeld = null; // make cards selectable again
                        canSelect = true;
                    },
                    2000
                    );

                }
            }

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