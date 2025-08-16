export function broadCastRoom(room, message) {
    room.players.forEach(player => {
        player.stream.send(JSON.stringify(message));
    });
}

export function getSafeRoom(room) {

    return {
        id: room.id,
        players: room.players.map(p => ({
            username: p.username,
            playerNumber: p.playerNumber,
            isDeath: p.isDeath,
            Bombs: p.Bombs,
            Flames: p.Flames,
            Speed: p.Speed,
            Bombstries: p.Bombstries,
            Lives: p.Lives,
            isDamaged: p.isDamaged,
            isMoving: p.isMoving,
            boostFrames: p.boostFrames,
            isLosed: p.isLosed
        })),
        map: room.map
    };
}
