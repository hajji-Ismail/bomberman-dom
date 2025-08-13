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
            if (room.available) {
                room.players.splice(index, 1)
            }
            else {
                room.players[index]["isDeath"] = true
                //console.log(room.players[index]);
                
            }
            if (room.players.length === 0) {
                room.available = true
            }
        }
    })

    return newRoom
}
