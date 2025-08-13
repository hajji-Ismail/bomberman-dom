import { broadCastRoom } from "./broadCast.js";
import { getRoom } from "./getData.js";

export function HandleChat(data = {}) {    
    const room = getRoom(data.room.id)
    broadCastRoom(room, {
        type: "chating",
        message: data.message,
        username: data.username,
        playerNumber: data.playerNumber
    })
}
