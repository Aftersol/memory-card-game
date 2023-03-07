var soundManifest =
{
    click: new Audio('audio/click.mp3'),
    cardFlip: new Audio('audio/cardFlip.mp3'),
    match: new Audio('audio/match.mp3'),
    noMatch: new Audio('audio/noMatch.mp3'),
    victory: new Audio('audio/victory.mp3')
};

var levelTiles = 
{
    x: [4,8,13],
    y: [4,4,4]
}

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

function playClickSound()
{
    soundManifest.click.pause();
    soundManifest.click = new Audio('audio/click.mp3');
    soundManifest.click.play();
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


function buildMenuGUI()
{
    let titleTex = PIXI.Texture.from('images/title.png');
    let playButtonTex = PIXI.Texture.from('images/playBtn.png');
    let howToPlayButtonTex = PIXI.Texture.from('images/howToPlayBtn.png');
    //let backCard64px = PIXI.Texture.from('images/back_card_64px.png');
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

    let px_128_0 = new PIXI.Sprite(backCard128px);
    
    px_128_0.anchor.set(0.5);
    px_128_0.angle = -45;
    px_128_0.x = (1280 * 1)/4;
    px_128_0.y = 128;


    let px_128_1 = new PIXI.Sprite(backCard128px);
    
    px_128_1.anchor.set(0.5);
    px_128_1.angle = 45;
    px_128_1.x = (1280 * 3)/4;
    px_128_1.y = 128;

    // make the button interactive...
    playButton.eventMode = 'static';
    playButton.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildLevelSelect();
    });

    howToPlayButton.eventMode = 'static';
    howToPlayButton.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildHowToGUI();
    });

    app.stage.addChild(px_128_0);
    app.stage.addChild(px_128_1);
   

    app.stage.addChild(titleImg);
    app.stage.addChild(playButton);
    app.stage.addChild(howToPlayButton);

}

function buildHowToGUI()
{   
    let backButtonTex = PIXI.Texture.from('images/backBtn.png');
    let backButton = new PIXI.Sprite(backButtonTex);

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
        playClickSound();
        clearStage();
        buildMenuGUI();
    });

    app.stage.addChild(howToPic);
    app.stage.addChild(backButton);
}

function buildLevelSelect()
{
    let level1Btn = new PIXI.Sprite(cardTextures[1]);
    let level2Btn = new PIXI.Sprite(cardTextures[39]);
    let level3Btn = new PIXI.Sprite(cardTextures[52]);

    let backButtonTex = PIXI.Texture.from('images/backBtn.png');
    let backButton = new PIXI.Sprite(backButtonTex);

    let levelSelectTxt = new PIXI.Text('Select Level', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0xFFFFFF,
        align: 'center',
    });

    levelSelectTxt.anchor.set(0.5);
    levelSelectTxt.x = 1280/2;
    levelSelectTxt.y = 200;

    backButton.buttonMode = true;
    backButton.anchor.set(0.5);
    backButton.x = (1280 * 1.25)/8;
    backButton.y = 600;

    level1Btn.buttonMode = true;
    level1Btn.anchor.set(0.5);
    level1Btn.x = 1280/4;
    level1Btn.y = 720/2;

    level2Btn.buttonMode = true;
    level2Btn.anchor.set(0.5);
    level2Btn.x = 1280/2;
    level2Btn.y = 720/2;

    level3Btn.buttonMode = true;
    level3Btn.anchor.set(0.5);
    level3Btn.x = (1280 * 3)/4;
    level3Btn.y = 720/2;

    // make the button interactive...
    level1Btn.eventMode = 'static';
    level1Btn.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildGame(0, levelTiles.x[0], levelTiles.y[0]);
    });

    // make the button interactive...
    level2Btn.eventMode = 'static';
    level2Btn.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildGame(1, levelTiles.x[1], levelTiles.y[1]);
    });

    // make the button interactive...
    level3Btn.eventMode = 'static';
    level3Btn.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildGame(2, levelTiles.x[2], levelTiles.y[2]);
    });

    // make the button interactive...
    backButton.eventMode = 'static';
    backButton.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildMenuGUI();
    });

    app.stage.addChild(level1Btn);
    if (records.levelBeaten[0] === true)
    {
        app.stage.addChild(level2Btn);
    }
    if (records.levelBeaten[1] === true)
    {
        app.stage.addChild(level3Btn);
    }
    
    app.stage.addChild(backButton);
    app.stage.addChild(levelSelectTxt);

}

