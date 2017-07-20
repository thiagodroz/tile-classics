const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;

var levelList = [levelOne];
var currentLevel = 0;
var worldGrid = [];

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

function tileTypeHasTransparency(tile) {
    return (tile == TILE_DOOR ||
            tile == TILE_GOAL ||
            tile == TILE_KEY);
}

function returnTileTypeAtColRow(col, row) {
    if(col >= 0 && col < WORLD_COLS &&
        row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return TILE_WALL;
    }
}

function rowColToArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function drawWorlds() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
            var tileKind = worldGrid[arrayIndex];
            if (tileTypeHasTransparency(tileKind)) {
                canvasContext.drawImage(worldPics[TILE_GROUND], drawTileX, drawTileY);
            }
            var useImg = worldPics[tileKind];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += WORLD_W;
            arrayIndex++;
        }
        drawTileY += WORLD_H;
        drawTileX = 0;
    }
}