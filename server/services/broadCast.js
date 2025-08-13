export function broadCastRoom(room, message) {
    // const safeRoom = getSafeRoom(room);
    // room.
    // const safeRoom = {...room}
    // safeRoom.

    room.players.forEach(player => {
        player.stream.send(JSON.stringify(message));
    });
}

function getSafeRoom(room) {
    return {
        id: room.id,
        players: room.players.map(p => ({
            username: p.username,
            playerNumber: p.playerNumber,
            isDeath: p.isDeath
        }))
    };
}
