class Position
{
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player
{
    pos = Position(x,y);
    holding;
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    move(x, y)
    {
        this.pos.x += x;
        this.pos.y += y;
    }
}

class Pizza
{
    topping;
    bakeTime;
    isBurned;

    burnPizza()
    {
        this.isBurned = true;
    }

    constructor()
    {
        this.isBurned = false;
    }
}

class Oven
{
    pizza;

    set pizza(pizza)
    {
        this.pizza = pizza;
    }

    get pizza()
    {
        return this.pizza;
    }
}

class Order
{
    pizza;
    drink;

    constructor(pizza, hasDrink)
    {
        this.pizza = pizza;
        this.drink = hasDrink;
    }
}

class Game
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