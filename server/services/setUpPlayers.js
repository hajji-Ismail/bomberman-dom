export function setUpPlayers(room) {
    room.players.forEach((player, i) => {
        player["playerNumber"] = `player${i + 1}`
        player.Bombs = 1
        player.Flames = 1
        player.Speed = 1
        player.Bombstries = player.Bombs
        player.Lives = 3
        player.isDamaged = false
        player.isMoving = false
        player.boostFrames = 0

        ResetPositions(room, player, i)
    });
}

export function ResetPositions(room, player, idx) {
    const mapWidth = room.map[0].length;
    const mapHeight = room.map.length;

    // Set position centered on tile
    switch (idx) {
        case 0: // Top-left
            player.position = { x: 1.35, y: 1.85, xstep: 0, ystep: 0 };
            break;
        case 1: // Top-right
            player.position = { x: (mapWidth - 2) + 0.35, y: 1.85, xstep: 0, ystep: 0 };
            break;
        case 2:
            player.position = { x: (mapWidth - 2) + 0.35, y: (mapHeight - 2) + 0.85, xstep: 0, ystep: 0 };
            break;
        case 3: // Bottom-left
            player.position = { x: 1.35, y: (mapHeight - 2) + 0.85, xstep: 0, ystep: 0 };
            break;
        default:
            break;
    }
}