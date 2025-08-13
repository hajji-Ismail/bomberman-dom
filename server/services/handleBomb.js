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
      if (
        getTile(r, c) != 2 &&
        ![3, 4, 5].includes(getTile(r, c)) &&
        getTile(r, c) != 1
      ) {
        const oldTile = getTile(r, c);

        room.map[r][c] = 10;

        setTimeout(() => {
          room.map[r][c] = oldTile;
          console.table(room.map);
        }, 1000);
      }
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
    placeFlames(row, col);
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

        if (tile === 2) break; // breakable block stops flames too
      }
    });

    if (Array.isArray(room.map[row][col])) {
      room.map[row][col] = [11];
    } else {
      room.map[row][col] = 0;
    }

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
