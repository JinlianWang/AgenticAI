const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // 每个格子大小
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 9, y: 9}
];
let velocityX = 0;
let velocityY = 0;
let food = {x: 5, y: 5};
let tailLength = 1;
let score = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);

    // 设定移动速度，控制游戏帧率
    if (++count < 6) {
        return;
    }
    count = 0;

    // 更新蛇头位置
    snakeX += velocityX;
    snakeY += velocityY;

    // 边界检测
    if (snakeX < 0 || snakeX >= tileCount || snakeY < 0 || snakeY >= tileCount) {
        resetGame();
    }

    // 蛇身碰撞检测
    for (let part of snake) {
        if (part.x === snakeX && part.y === snakeY && tailLength > 1) {
            resetGame();
            return;
        }
    }

    snake.push({x: snakeX, y: snakeY});
    while (snake.length > tailLength) {
        snake.shift();
    }

    // 吃食物检测
    if (food.x === snakeX && food.y === snakeY) {
        tailLength++;
        score++;
        placeFood();
    }

    // 绘制游戏画面
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize-2, gridSize-2);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);

    // 分数显示
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('分数: ' + score, 10, canvas.height - 10);
}

function resetGame() {
    velocityX = 0;
    velocityY = 0;
    snake = [{x: 9, y: 9}];
    tailLength = 1;
    score = 0;
    snakeX = 9;
    snakeY = 9;
    placeFood();
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // 确保食物不在蛇身上
    for (let part of snake) {
        if (part.x === food.x && part.y === food.y) {
            placeFood();
        }
    }
}

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (velocityY === 1) break;
            velocityX = 0;
            velocityY = -1;
            break;
        case 'ArrowDown':
            if (velocityY === -1) break;
            velocityX = 0;
            velocityY = 1;
            break;
        case 'ArrowLeft':
            if (velocityX === 1) break;
            velocityX = -1;
            velocityY = 0;
            break;
        case 'ArrowRight':
            if (velocityX === -1) break;
            velocityX = 1;
            velocityY = 0;
            break;
    }
});

let count = 0;
let snakeX = 9;
let snakeY = 9;

resetGame();
gameLoop();