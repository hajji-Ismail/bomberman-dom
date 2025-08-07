// client/app/pages/game.js
export function generateMap(size) {
    const map = [];

    // Create base map with solid borders
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            // player 1
            if (i == 1 && j == 1) {
                row.push(-1);
                continue

            }
            // player 2
            if (i == 1 && j == size - 2) {
                row.push(-2);
                continue
            }
            // player 3
            if (i == size - 2 && j == 1) {
                row.push(-4);
                continue

            }
            // player 4
            if (i == size - 2 && j == size - 2) {
                row.push(-3);
                continue

            }
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
                row.push(1); // Solid wall
            } else {
                row.push(0); // Empty space
            }
        }
        map.push(row);
    }


    // generate the internal solid walls
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            if (i % 2 === 0 && j % 2 === 0) {
                // Only place wall if not already a player position
                if (map[i][j] === 0) {
                    map[i][j] = 1;
                }
            }
        }
    }


    const softWallCandidates = [];
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            if (map[i][j] !== 0) continue;

            // Avoid placing near player spawns (3x3 around them)
            const nearPlayer1 = i <= 2 && j <= 2;
            const nearPlayer2 = i <= 2 && j >= size - 3;
            const nearPlayer3 = i >= size - 3 && j <= 2;
            const nearPlayer4 = i >= size - 3 && j >= size - 3;

            if (nearPlayer1 || nearPlayer2 || nearPlayer3 || nearPlayer4) continue;

            softWallCandidates.push([i, j]);
        }
    }

    // Shuffle candidate positions
    for (let i = softWallCandidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [softWallCandidates[i], softWallCandidates[j]] = [softWallCandidates[j], softWallCandidates[i]];
    }

    // Place a percentage of soft walls (e.g. 20% of map area)
    const softWallCount = Math.floor(size * size * 0.2);
    for (let i = 0; i < softWallCount && i < softWallCandidates.length; i++) {
        const [x, y] = softWallCandidates[i];
        map[x][y] = 2;
    }
    
    return map;
}


const map = generateMap(13)
console.table(map, "map");
