export function GenerateMap(size) {
    const map = [];

    // Setup the empty map with borders and players
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            // Borders
            if (i === 0 || j === 0 || i === size - 1 || j === size - 1) {
                row.push(1);
                continue;
            }

            // Player positions
            if (i === 1 && j === 1) { row.push([11]); continue; } // Player 1
            if (i === 1 && j === size - 2) { row.push([12]); continue; } // Player 2
            if (i === size - 2 && j === 1) { row.push([14]); continue; } // Player 3
            if (i === size - 2 && j === size - 2) { row.push([13]); continue; } // Player 4

            row.push(0); // Path for now
        }
        map.push(row);
    }

    // Add static walls (checkerboard pattern)
    for (let i = 2; i < size - 2; i += 2) {
        for (let j = 2; j < size - 2; j += 2) {
            if (map[i][j] === 0) map[i][j] = 1;
        }
    }

    // Function to detect if near a player's spawn
    const isNearPlayer = (x, y) => {
        return (
            (x <= 2 && y <= 2) || // Player 1
            (x <= 2 && y >= size - 3) || // Player 2
            (x >= size - 3 && y <= 2) || // Player 3
            (x >= size - 3 && y >= size - 3) // Player 4
        );
    };

    const emptyTiles = [];
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            if (map[i][j] === 0 && !isNearPlayer(i, j)) {
                emptyTiles.push([i, j]);
            }
        }
    }

    // Randomize empty tiles
    emptyTiles.sort(() => Math.random() - 0.5);

    // Place soft walls (30% of the map)
    const softWallCount = Math.floor(size * size * 0.3);
    const softWallTiles = emptyTiles.slice(0, softWallCount);

    // Place soft walls
    for (const [x, y] of softWallTiles) {
        map[x][y] = 2;
    }

    // Inject abilities into soft walls
    const abilities = [];

    // Power-up codes (you can define these however your game logic expects):
    // e.g., 3 = speed, 4 = bomb, 5 = flame
    for (let i = 0; i < 4; i++) abilities.push(3); // Speed
    for (let i = 0; i < 4; i++) abilities.push(4); // Bomb
    for (let i = 0; i < 4; i++) abilities.push(5); // Flame

    // Shuffle and select random tiles for power-ups
    const abilityTiles = [...softWallTiles];
    abilityTiles.sort(() => Math.random() - 0.5);

    for (let i = 0; i < abilities.length && i < abilityTiles.length; i++) {
        const [x, y] = abilityTiles[i];
        map[x][y] = abilities[i]; // Replace soft wall with a soft wall that contains a power-up
    }    

    return map;
}
