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

function clearStage()
{
    while (app.stage.children[0]) 
    { 
        app.stage.removeChild(app.stage.children[0]); 
    }
}

function buildWinnerScreen()
{
    let winnerText = new PIXI.Text('Congratuations! You won!\n' + (gameInstance.getMilliSec() / 1000.0).toString() + " seconds", {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xFFFFFF,
        align: 'center',
    });

    winnerText.anchor.set(0.5, 0.5);
    winnerText.x = 1280/2;
    winnerText.y = 720/4;

    /*let backButtonTex = PIXI.Texture.from('images/backBtn.png');
    let backButton = new PIXI.Sprite(backButtonTex);

    backButton.buttonMode = true;
    backButton.anchor.set(0.5);
    backButton.x = (1280 * 1.25)/8;
    backButton.y = 600;

    // make the button interactive...
    backButton.eventMode = 'static';
    backButton.on('pointerdown', (event) => {
        clearStage();
        buildMenuGUI();
    });*/

    app.stage.addChild(winnerText);
    //app.stage.addChild(backButton);
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

var tileCardIDs;
var tileSet;

function buildGame(level, width, height)
{
    tileSet = new Array(width * height);
    tileCardIDs = new Array(width * height)
    let uniqueCards = (width * height) / 2;
    //let numCards = 26;
    let offset = Math.floor(Math.random() * (53 - uniqueCards));
    // set up and shuffle cards
    for (let i = 0; i < uniqueCards; i++)
    {
        tileCardIDs[2*i] = i + offset;
        tileCardIDs[(2*i)+1] = i + offset;
    }
    shuffledCards(tileCardIDs);
    
    for (let i = 0; i < width; i++)
    {
        for (let j = 0; j < height; j++)
        {
            console.log((i*height) + j);
            tileSet[(i*height) + j] = new tiles(tileCardIDs[(i*height) + j], new PIXI.Sprite(cardTextures[53]));

            // make the card interactive...
            tileSet[(i*height) + j].sprite.buttonMode = true;

            // card's translation properties
            tileSet[(i*height) + j].sprite.anchor.set(0.5);
            tileSet[(i*height) + j].sprite.x = 64 + (96 * i);
            tileSet[(i*height) + j].sprite.y = 72 + (144 * j);

            // make the card do something if clicked on
            tileSet[(i*height) + j].sprite.eventMode = 'static';
            tileSet[(i*height) + j].sprite.on('pointerdown', (event) => {
                if (tileSet[(i*height) + j].canBeSelected === true && canSelect === true) // check if cards can be selected
                {
                    
                    if (gameInstance.cardsHeld === null) // no cards held
                    {
                        console.log(tileSet[(i*height) + j].id);
                        gameInstance.cardsHeld = tileSet[(i*height) + j];
                        
                        gameInstance.cardsHeld.changeTexture(cardTextures[gameInstance.cardsHeld.id]); 
                        gameInstance.cardsHeld.disableSelect(); // prevent button from being interacted with
                    }
                    else
                    {
                        
                        tileSet[(i*height) + j].changeTexture(cardTextures[tileSet[(i*height) + j].id]);
                        console.log(tileSet[(i*height) + j].id.toString() + " " + gameInstance.cardsHeld.id.toString());
                        
                        canSelect = false; // prevents player from clicking on cards
                        setTimeout(function()
                        {
                            if (gameInstance.cardsHeld.id === tileSet[(i*height) + j].id)
                            {
                                gameInstance.cardsHeld = null; // make cards selectable again
                                gameInstance.cardsMatched += 2;
                                tileSet[(i*height) + j].disableSelect();

                                if (gameInstance.cardsMatched >= uniqueCards * 2)
                                {
                                    gameInstance.endTimer();
                                    console.log("GG YOU WIN EZ!");
                                    console.log((gameInstance.getMilliSec() / 1000.0).toString() + " seconds");
                                    clearStage();
                                    buildWinnerScreen();
                                }
                                
                                canSelect = true;
                            }
                            else
                            {
                                gameInstance.cardsHeld.enableSelect(); // make the previously held card selectable again
                        
                                gameInstance.cardsHeld.changeTexture(cardTextures[53]);
                                tileSet[(i*height) + j].changeTexture(cardTextures[53]);
            
                                gameInstance.cardsHeld = null; // make cards selectable again
                                canSelect = true;
                            }

                        },
                        2000
                        );

                    }
                }

            });
            app.stage.addChild(tileSet[(i*height) + j].sprite);
        }
    }
}

var canSelect = true; // allows the player to select cards
buildGame(0, 4, 4);
var gameInstance = new Game();


document.body.appendChild(app.view);

// calls every frame
app.ticker.add(function() {

});