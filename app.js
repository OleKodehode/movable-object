const playArea = document.getElementById("play-area");
const playAreaRect = playArea.getBoundingClientRect();

const player = document.createElement("div");
player.id = "player";
player.style.left = "50px";
player.style.top = "50px";

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

playArea.addEventListener("click", (e) => {
  console.log(
    `Click detected at ${(e.clientX - playAreaRect.left).toFixed(0)} / ${(
      e.clientY - playAreaRect.top
    ).toFixed(0)}`
  );
});

function movePlayer(addY, addX) {
  let yPos = Number(player.style.top.replace("px", ""));
  let xPos = Number(player.style.left.replace("px", ""));
  const max_X = Math.round(playAreaRect.width - 32);
  const max_Y = Math.round(playAreaRect.height - 32);
  console.log(max_X, max_Y);
  if (yPos + addY > max_Y) {
    return;
  } else if (yPos + addY < 0) {
    return;
  }
  if (xPos + addX > max_X) {
    return;
  } else if (xPos + addX < 0) {
    return;
  }

  yPos += addY;
  xPos += addX;
  player.style.top = `${yPos}px`;
  player.style.left = `${xPos}px`;
}
