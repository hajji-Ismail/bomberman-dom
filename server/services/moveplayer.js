import { sendMessages } from "./stream.js"

export function movePlayer(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const map = room.map

    const player = room.players.find((player) => player.username == data.username)


    let Xstep = 0.65 * player.Speed
    let Ystep = 0.15*player.Speed
    const canMove = (cellul) => {

        return cellul == 0 || cellul == 11 || cellul == 12 || cellul == 13 || cellul == 14

    }


    let cellul;

    switch (data.action) {

        case "ArrowRight":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x + Xstep)]
            if (canMove(cellul)) {

                sendMessages(stream, {
                    type: "canMove",
                    x: Xstep,
                    direction: "right"

                })
                player.position.x = player.position.x + Xstep
            }


            break;
        case "ArrowLeft":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x - Xstep)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    x: Xstep,
                    direction: "left"

                })
                player.position.x = player.position.x - Xstep
            }

            break
        case "ArrowUp":
            cellul = map[Math.floor(player.position.y - Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: Ystep,
                    direction: "up"

                })
                player.position.y = player.position.y - Ystep

            }

            break
        case "ArrowDown":
            cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: Ystep,
                    direction: "down"

                })
                player.position.y = player.position.y + Ystep
            }

            break
        case " ":
            break

        default:
            break;
    }
    console.log(cellul, "îiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiĵ");
    console.log(player.position.y);
    console.log(player.position.x);
    
    








}

