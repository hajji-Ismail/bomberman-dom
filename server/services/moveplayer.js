import { HandleBomb } from "./handleBomb.js";
import { sendMessages } from "./stream.js";

export function movePlayer(data = {}, rooms, stream) {
  let room = rooms.find((element) => element.id == data.room.id);
  const map = room.map;

  const player = room.players.find(
    (player) => player.username == data.username
  );

  let Xstep = 0.075 * player.Speed;
  let Ystep = 0.075 * player.Speed;
  const walkableCells = [0, 6, 7, 8, 9, 11, 12, 13, 14];

  const canMove = (cellul) =>
    walkableCells.includes(Array.isArray(cellul) ? cellul[0] : cellul);
  const tryMove = (player, axis, step, direction, room, map) => {
    let otherAxis = axis === "x" ? "y" : "x";

    let checkCell =
      axis === "x"
        ? map[Math.floor(player.position.y)][
            Math.floor(player.position.x + step)
          ]
        : map[Math.floor(player.position.y + step)][
            Math.floor(player.position.x)
          ];

    if (canMove(checkCell)) {
      player.position[axis] += step;
      player.position[axis + "step"] += step;

      BrodcastMove(room.players, {
        type: "canMove",
        player: getSafePlayer(player),
        direction,
        newCLass: GenerateNewClass(player) + " player-" + direction,
        playerNumber: player.playerNumber,
      });
      return;
    }

    // Handle small alignment movement
    if (player.position[otherAxis] % 1 < 0.2) {
      let checkAligned =
        axis === "x"
          ? map[Math.floor(player.position.y) - 1][
              Math.floor(player.position.x + step)
            ]
          : map[Math.floor(player.position.y + step)][
              Math.floor(player.position.x) - 1
            ];
      let checkcorner =
        axis == "x"
          ? map[Math.floor(player.position.y) - 1][
              Math.floor(player.position.x)
            ]
          : map[Math.floor(player.position.y)][
              Math.floor(player.position.x) - 1
            ];

      if (canMove(checkAligned) && canMove(checkcorner)) {
        let oldVal = player.position[otherAxis];
        player.position[axis] += step;
        player.position[axis + "step"] += step;
        player.position[otherAxis] = Math.floor(player.position[otherAxis]);
        player.position[otherAxis + "step"] -= oldVal - Math.floor(oldVal);

        BrodcastMove(room.players, {
          type: "canMove",
          player: getSafePlayer(player),
          direction,
          newCLass: GenerateNewClass(player) + " player-" + direction,
          playerNumber: player.playerNumber,
        });
      }
    } else if (player.position[otherAxis] % 1 > 0.8) {
      let checkAligned =
        axis === "x"
          ? map[Math.ceil(player.position.y)][
              Math.floor(player.position.x + step)
            ]
          : map[Math.floor(player.position.y + step)][
              Math.ceil(player.position.x)
            ];
      let checkcorner =
        axis == "x"
          ? map[Math.ceil(player.position.y)][Math.floor(player.position.x)]
          : map[Math.floor(player.position.y)][Math.ceil(player.position.x)];

      if (canMove(checkAligned) && canMove(checkcorner)) {
        let oldVal = player.position[otherAxis];
        player.position[axis + "step"] += step;
        player.position[otherAxis] = Math.ceil(player.position[otherAxis]);
        player.position[otherAxis + "step"] +=
          Math.ceil(player.position[otherAxis]) - oldVal;

        BrodcastMove(room.players, {
          type: "canMove",
          player: getSafePlayer(player),
          direction,
          newCLass: GenerateNewClass(player) + " player-" + direction,
          playerNumber: player.playerNumber,
        });
      }
    }
  };

  let cellul;

  switch (data.action) {
    case " ": {
      if (player.Bombs > 0) {
        player.Bombs--;
        cellul =
          map[Math.floor(player.position.y)][Math.floor(player.position.x)];
        Array.isArray(cellul)
          ? cellul.push(6)
          : (map[Math.floor(player.position.y)][
              Math.floor(player.position.x)
            ] = 6);
        sendMessages(stream, {
          type: "placeBomb",
          player: getSafePlayer(player),
          room: room,
        });
        console.table(map);
        
        HandleBomb(stream, player, room, player.position.y, player.position.x);
      }
      break;
    }
    case "ArrowRight":
      tryMove(player, "x", Xstep, "right", room, map);

      break;
    case "ArrowLeft":
      tryMove(player, "x", -Xstep, "left", room, map);

      break;
    case "ArrowUp":
      tryMove(player, "y", -Ystep, "top", room, map);

      break;
    case "ArrowDown":
      tryMove(player, "y", Ystep, "bottom", room, map);

      break;
    default:
      break;
  }
}

export function stopMoving(data = {}, rooms) {
  let room = rooms.find((element) => element.id == data.room.id);
  const player = room.players.find(
    (player) => player.username == data.username
  );
  switch (data.action) {
    case "ArrowRight":
      BrodcastMove(room.players, {
        type: "stopMove",
        player,
        newCLass: GenerateNewClass(player),
      });
      break;
    case "ArrowLeft":
      BrodcastMove(room.players, {
        type: "stopMove",
        player,
        newCLass: GenerateNewClass(player),
      });
      break;
    case "ArrowUp":
      BrodcastMove(room.players, {
        type: "stopMove",
        player,
        newCLass: GenerateNewClass(player),
      });
      break;
    case "ArrowDown":
      BrodcastMove(room.players, {
        type: "stopMove",
        player,
        newCLass: GenerateNewClass(player),
      });

      break;
    default:
      break;
  }
}

function GenerateNewClass(player) {
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

function BrodcastMove(players, data) {
  for (let player of players) {
    if (player.stream) {
      sendMessages(player.stream, data);
    }
  }
}

function getSafePlayer(player) {
  return {
    Bombs: player.Bombs,
    Flames: player.Flames,
    Speed: player.Speed,
    playerNumber: player.playerNumber,
    position: player.position,
    username: player.username,
  };
}
