import { broadCastRoom } from "./broadCast.js"

export function HandleBomb(player, room) {
    const row = Math.floor(player.position.y)
    const col = Math.floor(player.position.x)
    setTimeout(() => {
        let currentRow, currentCol;
        const getTile = (r, c) => room.map[r][c]

        const destroyBlock = (r, c) => {
            if (getTile(r, c) === 2) {
                room.map[r][c] = 0

            }
        }

        const destroyAbilityBlock = (r, c) => {
            if ([3, 4, 5].includes(getTile(r, c))) {
                room.map[r][c] += 4
            }
        }

        const damagePlayer = (r, c, currentPlayer) => {
            if (r === currentRow && c === currentCol) {
                console.log(`player ${currentPlayer.playerNumber} tfrgee3`)
                currentPlayer.isDamaged = true
            }
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
                console.log(`player ${currentPlayer.playerNumber} tfrgee3`)
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
            } else {
                directions.forEach(({ r, c }) => damagePlayer(r, c, currentPlayer))
            }
        })

        if (Array.isArray(room.map[row][col])) {
            room.map[row][col] = [11]
        } else {
            room.map[row][col] = 0
        }

        broadCastRoom(room, {
            type: "placeBomb",
            player,
            room,
            class: "explosion"
        })

        player.Bombstries++

    }, 3000)
}
