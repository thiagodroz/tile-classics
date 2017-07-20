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
        { imgVar: blueWarriorPic, filePath: "./images/warrior.png" },

        { worldType: TILE_GROUND, filePath: "./images/tile_ground.png" },
        { worldType: TILE_WALL, filePath: "./images/tile_wall.png" },
        { worldType: TILE_GOAL, filePath: "./images/tile_goal.png" },
        { worldType: TILE_KEY, filePath: "./images/tile_key.png" },
        { worldType: TILE_DOOR, filePath: "./images/tile_door.png" }
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