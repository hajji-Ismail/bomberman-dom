export function broadCastRoom(room, message) {
    // if (message.room) {
    //     message.room = getSafeRoom(message.room)
    // }

    // if (message.player) {
    //     message.player = getSafePlayer(message.player)
    // }

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

function getSafePlayer(player) {
    return {
      Bombs: player.Bombs,
      Flames: player.Flames,
      Speed: player.Speed,
      playerNumber: player.playerNumber,
      position: player.position,
      username: player.username,
    };
  }