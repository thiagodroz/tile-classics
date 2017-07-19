var blueWarriorPic = document.createElement("img");
var worldPics = [];

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

function loadImageForWorldCode(worldCode, filePath) {
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], filePath);
}

function loadImages() {
    var imageList = [
        { imgVar: blueWarriorPic, filePath: "./images/player1warrior.png" },

        { worldType: WORLD_ROAD, filePath: "./images/world_road.png" },
        { worldType: WORLD_WALL, filePath: "./images/world_wall.png" },
        { worldType: WORLD_GOAL, filePath: "./images/world_goal.png" },
        { worldType: WORLD_TREE, filePath: "./images/world_tree.png" },
        { worldType: WORLD_FLAG, filePath: "./images/world_flag.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].imgVar != undefined) {
            beginLoadingImage(imageList[i].imgVar, imageList[i].filePath);
        } else {
            loadImageForWorldCode(imageList[i].worldType, imageList[i].filePath);
        }
    }
}