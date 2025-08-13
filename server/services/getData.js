import { rooms } from "../index.js";

export function getRoom(roomId) {
    return rooms.find((room) => room.id == roomId)
}

export function getPlayer(roomId, username) {
    return getRoom(roomId).players.find((player) => player.username == username)
}
