export function checkVictory(room) {
    const win = []
    if (!room?.players) return
    room.players.forEach(player => {
        if (!player.hasOwnProperty('isLosed') && !player.hasOwnProperty('isDeath')) {
            win.push(player)
        }
    });
    return win
}