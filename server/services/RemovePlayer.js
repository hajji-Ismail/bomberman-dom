export function RemovePlayer(rooms = [], stream) {
    rooms.forEach(room => {
        const index = room.players.findIndex(player => player.stream === stream)
        if (index !== -1) {
            console.log(room);
            room.players.splice(index, 1)
            console.log(room);
            if (room.players.length === 0) {
                room.available = true
            }
        }
    })
}