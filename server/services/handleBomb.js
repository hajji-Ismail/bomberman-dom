import { broadCastRoom } from "./broadCast.js";

export function HandleBomb(player, room) {
    const row = Math.floor(player.position.y)
    const col = Math.floor(player.position.x)
    setTimeout(() => {
        let currentRow, currentCol;
        const getTile = (r, c) => room.map[r][c]
  const row = Math.floor(player.position.y);
  const col = Math.floor(player.position.x);
  setTimeout(() => {
    const getTile = (r, c) => room.map[r][c];

        const destroyBlock = (r, c) => {
            if (getTile(r, c) === 2) {
                room.map[r][c] = 0

            }
        }
    const destroyBlock = (r, c) => {
      if (getTile(r, c) === 2) {
        room.map[r][c] = 0;
      }
    };

        const destroyAbilityBlock = (r, c) => {
            if ([3, 4, 5].includes(getTile(r, c))) {
                room.map[r][c] += 4
            }
        }

        const damagePlayer = (r, c, currentPlayer, idx) => {
            if (r === currentRow && c === currentCol) {
                verifyPlayerDamage(room, currentPlayer, idx)
            }
        }
    const damagePlayer = (r, c) => {
      if ([3, 4, 5].includes(getTile(r, c))) {
        room.map[r][c] += 4;
      }
    };
   const placeFlames = (r, c) => {
  let oldTile = getTile(r, c);

  // Normalize the old tile
  if (oldTile === 2) {
    oldTile = 0; // destroyed block becomes empty
  }
  if ([3, 4, 5].includes(oldTile) && !Array.isArray(room.map[r][c]) ) {
    oldTile += 4; // damaged state
  }

  // Place flame
  if (Array.isArray(room.map[r][c])) {
    oldTile = oldTile[0]
    room.map[r][c] = [...room.map[r][c], 10];
  } else {
    room.map[r][c] = 10;
  }

        const directions = [
            { r: row - 1, c: col },
            { r: row + 1, c: col },
            { r: row, c: col - 1 },
            { r: row, c: col + 1 }
        ]

        directions.forEach(({ r, c }) => destroyBlock(r, c))

        directions.forEach(({ r, c }) => destroyAbilityBlock(r, c))

        room.players.forEach((currentPlayer, idx) => {
            currentRow = Math.floor(currentPlayer.position.y)
            currentCol = Math.floor(currentPlayer.position.x)
            if (currentRow === row && currentCol === col) {
                verifyPlayerDamage(room, currentPlayer, idx)
            } else {
                directions.forEach(({ r, c }) => damagePlayer(r, c, currentPlayer, idx))
            }
        })
  // Restore old tile after 1 second
  
  setTimeout(() => {
    if (Array.isArray(oldTile)) {
      room.map[r][c] = [...oldTile ];
    } else {
      room.map[r][c] = oldTile;
    }
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

        if (tile === 1) break;
        if (tile == 2) {
          placeFlames(r, c);
          destroyBlock(r, c);
          damagePlayer(r, c);
          break;
        } // stop at solid wall
        placeFlames(r, c);
        destroyBlock(r, c);
        damagePlayer(r, c);
      }
    });

        if (Array.isArray(room.map[row][col])) {
            room.map[row][col] = [11]
        } else {
            room.map[row][col] = 0
        }

        broadCastRoom(room, {
            type: "placeBomb",
            player,
            room,
            class: "explosion",
            isExplosion: true
        })
    if (Array.isArray(room.map[row][col])) {
      room.map[row][col] = [room.map[row][col][0]];
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

        player.Bombstries++

    }, 3000)
}

function verifyPlayerDamage(room, currentPlayer, idx) {
    const mapWidth = room.map[0].length;
    const mapHeight = room.map.length;

    currentPlayer.isDamaged = true

    switch (idx) {
        case 0: // Top-left
            currentPlayer.position = { x: 1.35, y: 1.85, xstep: 0, ystep: 0 };
            break;
        case 1: // Top-right 
            currentPlayer.position = { x: (mapWidth - 2) + 0.35, y: 1.85, xstep: 0, ystep: 0 };
            break;
        case 2:
            currentPlayer.position = { x: (mapWidth - 2) + 0.35, y: (mapHeight - 2) + 0.85, xstep: 0, ystep: 0 };
            break;
        case 3: // Bottom-left
            currentPlayer.position = { x: 1.35, y: (mapHeight - 2) + 0.85, xstep: 0, ystep: 0 };
            break;
        default:
            break;
    }
}
    player.Bombstries++;
  }, 2000);
}
