const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;

var levelList = [levelOne];
var currentLevel = 0;
var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
    if(col >= 0 && col < WORLD_COLS &&
        row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return WORLD_WALL;
    }
}

function warriorWorldHandling(warrior) {
    var warriorWorldCol = Math.floor(warrior.x / WORLD_W);
    var warriorWorldRow = Math.floor(warrior.y / WORLD_H);

    if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
        warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
        var tile = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);

        if(tile == WORLD_GOAL) {
            currentLevel++;
            loadLevel(levelList[currentLevel]);
        } else if (tile != WORLD_ROAD) {
            warrior.x -= Math.cos(warrior.ang) * warrior.speed;
            warrior.y -= Math.sin(warrior.ang) * warrior.speed;

            warrior.speed *= -0.5;
        } // end of world found
    } // end of valid col and row
} // end of warriorWorldHandling func

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
            var useImg = worldPics[tileKind];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += WORLD_W;
            arrayIndex++;
        }
        drawTileY += WORLD_H;
        drawTileX = 0;
    }
}