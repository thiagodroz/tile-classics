var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLUMNS = 10;
const BRICK_ROWS = 10;

var brickGrid = new Array(BRICK_COLUMNS * BRICK_COLUMNS);
var bricksLeft = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 20;
var paddleX = 400;

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

function brickReset() {
    bricksLeft = 0;
    var i;
    for (i=0; i < 3 * BRICK_COLUMNS; i++) {
        brickGrid[i] = false;
    }
    for (; i < BRICK_COLUMNS * BRICK_COLUMNS; i++) {
        brickGrid[i] = true;
        bricksLeft++;
    }
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePosition);

    brickReset();
    resetBall();
};

function updateAll() {
    moveAll();
    drawAll();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0 && ballSpeedX < 0.0) { //left
        ballSpeedX *= -1;
    }

    if (ballX > canvas.width && ballSpeedX > 0.0) { //right
        ballSpeedX *= -1;
    }

    if (ballY < 0 && ballSpeedY < 0.0) { //top
        ballSpeedY *= -1;
    }

    if (ballY > canvas.height) { //bottom
        resetBall();
        brickReset();
    }
}

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLUMNS &&
        row >= 0 && row < BRICK_ROWS) {
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}


function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_WIDTH);
    var ballBrickRow = Math.floor(ballY / BRICK_HEIGHT);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLUMNS &&
        ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
        if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;

            var previousBallX = ballX - ballSpeedX;
            var previousBallY = ballY - ballSpeedY;
            var previousBrickCol = Math.floor(previousBallX / BRICK_WIDTH);
            var previousBrickRow = Math.floor(previousBallY / BRICK_HEIGHT);

            var bothTestsFailed = true;

            if (previousBrickCol !== ballBrickCol) {
                if (isBrickAtColRow(previousBrickCol, previousBrickRow) === false) {
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if (previousBrickRow !== ballBrickRow) {
                if (isBrickAtColRow(previousBrickCol, previousBrickRow) === false) {
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if (bothTestsFailed) {
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        }
    }
}

function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if (ballY > paddleTopEdgeY && //below the top of paddle
        ballY < paddleBottomEdgeY && //above bottom of paddle
        ballX > paddleLeftEdgeX && //right of the left side of paddle
        ballX < paddleRightEdgeX) { //left of the right side of paddle
        ballSpeedY *= -1;

        var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;

        ballSpeedX = ballDistFromPaddleCenterX * 0.35;

        if (bricksLeft === 0) {
            brickReset();
        }
    }
}

function moveAll() {
    ballMove();

    ballBrickHandling();

    ballPaddleHandling()
}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLUMNS * row;
}

function drawBricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < BRICK_COLUMNS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if (brickGrid[arrayIndex]) {
                colorRect(BRICK_WIDTH * eachCol,
                    BRICK_HEIGHT * eachRow,
                    BRICK_WIDTH - BRICK_GAP,
                    BRICK_HEIGHT - BRICK_GAP,
                    'blue');
            }
        }
    }
}

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    colorCirc(ballX, ballY, 10, 'white');

    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE,
        PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

    drawBricks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCirc(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}