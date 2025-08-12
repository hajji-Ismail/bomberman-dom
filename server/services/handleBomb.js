import { sendMessages } from "./stream.js"

export function HandleBomb(stream, player, room, y ,x) {
    setTimeout(() => {
        const row = Math.floor(y)
        const col = Math.floor(x)

        const getTile = (r, c) => room.map[r][c]

        const destroyBlock = (r, c) => {
            if (getTile(r, c) === 2) {
                room.map[r][c] = 0
            }
        }

        const damagePlayer = (r, c) => {
            if ([3, 4, 5].includes(getTile(r, c))) {
                room.map[r][c] += 4
            }
        }

        const directions = [
            { r: row - 1, c: col },
            { r: row + 1, c: col },
            { r: row, c: col - 1 },
            { r: row, c: col + 1 }
        ]

        directions.forEach(({ r, c }) => destroyBlock(r, c))

        directions.forEach(({ r, c }) => damagePlayer(r, c))

        if (Array.isArray(room.map[row][col])) {
            room.map[row][col] = [11]
        } else {
            room.map[row][col] = 0
        }

        sendMessages(stream, {
            type: "placeBomb",
            player,
            room,
            class: "explosion"
        })

        player.Bombs++

    }, 3000)
}
