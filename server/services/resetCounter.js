import { broadCastRoom } from "./broadCast.js";
import { getRoom } from "./getData.js";

export function resetCounter(data = {}) {
    let room = getRoom(data.id);
    broadCastRoom(room, {
        type: "resetCounter"
    });

}