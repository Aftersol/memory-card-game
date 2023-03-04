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
    timeEnded;
    cardsHeld;
    cardsMatched;

    startTimer()
    {
        this.timeStarted = Date.now();
    }

    endTimer()
    {
        this.timeEnded = Date.now();
    }

    getMilliSec()
    {
        return this.timeEnded - this.timeStarted;
    }

    constructor() {
        startTimer();
        this.cardsHeld = null;
        this.cardsMatched = 0;
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
var tileCardIDs = new Array(52);
var tileSet = new Array(52);

/* PIXI app starts here */

const Application = PIXI.Application;

const app = new Application({
    width: 1280,
    height: 720
});


var cardTextures = new Array(54);
for (let i = 0; i < 54; i++)
{
    cardTextures[i] = PIXI.Texture.from(('images/cards/card_' + i.toString() + '.png'));
}
for (let i = 0; i < 52/2; i++)
{
    tileCardIDs[2*i] = i;
    tileCardIDs[(2*i)+1] = i;
}
shuffledCards(tileCardIDs);

var canSelect = true;
document.body.appendChild(app.view);
var gameInstance = new Game();
for (let i = 0; i < 13; i++)
{
    for (let j = 0; j < 4; j++)
    {
        //console.log((i*4) + j);
        tileSet[(i*4) + j] = new tiles(tileCardIDs[(4 * i) + j], new PIXI.Sprite(cardTextures[53]));
        // make the button interactive...
        tileSet[(i*4) + j].sprite.buttonMode = true;
        tileSet[(i*4) + j].sprite.anchor.set(0.5);
        tileSet[(i*4) + j].sprite.x = 72 + (96 * i);
        tileSet[(i*4) + j].sprite.y = 72 + (144 * j);

        tileSet[(i*4) + j].sprite.eventMode = 'static';
        tileSet[(i*4) + j].sprite.on('pointerdown', (event) => {
            if (tileSet[(i*4) + j].canBeSelected === true && canSelect === true) // check if cards can be selected
            {
                
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
                        if (gameInstance.cardsHeld.id === tileSet[(i*4) + j].id)
                        {
                            gameInstance.cardsHeld = null; // make cards selectable again
                            canSelect = true;
                            gameInstance.cardsMatched += 2;
                            if (gameInstance.cardsMatched >= 52)
                            {
                                gameInstance.endTimer();
                                console.log("GG YOU WIN EZ!");
                                console.log((gameInstance.getMilliSec() / 1000.0).toString() + " seconds");
                            }
                        }
                        else
                        {
                            gameInstance.cardsHeld.enableSelect();
                    
                            gameInstance.cardsHeld.changeTexture(cardTextures[53]);
                            tileSet[(i*4) + j].changeTexture(cardTextures[53]);
        
                            gameInstance.cardsHeld = null; // make cards selectable again
                            canSelect = true;
                        }

                    },
                    2000
                    );

                }
            }

        });
        app.stage.addChild(tileSet[(i*4) + j].sprite);
    }
}

// calls every frame
app.ticker.add(function() {

});