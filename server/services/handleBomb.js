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
      console.log(getTile(r, c));

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

    const directions = [];
for (let index = 1; index <= player.Flames; index++) {
  directions.push(
    { r: row - index, c: col },
    { r: row + index, c: col },
    { r: row, c: col - index },
    { r: row, c: col + index }
  );
}

    directions.forEach(({ r, c }) => placeFlames(r, c));

    directions.forEach(({ r, c }) => destroyBlock(r, c));

    directions.forEach(({ r, c }) => damagePlayer(r, c));

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
