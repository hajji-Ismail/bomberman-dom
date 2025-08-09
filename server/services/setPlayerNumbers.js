export function setPlayerNumbers(room) {
    room.players.forEach((element, i) => {
        element["playerNumber"] = `player${i + 1}`
    });
}