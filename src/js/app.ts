
import GridNode from "./gridnode";

class SnakeGame {
    height: number;
    width: number;
    scaledHeight:number;
    scaledWIdth: number;
    snakeLength: number;
    dead: boolean;
    nodes: GridNode[];
    food: GridNode;
    snakeHead: GridNode;
    prevousPositions: GridNode[];
    currentKey: string;
    grid: HTMLElement;


    constructor() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.scaledHeight = null;
        this.scaledWIdth = null;
        this.grid = document.querySelector(".grid");
        this.snakeHead = null;
        this.nodes = [];
        this.dead = false;
        this.snakeLength = 1;
        this.prevousPositions = [];
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
        const loop = setInterval(() => {
             if (this.dead) {
                 clearInterval(loop)
                this.resetGame();

            }
            this.moveSnake(this.currentKey);
            this.detectFoodCollision();
            console.log(this.dead)

        }, 50)

    }

    initSnake() {
        const snakeStart =  this.nodes[Math.floor(Math.random()*this.nodes.length)];
        snakeStart.nodeType = "snake";
        this.snakeHead = snakeStart;
    }

    detectFoodCollision() {
        if (this.snakeHead === this.food) {
            this.increaseSnakeLength();
            this.createFood();
        }
    }

    detectSnakeCollision() {
        this.prevousPositions.forEach((e) => {
            if (e.id === this.snakeHead.id) {
                this.dead = true
            }
        })
    }

    detectWallCollision(newHead) {

        if (this.snakeHead.id % this.scaledWIdth == 0) {
            this.dead = true
        }
        if (!newHead && this.currentKey) {
            console.log("TOP DEAD")
            this.dead = true
        }
    }

    resetGame() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.scaledHeight = null;
        this.scaledWIdth = null;
        this.grid = document.querySelector(".grid");
        this.snakeHead = null;
        this.nodes = [];
        this.dead = false;
        this.snakeLength = 1;
        this.prevousPositions = [];
        this.food = null;
        this.currentKey = null;
        this.init();
    }

    increaseSnakeLength() {
        this.snakeLength++
    }

    // recursive function that checks if snake and food are the same
    // if not, sets food
    createFood() {
        const node: GridNode = this.nodes[Math.floor(Math.random()*this.nodes.length)];
        if (node === this.snakeHead) {
            this.createFood();
        }

        node.nodeType = "food"
        this.food = node
    }

    moveSnake(direction: string): void {
        const head: GridNode = this.snakeHead;
        let newHead: any = null;

        // move left (column wise)
        if (direction === "a" || direction === "ArrowLeft") {
            newHead = this.nodes.filter((node) => node.id === (head.id - 1))[0];
        }
        // move right (column wise)
        if (direction === "d" ||  direction === "ArrowRight") {
            newHead = this.nodes.filter((node) => node.id === (head.id + 1))[0];
        }
        // move up (row wise)
        if (direction === "w" || direction === "ArrowUp") {
            newHead = this.nodes.filter((node) => node.id === (head.id - this.scaledWIdth))[0];
        }
        // move down (row wise)
        if (direction === "s" || direction === "ArrowDown") {
            newHead = this.nodes.filter((node) => node.id === (head.id + this.scaledWIdth))[0];
        }
         this.detectSnakeCollision();
         this.detectWallCollision(newHead);
        // set node type
        newHead.nodeType = "snake";
        //creates the new head
        this.snakeHead = newHead;
        // get previous position
        const prev = this.nodes.filter(node => node.id === head.id)[0];
        // set node type to grid
        this.nodes[this.nodes.indexOf(prev)].nodeType = "grid";
        // reset all the previous positions
        this.prevousPositions.forEach((node) => {
            node.nodeType = "grid"
        });

        // add new head to the array keeping track of previous positions.
        this.prevousPositions.unshift(prev);
        // as soon as the lengths = pop the last element from the previous snake positions
        if (this.prevousPositions.length === this.snakeLength) {
            this.prevousPositions.pop();
        }
        // loop over and set types to snake
        this.prevousPositions.forEach((node) => {
            node.nodeType = "snake"
        });
    }
    // creates grid that can fit any size screen with absolute positioning
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