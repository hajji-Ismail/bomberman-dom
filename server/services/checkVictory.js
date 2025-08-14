export function checkVictory(room) {
    const result = { win: [], lose: [] }
    if(!room.players)return 
    room.players.forEach(player => {
        if (player.hasOwnProperty('isLosed')) {
            result.lose.push(player)
        } else if (!player.hasOwnProperty('isLosed') && !player.hasOwnProperty('isDeath')) {
            result.win.push(player)
        }
    });
    return result
}