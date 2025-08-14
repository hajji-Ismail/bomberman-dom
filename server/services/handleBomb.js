import { broadCastRoom } from "./broadCast.js";
import { CheckVictory } from "./checkVictory.js";
import { ResetPositions } from "./setUpPlayers.js";

export function HandleBomb(player, room) {
  const row = Math.floor(player.position.y);
  const col = Math.floor(player.position.x);
  setTimeout(() => {
    let currentRow, currentCol;
    const getTile = (r, c) => room.map[r][c];

    const destroyBlock = (r, c) => {
      if (getTile(r, c) === 2) {
        room.map[r][c] = 0;
      }
    };

    const damagePlayer = (r, c) => {
      room.players.forEach((currentPlayer, idx) => {
        currentRow = Math.floor(currentPlayer.position.y);
        currentCol = Math.floor(currentPlayer.position.x);
        if ((currentRow === row && currentCol === col) || (r === currentRow && c === currentCol)) {
          currentPlayer.Lives--;

          if (currentPlayer.Lives <= 0) {
            currentPlayer.isLosed = true
            const win = CheckVictory(room)
            currentPlayer.stream.send(JSON.stringify({
              type: "result",
              result: "lose"
            }))
            if (win.length == 1) {
              win[0].stream.send(JSON.stringify({
                type: "result",
                result: "win"
              }))
              room.players = []
              room.available = true
              win[0].stream.close()
              return
            }
            broadCastRoom(room, {
              type: "newRoom",
              room
            })
            currentPlayer.stream.close()
            return
          }

          ResetPositions(room, currentPlayer, idx)

        }
      });
    };

    const placeFlames = (r, c) => {
      let oldTile = getTile(r, c);

      if (oldTile === 2 || oldTile === 10) {
        oldTile = 0;
      }
      if ([3, 4, 5].includes(oldTile)) {
        oldTile += 4;
      }

      if (Array.isArray(oldTile)) {
        oldTile = oldTile[0];
        room.map[r][c] = [oldTile, 10];
      } else {
        room.map[r][c] = 10;
      }

      // Restore old tile after 1 second
      setTimeout(() => {
        if ([11, 12, 13, 14].includes(oldTile)) {
          room.map[r][c] = [oldTile];
        } else {
          room.map[r][c] = oldTile;
        }
        if (Array.isArray(room.map[row][col])) {
          room.map[row][col] = [room.map[row][col][0]];
        } else {
          room.map[row][col] = 0;
        }
        broadCastRoom(room, {
          type: "newRoom",
          room
        })
      }, 1000);
    };

    const directions = [[], [], [], []];

    for (let index = 1; index <= player.Flames; index++) {
      directions[0].push({ r: row - index, c: col }); // up
      directions[1].push({ r: row + index, c: col }); // down
      directions[2].push({ r: row, c: col - index }); // left
      directions[3].push({ r: row, c: col + index }); // right
    }


    placeFlames(row, col);

    directions.forEach((direction) => {
      for (const { r, c } of direction) {
        const tile = getTile(r, c);

        if (tile === 1) break;
        if ([2, 3, 4, 5].includes(tile)) {
          placeFlames(r, c);
          destroyBlock(r, c);
          break;
        }
        placeFlames(r, c);
        destroyBlock(r, c);
        damagePlayer(r, c);
      }
    });


    broadCastRoom(room, {
      type: "placeBomb",
      player,
      room,
      class: "explosion",
      isExplosion: true
    });

    player.Bombstries++;
  }, 3000);
}

