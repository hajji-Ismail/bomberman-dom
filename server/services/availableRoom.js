// This function helps us search for an available room to join; otherwise, it creates a new one.
export function HandleRooms(rooms = [], stream, username = "") {
    // case of no room available
    const player = { username, stream }
    if (rooms.length == 0) {
        return NewRoom(rooms, player)
    }
    const emptyRooms = rooms.filter(room => !room.available && room.players.length == 0)
    emptyRooms.forEach(ele => {
        ele.available = true
    })
    const availableRoom = rooms.find(room => room.available && room.players.length < 4)

    if (availableRoom) {
        const notUnique = rooms.find(room =>
            room.players.some(el => el.username === username)
        );

        if (notUnique) {
            player.username = username + `_${availableRoom.players.length}`
            player.stream.send(JSON.stringify({
                type : 'userhange',
                username : player.username
            }))
            
        }
        

        availableRoom.players.push(player)
        if (availableRoom.players.length === 4) {
            availableRoom.available = false
        }
        return availableRoom
    } else {
        return NewRoom(rooms, player)
    }
}

function NewRoom(rooms = [], player = {}) {
    const room = {
        id: Date.now(),
        players: [player],
        available: true
    }
    rooms.push(room)
    return room
}