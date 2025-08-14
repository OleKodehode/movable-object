const playArea = document.getElementById("play-area");
const playAreaRect = playArea.getBoundingClientRect();
// variables to get the maximum x / y position within the Play Area.
const xMax = Math.round(playAreaRect.width - 32);
const yMax = Math.round(playAreaRect.height - 32);

// setup of player
const player = document.createElement("div");
player.id = "player";
player.style.left = "50%";
player.style.top = "50%";

playArea.append(player);

// Keyboard input event listener
document.addEventListener("keydown", (e) => {
  e.preventDefault(); // just in case
  const moveAmount = 10; //amount in pixels to move
  // switch statement to handle keydown inputs
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
  const xClick = Math.round(e.clientX - playAreaRect.left);
  const yClick = Math.round(e.clientY - playAreaRect.top);

  xPos = round5(xClick) > xMax ? xMax : round5(xClick);
  yPos = round5(yClick) > yMax ? yMax : round5(yClick);
  updatePlayerPos(xPos, yPos);
});

function movePlayer(addY, addX) {
  let yPos = Number(player.style.top.replace("px", ""));
  let xPos = Number(player.style.left.replace("px", ""));

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

function updatePlayerPos(x, y) {
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
}
