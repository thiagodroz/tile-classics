const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var levelList = [levelOne, slamZone, theArena];
var currentLevel = 0;
var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord];
    } else {
        return TRACK_WALL;
    }
}

function carTrackHandling(car) {
    var carTrackCol = Math.floor(car.x / TRACK_W);
    var carTrackRow = Math.floor(car.y / TRACK_H);

    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
        var tile = returnTileTypeAtColRow(carTrackCol, carTrackRow);

        if(tile == TRACK_GOAL) {
            currentLevel++;
            loadLevel(levelList[currentLevel]);
        } else if (tile != TRACK_ROAD) {
            car.x -= Math.cos(car.ang) * car.speed;
            car.y -= Math.sin(car.ang) * car.speed;

            car.speed *= -0.5;
        } // end of track found
    } // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var tileKind = trackGrid[arrayIndex];
            var useImg = trackPics[tileKind];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += TRACK_W;
            arrayIndex++;
        }
        drawTileY += TRACK_H;
        drawTileX = 0;
    }
}