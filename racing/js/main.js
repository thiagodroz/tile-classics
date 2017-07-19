var canvas, canvasContext;

var player1 = new Car();

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
    player1.reset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    player1.move();

    carTrackHandling(player1);
}

function drawAll() {
    drawTracks();
    player1.draw();
}