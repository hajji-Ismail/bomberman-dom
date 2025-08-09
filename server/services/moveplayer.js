import { sendMessages } from "./stream.js"

export function movePlayer(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const map = room.map

    const player = room.players.find((player) => player.username == data.username)


    let step = 0.3 * player.Speed
    const canMove = (cellul) => {

        return cellul == 0 || cellul == 11 || cellul == 12 || cellul == 13 || cellul == 14

    }


    let cellul;

    switch (data.action) {

        case "ArrowRight":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x + step)]
            if (canMove(cellul)) {

                sendMessages(stream, {
                    type: "canMove",
                    x: step,
                    direction: "right"

                })
                player.position.x = player.position.x + step
            }


            break;
        case "ArrowLeft":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x - step)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    x: step,
                    direction: "left"

                })
                player.position.x = player.position.x - step
            }

            break
        case "ArrowUp":
            cellul = map[Math.floor(player.position.y - step)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: step,
                    direction: "up"

                })
                player.position.y = player.position.y - step

            }

            break
        case "ArrowDown":
            cellul = map[Math.floor(player.position.y + step)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: step,
                    direction: "down"

                })
                player.position.y = player.position.y + step
            }

            break
        case " ":
            break

        default:
            break;
    }








}

