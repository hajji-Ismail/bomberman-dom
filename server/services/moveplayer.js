import { sendMessages } from "./stream.js"

export function movePlayer(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const map = room.map

    const player = getSafePlayer(room.players.find((player) => player.username == data.username))

    let Xstep = 0.65 * player.Speed
    let Ystep = 0.15 * player.Speed
    const canMove = (cellul) => {
        return cellul == 0 || cellul == 11 || cellul == 12 || cellul == 13 || cellul == 14
    }

    let cellul;

    switch (data.action) {
        case " ": {
            let bombPosition = map[Math.floor(player.position.x)][Math.floor(player.position.y)]
            sendMessages(stream, {
                type: "putBomb",
                player: player
            })
        }
        case "ArrowRight":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x + Xstep)]
            if (canMove(cellul)) {

                player.position.x = player.position.x + Xstep
                BrodcastMove(room.players, {
                    type: "canMove",
                    x: Xstep,
                    player: player,
                    direction: "right",
                    newCLass: GenerateNewClass(player) + " player-right",
                    playerNumber: player.playerNumber
                })
            }


            break;
        case "ArrowLeft":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x - Xstep)]
            if (canMove(cellul)) {
                player.position.x = player.position.x - Xstep
                BrodcastMove(room.players, {
                    type: "canMove",
                    x: Xstep,
                    player: player,
                    direction: "left",
                    newCLass: GenerateNewClass(player) + " player-left",
                    playerNumber: player.playerNumber
                })
            }
            break
        case "ArrowUp":
            cellul = map[Math.floor(player.position.y - Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {

                
                player.position.y = player.position.y - Ystep
                BrodcastMove(room.players, {
                    type: "canMove",
                    y: Ystep,
                    player: player,
                    direction: "up",
                    newCLass: GenerateNewClass(player) + " player-top",
                    playerNumber: player.playerNumber
                })

            }
            break
        case "ArrowDown":
            cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                player.position.y = player.position.y + Ystep
                BrodcastMove(room.players, {
                    type: "canMove",
                    y: Ystep,
                    player: player,
                    direction: "down",
                    newCLass: GenerateNewClass(player) + " player-bottom",
                    playerNumber: player.playerNumber
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

function BrodcastMove(players, data) {
    for (let player of players) {
        sendMessages(player.stream, data)
    }
}

function getSafePlayer(player) {
    return {
        Bombs: player.Bombs,
        Flames: player.Flames,
        Speed: player.Speed,
        playerNumber: player.playerNumber,
        position: player.position,
        username: player.username
    }
}