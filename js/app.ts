
import GridNode from "./gridnode";

class SnakeGame {
    height: number;
    width: number;
    scaledHeight:number;
    scaledWIdth: number;
    snakeLength: number;
    nodes: GridNode[];
    snake: GridNode[];
    food: GridNode;
    prevousPositions: GridNode[]
    currentKey: string;
    grid: HTMLElement;


    constructor() {
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.scaledHeight = null;
        this.scaledWIdth = null;
        this.grid = document.querySelector(".grid")
        this.snake = [];
        this.nodes = [];
        this.snakeLength = 0;
        this.prevousPositions = []
        this.food = null;
        this.currentKey = null;
        this.init();
    }

    init () {
        console.log('starting game')
        document.addEventListener("keydown", event => {
          this.currentKey = event.key
        });
        this.createGrid();
        this.createFood();
        this.initSnake();
        this.gameLoop();
    }



    gameLoop() {
        setInterval(() => {
            this.moveSnake(this.currentKey);
            this.detectFoodCollision();
            console.log(this.snake)
        }, 100)
    }
    
    initSnake() {
        const snakeStart =  this.nodes[Math.floor(Math.random()*this.nodes.length)];
        snakeStart.nodeType = "snake";
        this.snakeLength ++
        this.snake.push(snakeStart)
    }

    detectFoodCollision() {
        if (this.snake[0] === this.food) {
            this.increaseSnakeLength(this.food);
            this.createFood()
        }
    }

    increaseSnakeLength(node) {
        this.snake.push(node)
    }

    // recursive function that checks if snake and food are the same
    // if not, sets food
    createFood() {
        const node: GridNode = this.nodes[Math.floor(Math.random()*this.nodes.length)];
        if (node === this.snake[0]) {
            this.createFood();
        }

        node.nodeType = "food"
        this.food = node
    }

    moveSnake(direction: string): void {
        const head: GridNode = this.snake[0];
        let newHead: any = null;

        if (direction === "a") {
            newHead = this.nodes.filter((node) => node.id === (head.id - 1))[0];

        }
        if (direction === "d") {
            newHead = this.nodes.filter((node) => node.id === (head.id + 1))[0];
        }

        if (direction === "w") {
            newHead = this.nodes.filter((node) => node.id === (head.id - this.scaledWIdth))[0];
        }

        if (direction === "s") {
            newHead = this.nodes.filter((node) => node.id === (head.id + this.scaledWIdth))[0];

        }

        newHead.nodeType = "snake";
        this.snake.shift();
        this.snake.unshift(newHead);
        const prev = this.nodes.filter(node => node.id === head.id)[0]
        this.nodes[this.nodes.indexOf(prev)].nodeType = "grid"

        this.prevousPositions.forEach((node) => {
            node.nodeType = "grid"
        });
         this.prevousPositions.unshift(newHead);


        if (this.prevousPositions.length === this.snake.length) {
            this.prevousPositions.pop();
        }

        console.log(this.prevousPositions.length)

        this.prevousPositions.forEach((node) => {
            node.nodeType = "snake"
        })




    }

    createGrid() {
        const div = 30;
        const gridWidth = Math.round(this.width /div);
        const gridHeight = Math.round(this.height /div);
        this.scaledHeight = gridHeight;
        this.scaledWIdth = gridWidth;
        const area = gridHeight * gridWidth;
        let top = 0;
        let left = 0;

        for (let i = 1; i < area + 1; i++) {
            const gridCube: HTMLElement = document.createElement("div");
            gridCube.className = "grid__block";
            gridCube.setAttribute("style", `height: ${div}px; width:${div}px; top: ${top}px; left: ${left}px`);
            gridCube.setAttribute("data-id", `${i}`);
            const node = new GridNode(gridCube, i, "grid");
            this.nodes.push(node);

            left += div
            if (i % Math.round(gridWidth) == 0) {
                top += div;
                left = 0
            }
            this.grid.appendChild(gridCube);
        }



    }

}

new SnakeGame();