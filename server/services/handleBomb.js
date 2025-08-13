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

        room.players.forEach(currentPlayer => {
            currentRow = Math.floor(currentPlayer.position.y)
            currentCol = Math.floor(currentPlayer.position.x)
            directions.forEach(({ r, c }) => damagePlayer(r, c, currentPlayer))
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
