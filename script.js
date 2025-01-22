const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let snake = [{ x: 200, y: 200 }];
let food = { x: 300, y: 300 };
let dx = 20;
let dy = 0;
let score = 0;

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = `得分: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(drawSnakePart);
    drawFood();
    moveSnake();

    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        clearInterval(gameInterval);
        alert('游戏结束！');
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(gameInterval);
            alert('游戏结束！');
        }
    }
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

document.addEventListener('keydown', changeDirection);
let gameInterval = setInterval(draw, 100);
