var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var carPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;

    if (picsToLoad == 0) {
        imagesLoaded();
    }
}

function beginLoadingImage(imgVar, filePath) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = filePath;
}

function loadImages() {
    var imageList = [
        { imgVar: carPic, filePath: "./images/player1car.png" },
        { imgVar: roadPic, filePath: "./images/track_road.png" },
        { imgVar: wallPic, filePath: "./images/track_wall.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].imgVar, imageList[i].filePath);
    }
}