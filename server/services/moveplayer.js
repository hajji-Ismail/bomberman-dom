import { HandleBomb } from "./handleBomb.js";
import { broadCastRoom } from "./broadCast.js";
import { getPlayer, getRoom } from "./getData.js";

export function movePlayer(data = {}) {
  let room = getRoom(data.room.id);
  const map = room.map;

  const player = getPlayer(room.id, data.username);
  if (!player) {
    return;
  }
  let step = 0.02 + player.Speed / 128
  if (!player.isMoving) {
    player.isMoving = true;
    player.boostFrames = 3;
  }
  if (player.boostFrames > 0) {
    step += 0.015; // small boost
    player.boostFrames--;
  }

  const walkableCells = [0, 7, 8, 9, 11, 12, 13, 14];

  const earnAbility = (cellValue, y, x) => {
    switch (cellValue) {
      case 7:
        room.map[y][x] = 0;
        player.Bombs++;
        player.Bombstries++;
        break;
      case 8:
        room.map[y][x] = 0;
        player.Speed++;
        break;
      case 9:
        room.map[y][x] = 0;
        player.Flames++;
        break;
      default:
        break;
    }
  };

  const canMove = (cellul) => {
    return walkableCells.includes(Array.isArray(cellul) ? cellul[cellul.length - 1] : cellul);
  };

  const tryMove = (player, axis, step, signe, direction, room, map) => {
    let marginX = 0.15;
    let marginY = 0.25
    let targetX =
      axis === "x"
        ? Math.floor(player.position.x + signe * (step + marginX))
        : Math.floor(player.position.x);
    let targetY =
      axis === "y"
        ? Math.floor(player.position.y + signe * (step + marginY))
        : Math.floor(player.position.y);

    let checkCell = map[targetY][targetX];
    const bomb =   map[Math.floor(player.position.y)][Math.floor(Math.floor(player.position.x))]
    

    if (canMove(checkCell) ||bomb== 6 || (Array.isArray(bomb) && bomb.includes(6))) {

      earnAbility(checkCell, targetY, targetX);

      player.position[axis] += signe * step;
      player.position[axis + "step"] += signe * step;

      broadCastRoom(room, {
        type: "canMove",
        player,
        direction,
        newCLass: GenerateNewClass(player) + " player-" + direction,
        playerNumber: player.playerNumber,
        room: room,
      });
      return;
    }
  };

  let cellul;

  switch (data.action) {
    case " ": {
      if (player.Bombstries > 0) {
        cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x)]
        if (cellul === 6 || (Array.isArray(cellul) && cellul[1] === 6)) return
        player.Bombstries--
        Array.isArray(cellul) ? cellul.push(6) : map[Math.floor(player.position.y)][Math.floor(player.position.x)] = 6
        broadCastRoom(room, {
          type: "placeBomb",
          player,
          room: room
        })
        HandleBomb(player, room)
     

      }

      break;
    }
    case "ArrowRight":
      tryMove(player, "x", step, 1, "right", room, map);

      break;
    case "ArrowLeft":
      tryMove(player, "x", step, -1, "left", room, map);
      break;

    case "ArrowUp":
      tryMove(player, "y", step, -1, "top", room, map);

      break;
    case "ArrowDown":
      tryMove(player, "y", step, 1, "bottom", room, map);
      break;

    default:
      break;
  }
}

export function stopMoving(data = {}) {
  const room = getRoom(data.room.id);
  const player = getPlayer(room.id, data.username);
  if (
    ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(data.action)
  ) {
    broadCastRoom(room, {
      type: "stopMove",
      player,
      newCLass: GenerateNewClass(player),
    });
  }
}

function GenerateNewClass(player) {
  if (!player) {
    return;
  }
  let newCLass;
  switch (player.playerNumber) {
    case "player1":
      newCLass = "player char1";
      break;
    case "player2":
      newCLass = "player char2";
      break;
    case "player3":
      newCLass = "player char3";
      break;
    case "player4":
      newCLass = "player char4";
      break;
    default:
      break;
  }
  return newCLass;
}


