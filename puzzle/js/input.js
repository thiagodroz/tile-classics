const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

var mouseX = 0;
var mouseY = 0;

function setupInput () {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    player1.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    player2.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(evt, car, setTo) {
    if (evt.keyCode == car.controlKeyLeft) {
        car.keyHeld_TurnLeft = setTo;
    }
    if (evt.keyCode == car.controlKeyRight) {
        car.keyHeld_TurnRight = setTo;
    }
    if (evt.keyCode == car.controlKeyUp) {
        car.keyHeld_Gas = setTo;
    }
    if (evt.keyCode == car.controlKeyDown) {
        car.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    keySet(evt, player1, true);
    keySet(evt, player2, true);

    evt.preventDefault();
}

function keyReleased(evt) {
    keySet(evt, player1, false);
    keySet(evt, player2, false);
}