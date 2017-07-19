var carPic = document.createElement("img");
var trackPics = [

];

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

function loadImageForTrackCode(trackCode, filePath) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], filePath);
}

function loadImages() {
    var imageList = [
        { imgVar: carPic, filePath: "./images/player1car.png" },

        { trackType: TRACK_ROAD, filePath: "./images/track_road.png" },
        { trackType: TRACK_WALL, filePath: "./images/track_wall.png" },
        { trackType: TRACK_GOAL, filePath: "./images/track_goal.png" },
        { trackType: TRACK_TREE, filePath: "./images/track_tree.png" },
        { trackType: TRACK_FLAG, filePath: "./images/track_flag.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].imgVar != undefined) {
            beginLoadingImage(imageList[i].imgVar, imageList[i].filePath);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].filePath);
        }
    }
}