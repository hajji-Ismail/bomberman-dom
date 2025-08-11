export function RemovePlayer(rooms = [], stream) {
    let newRoom;
    rooms.forEach(room => {
        const index = room.players.findIndex(player => {
            if (player.stream === stream) {
                newRoom = room
                return true
            }
        })
        if (index !== -1) {
            room.players.splice(index, 1)
            if (room.players.length === 0) {
                room.available = true
            }
        }
    })

    return newRoom
}
