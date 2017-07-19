const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX = 0;
var mouseY = 0;

function setupInput () {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    player1.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(evt, warrior, setTo) {
    if (evt.keyCode == warrior.controlKeyLeft) {
        warrior.keyHeld_TurnLeft = setTo;
    }
    if (evt.keyCode == warrior.controlKeyRight) {
        warrior.keyHeld_TurnRight = setTo;
    }
    if (evt.keyCode == warrior.controlKeyUp) {
        warrior.keyHeld_Gas = setTo;
    }
    if (evt.keyCode == warrior.controlKeyDown) {
        warrior.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    keySet(evt, player1, true);

    evt.preventDefault();
}

function keyReleased(evt) {
    keySet(evt, player1, false);
}