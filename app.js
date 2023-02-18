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

class order
{

}

class game
{
    score;
    timer;
    orders;
    ordersFulfilled;
    maxOrders;
    constructor() {
        this.scrore = 0;
        this.timer = 0;
        this.orders = Array<order>[];
        this.ordersFulfilled = 0
        this.maxOrders = 5;
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