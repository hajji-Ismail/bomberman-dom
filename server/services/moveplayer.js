import { sendMessages } from "./stream.js"

export function movePlayer(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const map = room.map

    const player = room.players.find((player) => player.username == data.username)


    let Xstep = 0.65 * player.Speed
    let Ystep = 0.15 * player.Speed
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
                    direction: "right",
                    newCLass: GenerateNewClass(player) + " player-right"
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
                    direction: "left",
                    newCLass: GenerateNewClass(player) + " player-left"
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
                    direction: "up",
                    newCLass: GenerateNewClass(player) + " player-top"
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
                    direction: "down",
                    newCLass: GenerateNewClass(player) + " player-bottom"
                })
                player.position.y = player.position.y + Ystep
            }
            break
        default:
            break;
    }
}
export function stopMoving(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const player = room.players.find((player) => player.username == data.username)
    switch (data.action) {
        case "ArrowRight":
            sendMessages(stream, {
                type: "stopMove",
                newCLass: GenerateNewClass(player)
            })
            break;
        case "ArrowLeft":
            sendMessages(stream, {
                type: "stopMove",

                newCLass: GenerateNewClass(player)
            })

            break
        case "ArrowUp":

            sendMessages(stream, {
                type: "stopMove",
                newCLass: GenerateNewClass(player)
            })

            break
        case "ArrowDown":

            sendMessages(stream, {
                type: "stopMove",

                newCLass: GenerateNewClass(player)
            })

            break
        default:
            break;
    }
}
function GenerateNewClass(player) {
    let newCLass
    switch (player.playerNumber) {
        case "player1":
            newCLass = 'player char1'
            break
        case "player2":
            newCLass = 'player char2'
            break
        case "player3":
            newCLass = 'player char3'
            break
        case "player4":
            newCLass = 'player char4'
            break
        default:
            break
    }
    return newCLass
}
