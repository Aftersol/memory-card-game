class position
{
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class player
{
    pos = position(x,y);
    holding;
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

class pizza
{
    topping;
    bakeTime;
}

class game
{
    score;
    constructor() {
        scrore = 0;
    }
}

const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500
});

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;
const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rectangle);

// calls every frame
app.ticker.add(function() {
    
});