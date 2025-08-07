export function broadCastWaittingRoom(room) {
    room.players.forEach(element => {
        element.stream.send(JSON.stringify({ 'type': "waitting_room", room }))
    });
}