function buildWinnerScreen(level)
{
    let checkNewRecord = (gameInstance.getMilliSec() < records.time[level]);

    let winnerText = new PIXI.Text('Congratuations! You won!\n' + (gameInstance.getMilliSec() / 1000.0).toString() + ' seconds', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0xFFFFFF,
        align: 'center',
    });

    let recordsText = new PIXI.Text((checkNewRecord === true) ? "New Record!" : 'Can you win in under ' + (records.time[level] / 1000.0).toString() + ' seconds?', {
        fontFamily: 'Arial',
        fontSize: (checkNewRecord === true) ? 72 : 48,
        fill: 0xFFFFFF,
        align: 'center',
    });

    let backButtonTex = PIXI.Texture.from('images/backBtn.png');
    let backButton = new PIXI.Sprite(backButtonTex);

    let replayButtonTex = PIXI.Texture.from('images/replayBtn.png');
    let replayButton = new PIXI.Sprite(replayButtonTex);

    if (checkNewRecord)
    {
        records.time[level] = gameInstance.getMilliSec();
    }

    records.levelBeaten[level] = true;
    saveRecords(records);

    winnerText.anchor.set(0.5, 0.5);
    winnerText.x = 1280/2;
    winnerText.y = 720/4;

    recordsText.anchor.set(0.5, 0.5);
    recordsText.x = 1280/2;
    recordsText.y = 720*5/8;

    backButton.buttonMode = true;
    backButton.anchor.set(0.5);
    backButton.x = (1280 * 1.25)/8;
    backButton.y = 600;

    replayButton.buttonMode = true;
    replayButton.anchor.set(0.5);
    replayButton.x = (1280 * 6.75)/8;
    replayButton.y = 600;

    // make the button interactive...
    backButton.eventMode = 'static';
    backButton.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildMenuGUI();
    });

    // make the button interactive...
    replayButton.eventMode = 'static';
    replayButton.on('pointerdown', (event) => {
        playClickSound();
        clearStage();
        buildGame(level, levelTiles.x[level], levelTiles.y[level]);
    });

    app.stage.addChild(winnerText);
    app.stage.addChild(recordsText);
    app.stage.addChild(replayButton);
    app.stage.addChild(backButton);
}

function clearStage()
{
    while (app.stage.children[0]) 
    { 
        app.stage.removeChild(app.stage.children[0]); 
    }
}

function openCardTextures()
{
    for (let i = 0; i < 54; i++)
    {
        cardTextures[i] = PIXI.Texture.from(('images/cards/card_' + i.toString() + '.png'));
    }
}

var tileCardIDs;
var tileSet;

var canSelect = true; // allows the player to select cards

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
            //console.log((i*height) + j);
            tileSet[(i*height) + j] = new tiles(tileCardIDs[(i*height) + j], new PIXI.Sprite(cardTextures[53]));

            // make the card interactive...
            tileSet[(i*height) + j].sprite.buttonMode = true;

            // card's translation properties
            tileSet[(i*height) + j].sprite.anchor.set(0.5);
            tileSet[(i*height) + j].sprite.x = 64 + (96 * i);
            tileSet[(i*height) + j].sprite.y = 160 + (132 * j);

            // make the card do something if clicked on
            tileSet[(i*height) + j].sprite.eventMode = 'static';
            tileSet[(i*height) + j].sprite.on('pointerdown', (event) => {
                if (tileSet[(i*height) + j].canBeSelected === true && canSelect === true) // check if cards can be selected
                {
                    
                    if (gameInstance.cardsHeld === null) // no cards held
                    {
                        soundManifest.cardFlip.play();
                        //console.log(tileSet[(i*height) + j].id);
                        gameInstance.cardsHeld = tileSet[(i*height) + j];
                        
                        gameInstance.cardsHeld.changeTexture(cardTextures[gameInstance.cardsHeld.id]); 
                        gameInstance.cardsHeld.disableSelect(); // prevent button from being interacted with
                    }
                    else
                    {
                        
                        tileSet[(i*height) + j].changeTexture(cardTextures[tileSet[(i*height) + j].id]);
                        //console.log(tileSet[(i*height) + j].id.toString() + ' ' + gameInstance.cardsHeld.id.toString());
                        
                        canSelect = false; // prevents player from clicking on cards
                        if (gameInstance.cardsHeld.id != tileSet[(i*height) + j].id)
                        {
                            soundManifest.noMatch.play();
                        }
                        else
                        {
                            soundManifest.match.play();
                        }
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
                                    /*console.log("GG YOU WIN EZ!");
                                    console.log((gameInstance.getMilliSec() / 1000.0).toString() + ' seconds');*/
                                    soundManifest.victory.play();
                                    clearStage();
                                    buildWinnerScreen(level);
                                }
                                
                                canSelect = true;
                            }
                            else
                            {
                                soundManifest.cardFlip.play();
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
    
    gameInstance = new Game();
}

function resetRecords(myRecord)
{
    myRecord = {
        time: [100000, 300000, 500000],
        levelBeaten: [false, false, false]
    };

    saveRecords(myRecord);
}

function saveRecords(myRecord)
{
    let recordsJSON = JSON.stringify(myRecord);
    localStorage.setItem('memory_card_game_records', recordsJSON);
}

var cardTextures = new Array(54);

var records = {
    time: [100000, 300000, 500000],
    levelBeaten: [false, false, false]
};

if (localStorage.getItem('memory_card_game_records') === null)
{
    resetRecords(records);
}
else
{
    try
    {
        records = JSON.parse(localStorage.getItem('memory_card_game_records'));
    }
    catch(e)
    {
        console.log(e);
        resetRecords(records);
    }
    
}

/* PIXI app starts here */

const Application = PIXI.Application;

const app = new Application({
    width: 1280,
    height: 720
});

openCardTextures();

document.body.appendChild(app.view);

var gameInstance = new Game();

buildMenuGUI();

// calls every frame
app.ticker.add(function() {
    
});