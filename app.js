const playArea = document.getElementById("play-area");

const player = document.createElement("div");
player.id = "player";
player.style.left = "500px";
player.style.top = "500px";

playArea.append(player);

document.addEventListener("keydown", (e) => {
  e.preventDefault(); // just in case
  // switch statement to handle keydown inputs
  switch (e.key) {
    case "w":
    case "ArrowUp":
      movePlayer(-5, 0);
      break;

    case "s":
    case "ArrowDown":
      movePlayer(5, 0);
      break;

    case "a":
    case "ArrowLeft":
      movePlayer(0, -5);
      break;

    case "d":
    case "ArrowRight":
      movePlayer(0, 5);
      break;
  }
});

document.addEventListener("click", () => {
  console.log("click detected");
});

function movePlayer(addY, addX) {
  let yPos = Number(player.style.top.replace("px", ""));
  let xPos = Number(player.style.left.replace("px", ""));
  yPos = yPos <= 0 ? 0 : (yPos += addY);
  xPos = xPos <= 0 ? 0 : (xPos += addX);
  player.style.top = `${yPos}px`;
  player.style.left = `${xPos}px`;
}
