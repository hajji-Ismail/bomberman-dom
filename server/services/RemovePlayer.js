import { rooms } from "../index.js";

export function RemovePlayer(stream) {


    let newRoom;
    rooms.forEach(room => {
        const index = room.players.findIndex(player => {
            if (player.stream === stream) {
                newRoom = room
                return true
            }
        })
        if (index !== -1) {
            if (room.available) {
                room.players.splice(index, 1)
                if (room.players.length === 0) {
                    room.available = true
                }
            } else {
                room.players[index]['isDeath'] = true
            }

        }
    })

    return newRoom
}
