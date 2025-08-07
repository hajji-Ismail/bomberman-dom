export function HandleChat(data = {}, rooms = []) {
    const room = rooms.find((element) => {
        return element.id == data.chating_room.id
    })
    console.log(room)

    room.players.forEach(player => {
        player.stream.send(JSON.stringify({
            type : "chating",
            message : data.message,
            username : data.username
        }))


    });



}