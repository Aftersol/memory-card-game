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

    time;
    cardsHeld;
    constructor() {
        this.time = 0;
        this.cardsHeld = 0;
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

initalizeCards();
console.log(cards);

function buildMenuGUI()
{
    let titleTex = PIXI.Texture.from('images/title.png');
    let playButtonTex = PIXI.Texture.from('images/playBtn.png');
    let howToPlayButtonTex = PIXI.Texture.from('images/howToPlayBtn.png');
    let backCard64px = PIXI.Texture.from('images/back_card_64px.png');
    let backCard128px = PIXI.Texture.from('images/back_card_128px.png');
    
    let playButton = new PIXI.Sprite(playButtonTex);
    
    playButton.buttonMode = true;
    playButton.anchor.set(0.5);
    playButton.x = 1280/2;
    playButton.y = 450;
    
    let howToPlayButton = new PIXI.Sprite(howToPlayButtonTex);
    
    howToPlayButton.buttonMode = true;
    howToPlayButton.anchor.set(0.5);
    howToPlayButton.x = 1280/2;
    howToPlayButton.y = 584;
    
    let titleImg = new PIXI.Sprite(titleTex);
    
    titleImg.anchor.set(0.5);
    titleImg.x = 1280/2;
    titleImg.y = 128;

    let px_64 = new PIXI.Sprite(backCard64px);
    
    px_64.anchor.set(0.5);
    px_64.x = 1280/4;
    px_64.y = 128;

    let px_128 = new PIXI.Sprite(backCard128px);
    
    px_128.anchor.set(0.5);
    px_128.x = (1280 * 3)/4;
    px_128.y = 128;

    // make the button interactive...
    playButton.eventMode = 'static';
    playButton.on('pointerdown', (event) => {
        console.log('Hooray!\n');
    });

    howToPlayButton.eventMode = 'static';
    howToPlayButton.on('pointerdown', (event) => {
        
        clearStage();
        buildHowToGUI();
    });

    app.stage.addChild(titleImg);
    app.stage.addChild(playButton);
    app.stage.addChild(howToPlayButton);

    app.stage.addChild(px_64);
    app.stage.addChild(px_128);

}

function buildHowToGUI()
{   
    let backButtonTex = PIXI.Texture.from('images/backBtn.png');
    let backButton = new PIXI.Sprite(backButtonTex);

    // Temporary texture until we take gameplay screenshot
    let howToPicTex = PIXI.Texture.from('images/howToPic.png');
    let howToPic = new PIXI.Sprite(howToPicTex);

    backButton.buttonMode = true;
    backButton.anchor.set(0.5);
    backButton.x = (1280 * 1.25)/8;
    backButton.y = 600;

    howToPic.anchor.set(0.5);
    howToPic.x = 1280/2;
    howToPic.y = (720 * 1.5)/4;
    howToPic.height = 360;
    howToPic.width = howToPic.height * (16/9);

    // make the button interactive...
    backButton.eventMode = 'static';
    backButton.on('pointerdown', (event) => {
        clearStage();
        buildMenuGUI();
    });

    app.stage.addChild(howToPic);
    app.stage.addChild(backButton);
}

function clearStage()
{
    while (app.stage.children[0]) 
    { 
        app.stage.removeChild(app.stage.children[0]); 
    }
}

function buildGame()
{

}

/* PIXI app starts here */

const Application = PIXI.Application;

const app = new Application({
    width: 1280,
    height: 720
});

document.body.appendChild(app.view);

gameInstance = new Game();

buildMenuGUI();

// calls every frame
app.ticker.add(function() {
    
});