export function setUpPlayers(room) {

    room.players.forEach((player, i) => {
        player["playerNumber"] = `player${i + 1}`

        player.Bombs = 1;
        player.Flames = 1;
        player.Speed = 1;
        player.Bombstries = player.Bombs
        player.isDamaged = false



        const mapWidth = room.map[0].length;
        const mapHeight = room.map.length;

        // Set position centered on tile
        switch (i) {
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
    });
}