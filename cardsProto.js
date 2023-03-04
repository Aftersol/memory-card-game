class tiles
{
    id; // id of the card
    sprite; // sprite of the card based on its ID
    canBeSelected; // whether card can be selected

    disableSelect()
    {
        this.canBeSelected = false; // make the card not be selectable
    }

    enableSelect()
    {
        this.canBeSelected = true; // make the card be selectable
    }

    changeTexture(newTexture)
    {
        this.sprite.texture = newTexture; // changes the texture for the card
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
    timeStarted; // time since game started
    timeEnded; // time game ended
    cardsHeld; // card currently being held
    cardsMatched; // how many cards were matched

    startTimer()
    {
        this.timeStarted = Date.now(); // get start time in milliseconds
    }

    endTimer()
    {
        this.timeEnded = Date.now(); // get end time in milliseconds
    }

    getMilliSec()
    {
        return this.timeEnded - this.timeStarted; // returns the difference between end and start times in milliseconds
    }

    constructor() {
        this.startTimer();
        this.cardsHeld = null;
        this.cardsMatched = 0;
    }
}

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

/* Start dummy code to be placed in app.js */

var cards = new Array(104);
function initalizeCards() {
    for (let i = 0; i < 52; i++) {
        cards[2*i] = i;
        cards[(2*i)+1] = i;
        
    }

    shuffledCards(cards);
}

/* End dummy code to be placed in app.js */

var tileCardIDs = new Array(52);
var tileSet = new Array(52);

/* PIXI app starts here */

const Application = PIXI.Application;

const app = new Application({
    width: 1280,
    height: 720
});

// Set up card textures

var cardTextures = new Array(54);
for (let i = 0; i < 54; i++)
{
    cardTextures[i] = PIXI.Texture.from(('images/cards/card_' + i.toString() + '.png'));
}

{
    let numCards = 26;
    let offset = Math.floor(Math.random() * (53 - numCards));
    // set up and shuffle cards
    for (let i = 0; i < numCards; i++)
    {
        tileCardIDs[2*i] = i + offset;
        tileCardIDs[(2*i)+1] = i + offset;
    }
    shuffledCards(tileCardIDs);
}

var canSelect = true; // allows the player to select cards

var gameInstance = new Game();
for (let i = 0; i < 13; i++)
{
    for (let j = 0; j < 4; j++)
    {
        //console.log((i*4) + j);
        tileSet[(i*4) + j] = new tiles(tileCardIDs[(4 * i) + j], new PIXI.Sprite(cardTextures[53]));

        // make the card interactive...
        tileSet[(i*4) + j].sprite.buttonMode = true;

        // card's translation properties
        tileSet[(i*4) + j].sprite.anchor.set(0.5);
        tileSet[(i*4) + j].sprite.x = 64 + (96 * i);
        tileSet[(i*4) + j].sprite.y = 72 + (144 * j);

        // make the card do something if clicked on
        tileSet[(i*4) + j].sprite.eventMode = 'static';
        tileSet[(i*4) + j].sprite.on('pointerdown', (event) => {
            if (tileSet[(i*4) + j].canBeSelected === true && canSelect === true) // check if cards can be selected
            {
                
                if (gameInstance.cardsHeld === null) // no cards held
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
                    
                    canSelect = false; // prevents player from clicking on cards
                    setTimeout(function()
                    {
                        if (gameInstance.cardsHeld.id === tileSet[(i*4) + j].id)
                        {
                            gameInstance.cardsHeld = null; // make cards selectable again
                            gameInstance.cardsMatched += 2;

                            if (gameInstance.cardsMatched >= 52)
                            {
                                gameInstance.endTimer();
                                console.log("GG YOU WIN EZ!");
                                console.log((gameInstance.getMilliSec() / 1000.0).toString() + " seconds");
                            }

                            canSelect = true;
                        }
                        else
                        {
                            gameInstance.cardsHeld.enableSelect(); // make the previously held card selectable again
                    
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

document.body.appendChild(app.view);

// calls every frame
app.ticker.add(function() {

});