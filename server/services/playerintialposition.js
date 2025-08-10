export function PlayerInitialPosition(data = {}, rooms = []) {
    let room = rooms.find((element) => element.id == data.room.id)

    room.map = data.room.map

    room.players.forEach((player, index) => {
        // Set defaults
        player.Bombs = 1;
        player.Flames = 1;
        player.Speed = 1;

        const mapWidth = data.room.map[0].length;
        const mapHeight = data.room.map.length;

        // Set position centered on tile
        switch (index) {
            case 0: // Top-left
                player.position = { x: 1.35, y: 1.85 };
                break;
            case 1: // Top-right
                player.position = { x: mapWidth - 2.35, y: 1.85 };
                break;
            case 2: // Bottom-right
                player.position = { x: mapWidth - 2.35, y: mapHeight - 2. };
                break;
            case 3: // Bottom-left
                player.position = { x: 1.35, y: mapHeight - 2.9 };
                break;
            default:
                break;
        }
    });
}
