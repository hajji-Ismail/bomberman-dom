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
                    direction: "right",
                    newCLass: GenerateNewClass(player) + " player-right"
                })
            }
            break;
        case "ArrowLeft":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x + step)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    x: step,
                    direction: "left",
                    newCLass: GenerateNewClass(player) + " player-left"
                })
            }
            break
        case "ArrowUp":
            cellul = map[Math.floor(player.position.y - step)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: step,
                    direction: "up",
                    newCLass: GenerateNewClass(player) + " player-top"
                })
            }
            break
        case "ArrowDown":
            cellul = map[Math.floor(player.position.y + step)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                sendMessages(stream, {
                    type: "canMove",
                    y: step,
                    direction: "down",
                    newCLass: GenerateNewClass(player) + " player-bottom"
                })
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
