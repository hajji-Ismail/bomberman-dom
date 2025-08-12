export function earnAbility(cellul,player) {

    room.players.forEach(element => {
        element.stream.send(JSON.stringify({
            type: "waitting_room",
            room: safeRoom
        }));
    });
}