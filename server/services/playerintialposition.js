export function PlayerInitialPosition(data = {}, rooms = []) {
    let room = rooms.find((element) => element.id == data.room.id)
    

room.map = data.room.map
    room.players.forEach((player, index) => {
        
        // Set defaults
        player.Bombs = 1;
        player.Flames = 1;
        player.Speed = 1;

        // Set position based on index
        switch (index) {
            case 0:
                player.position = {
                    x: 1.5,
                    y: 1.5
                };
                
                break;
            case 1:
                player.position = {
                    x: data.room.map[0].length - 2 + 0.5,
                    y: 1.5
                };
                break;
            case 3:
                player.position = {
                    x: 1.5,
                    y: data.room.map.length - 2 + 0.5
                };
                break;
            case 2:
                player.position = {
                    x: data.room.map[0].length - 2 + 0.5,
                    y: data.room.map.length - 2 + 0.5
                };
                break;
            default:
                break;
        }
    });

    
    

}
