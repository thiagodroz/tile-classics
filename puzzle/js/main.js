var canvas, canvasContext;

var player1 = new Warrior();

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorText("LOADING", canvas.width / 2, canvas.height / 2);

    loadImages();
};

function imagesLoaded() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    loadLevel(levelList[0]);
}

function loadLevel(level) {
    worldGrid = level.slice();
    player1.reset(blueWarriorPic, "Blue Storm");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    player1.move();
}

function drawAll() {
    drawWorlds();
    player1.draw();
}