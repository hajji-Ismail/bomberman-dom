export function checkVictory(room) {
    const result = { win: [], lose: [] }
    room.players.forEach(player => {
        if (player.hasOwnProperty('isLosed')) {
            result.lose.push(player.stream)
        } else if (!player.hasOwnProperty('isLosed') && !player.hasOwnProperty('isDeath')) {
            result.win.push(player.stream)
        }
    });
    return result
}