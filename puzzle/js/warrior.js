const PLAYER_MOVE_SPEED = 5;

function Warrior() {
    this.x = 75;
    this.y = 75;
    this.pic = "";
    this.name = "Unnamed warrior";

    this.keyHeld_Up = false;
    this.keyHeld_Down = false;
    this.keyHeld_Left = false;
    this.keyHeld_Right = false;

    this.setupInput = function (up, right, down, left) {
        this.controlKeyUp = up;
        this.controlKeyRight = right;
        this.controlKeyDown = down;
        this.controlKeyLeft = left;
    };

    this.reset = function (image, warriorName) {
        this.name = warriorName;
        this.pic = image;

        this.keys = 0;

        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == TILE_PLAYERSTART) {
                    worldGrid[arrayIndex] = TILE_GROUND;
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                }
            }
        }
    };

    this.move = function ()  {
        var previousX = this.x;
        var previousY = this.y;

        if (this.keyHeld_Up) {
            this.y -= PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_Down) {
            this.y += PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_Left) {
            this.x -= PLAYER_MOVE_SPEED;
        }
        if (this.keyHeld_Right) {
            this.x += PLAYER_MOVE_SPEED;
        }

        var warriorWorldCol = Math.floor(this.x / WORLD_W);
        var warriorWorldRow = Math.floor(this.y / WORLD_H);

        if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
            warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
            var tile = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
            var arrayIndex = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

            if (tile == TILE_KEY) {
                worldGrid[arrayIndex] = TILE_GROUND;
                this.keys++;
            } else if (tile == TILE_DOOR && this.keys > 0) {
                worldGrid[arrayIndex] = TILE_GROUND;
                this.keys--;
            } else if (tile == TILE_GOAL) {
                loadLevel();
            } else if (tile != TILE_GROUND) {
                this.x = previousX;
                this.y = previousY;
            }
        }
    };

    this.draw = function () {
        drawBitmapCenteredWithRotation(this.pic, this.x, this.y, this.ang);
    };
}
