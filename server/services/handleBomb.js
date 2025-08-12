import { sendMessages } from "./stream.js"

export function HandleBomb(stream, player, room) {
    setTimeout(() => {
        const row = Math.floor(player.position.y)
        const col = Math.floor(player.position.x)

        const up = room.map[row - 1][col]
        const down = room.map[row + 1][col]
        const left = room.map[row][col - 1]
        const right = room.map[row][col + 1]
        // const range = [up, down, left, right]

        if (up === 2 || [3, 4, 5].includes(up)) {
            room.map[row - 1][col] = 0
        }

        if (down === 2 || [3, 4, 5].includes(down)) {
            room.map[row + 1][col] = 0
        }

        if (left === 2 || [3, 4, 5].includes(left)) {
            room.map[row][col - 1] = 0
        }

        if (right === 2 || [3, 4, 5].includes(right)) {
            room.map[row][col + 1] = 0
        }

        if (Array.isArray(room.map[row][col])) {
            room.map[row][col] = [11]
        } else {
            room.map[row][col] = 0
        }

        sendMessages(stream, {
            type: "placeBomb",
            player: player,
            room: room,
            class: "explosion"
        })
    }, 30000)
}