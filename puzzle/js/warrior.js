const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function Warrior() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.pic = "";
    this.name = "Unnamed warrior";

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.setupInput = function (up, right, down, left) {
        this.controlKeyUp = up;
        this.controlKeyRight = right;
        this.controlKeyDown = down;
        this.controlKeyLeft = left;
    };

    this.reset = function (image, warriorName) {
        this.name = warriorName;
        this.pic = image;
        this.speed = 0;

        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    this.ang = -Math.PI / 2;
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                }
            }
        }
    };

    this.move = function () {
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        warriorWorldHandling(this);
    };

    this.draw = function () {
        drawBitmapCenteredWithRotation(this.pic, this.x, this.y, this.ang);
    };
}
