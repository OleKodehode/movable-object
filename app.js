const playArea = document.getElementById("play-area");
const playAreaRect = playArea.getBoundingClientRect();
// variables to get the maximum x / y position within the Play Area.
const xMax = Math.round(playAreaRect.width - 32);
const yMax = Math.round(playAreaRect.height - 32);
const defaultTransitionTime = "0.1s";
let isMoving = false;

// setup of player
const player = document.createElement("div");
player.id = "player";
player.style.left = "250px"; // needs to be in units due to how click events are handled
player.style.top = "250px";

playArea.append(player);

// Keyboard input event listener
document.addEventListener("keydown", (e) => {
  e.preventDefault(); // just in case
  const moveAmount = 10; //amount in pixels to move
  // switch statement to handle keydown inputs
  // I think this would need to be redone to be able to normalize the input if there is 2 or more keys held down
  switch (e.key) {
    case "w":
    case "ArrowUp":
      movePlayer(-moveAmount, 0);
      break;

    case "s":
    case "ArrowDown":
      movePlayer(moveAmount, 0);
      break;

    case "a":
    case "ArrowLeft":
      movePlayer(0, -moveAmount);
      break;

    case "d":
    case "ArrowRight":
      movePlayer(0, moveAmount);
      break;
  }
});

// Mouse click input event listener
playArea.addEventListener("mousedown", (e) => {
  if (isMoving) return; // Disabling of clicking if the player is already moving

  const xClick = Math.round(e.clientX - playAreaRect.left);
  const yClick = Math.round(e.clientY - playAreaRect.top);

  const currentX = Number(player.style.left.replace("px", ""));
  const currentY = Number(player.style.top.replace("px", ""));

  // had to get some help to make this
  const speed = 500; // Approximately Pixels per second
  const distance = Math.hypot(xClick - currentX, yClick - currentY);
  const travelDuration = distance / speed;

  xPos = round5(xClick) > xMax ? xMax : round5(xClick);
  yPos = round5(yClick) > yMax ? yMax : round5(yClick);

  isMoving = true; // disable being able to click again before starting to move
  player.style.transitionDuration = `${travelDuration}s`;
  updatePlayerPos(xPos, yPos);

  // timeout to reset the transitionDuration and flipping isMoving.
  setTimeout(() => {
    player.style.transitionDuration = defaultTransitionTime;
    isMoving = false;
  }, travelDuration * 1000 - 100); // felt a bit sluggish without the - 100 at the end.
});

function movePlayer(addY, addX) {
  if (isMoving) return; // Flag set by clicking - Don't allow movement if already moving

  let yPos = Number(player.style.top.replace("px", ""));
  let xPos = Number(player.style.left.replace("px", ""));

  // Making sure the player can't move outside of the boundary.
  if (yPos + addY > yMax) {
    return;
  } else if (yPos + addY < 1) {
    return;
  }

  if (xPos + addX > xMax) {
    return;
  } else if (xPos + addX < 1) {
    return;
  }

  yPos += addY;
  xPos += addX;
  updatePlayerPos(xPos, yPos);
}

// Helper function to keep mouse clicks within the 5x5 "grid" the arrows/wasd sort of utilizes
function round5(numb) {
  return Math.ceil(numb / 5) * 5;
}

// Helper function to update the player location.
function updatePlayerPos(x, y) {
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
}
