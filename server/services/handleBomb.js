import { broadCastRoom } from "./broadCast.js";

export function HandleBomb(player, room) {
  const row = Math.floor(player.position.y);
  const col = Math.floor(player.position.x);
  setTimeout(() => {
    const getTile = (r, c) => room.map[r][c];

    const destroyBlock = (r, c) => {
      if (getTile(r, c) === 2) {
        room.map[r][c] = 0;
      }
    };

    const damagePlayer = (r, c) => {
      if ([3, 4, 5].includes(getTile(r, c))) {
        room.map[r][c] += 4;
      }
    };
    const placeFlames = (r, c) => {
      let oldTile = getTile(r, c);
      if (oldTile == 2) {
        oldTile = 0;
      }
      if ([3, 4, 5].includes(oldTile)) {
        oldTile += 4;
      }

      room.map[r][c] = 10;

      setTimeout(() => {
        room.map[r][c] = oldTile;
        console.table(room.map);
      }, 1000);
    };

    const directions = [[], [], [], []];

    // Fill each direction until flames reach limit
    for (let index = 1; index <= player.Flames; index++) {
      directions[0].push({ r: row - index, c: col }); // up
      directions[1].push({ r: row + index, c: col }); // down
      directions[2].push({ r: row, c: col - index }); // left
      directions[3].push({ r: row, c: col + index }); // right
    }

    // Include the bomb’s own tile

    destroyBlock(row, col);
    damagePlayer(row, col);

    // Loop through each direction
    directions.forEach((direction) => {
      for (const { r, c } of direction) {
        const tile = getTile(r, c);

        if (tile === 1) break; // stop at solid wall
        placeFlames(r, c);
        destroyBlock(r, c);
        damagePlayer(r, c);
      }
    });

    if (Array.isArray(room.map[row][col])) {
      room.map[row][col] = [11];
    } else {
      room.map[row][col] = 0;
    }
    placeFlames(row, col);
    broadCastRoom(room, {
      type: "placeBomb",
      player,
      room,
      class: "explosion",
    });
    console.table(room.map);

    player.Bombstries++;
  }, 2000);
}
