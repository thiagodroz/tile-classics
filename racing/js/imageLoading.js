var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var carPic = document.createElement("img");
var goalPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");

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
        { imgVar: wallPic, filePath: "./images/track_wall.png" },
        { imgVar: goalPic, filePath: "./images/track_goal.png" },
        { imgVar: treePic, filePath: "./images/track_tree.png" },
        { imgVar: flagPic, filePath: "./images/track_flag.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].imgVar, imageList[i].filePath);
    }
}