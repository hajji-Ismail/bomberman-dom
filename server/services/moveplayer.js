import { HandleBomb } from "./handleBomb.js"
import { sendMessages } from "./stream.js"

export function movePlayer(data = {}, rooms, stream) {
    let room = rooms.find((element) => element.id == data.room.id)
    const map = room.map


    const player = room.players.find((player) => player.username == data.username)

    let Xstep = 0.075 * player.Speed
    let Ystep = 0.075 * player.Speed
    const canMove = (cellul) => {
        // zid 7 and 8 and 9
        return cellul == 0 || cellul == 11 || cellul == 12 || cellul == 13 || cellul == 14 || cellul == 7 || cellul == 8 || cellul == 9 || cellul == 6
    }
    const creatCellul = (playerPos) => {




    }

    let cellul;
    // let smouthMOve = null ;

    switch (data.action) {
        case " ": {
            if (player.Bombs > 0) {
                player.Bombs--
                cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x)]
                Array.isArray(cellul) ? cellul.push(6) : map[Math.floor(player.position.y)][Math.floor(player.position.x)] = 6
                sendMessages(stream, {
                    type: "placeBomb",
                    player: getSafePlayer(player),
                    room: room
                })
                HandleBomb(stream, player, room, player.position.y, player.position.x)
            }

            break
        }
        case "ArrowRight":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x + Xstep)]
            if (canMove(cellul)) {
                player.position.x = player.position.x + Xstep
                player.position.xstep = player.position.xstep + Xstep

                BrodcastMove(room.players, {
                    type: "canMove",
                    x: Xstep,
                    player: getSafePlayer(player),
                    direction: "right",
                    newCLass: GenerateNewClass(player) + " player-right",
                    playerNumber: player.playerNumber
                })
            } else {
                if ((player.position.y % 1) < 0.2) {
                    cellul = map[Math.floor(player.position.y) - 1][Math.floor(player.position.x + Xstep)]
                    if (canMove(cellul)) {
                        player.position.x = player.position.x + Xstep
                        player.position.xstep = player.position.xstep + Xstep
                        let oldY = player.position.y;
                        player.position.y = Math.floor(player.position.y);
                        player.position.ystep += player.position.y - oldY;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "right",
                            newCLass: GenerateNewClass(player) + " player-right",
                            playerNumber: player.playerNumber
                        })



                    }

                } else if ((player.position.y % 1) > 0.8) {
                    cellul = map[Math.ceil(player.position.y)][Math.floor(player.position.x + Xstep)]
                    if (canMove(cellul)) {
                        player.position.x = player.position.x + Xstep
                        player.position.xstep = player.position.xstep + Xstep
                        let oldY = player.position.y;
                        player.position.y = Math.ceil(player.position.y);
                        player.position.ystep -= player.position.y - oldY;

                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "right",
                            newCLass: GenerateNewClass(player) + " player-right",
                            playerNumber: player.playerNumber
                        })



                    }

                }
            }

            break;
        case "ArrowLeft":
            cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x - Xstep)]
            if (canMove(cellul)) {
                player.position.x = player.position.x - Xstep
                player.position.xstep = player.position.xstep - Xstep

                BrodcastMove(room.players, {
                    type: "canMove",
                    x: Xstep,
                    player: getSafePlayer(player),
                    direction: "left",
                    newCLass: GenerateNewClass(player) + " player-left",
                    playerNumber: player.playerNumber
                })
            } else {
                if ((player.position.y % 1) < 0.2) {
                    cellul = map[Math.floor(player.position.y) - 1][Math.floor(player.position.x - Xstep)]
                    if (canMove(cellul)) {
                        player.position.x = player.position.x - Xstep
                        player.position.xstep = player.position.xstep - Xstep
                        let oldY = player.position.y;
                        player.position.y = Math.floor(player.position.y);
                        player.position.ystep -= player.position.y - oldY;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-left",
                            playerNumber: player.playerNumber
                        })



                    }

                } else if ((player.position.y % 1) > 0.8) {
                    cellul = map[Math.ceil(player.position.y)][Math.floor(player.position.x - Xstep)]
                    cellul = map[Math.ceil(player.position.y)][Math.floor(player.position.x - Xstep)]
                    if (canMove(cellul)) {
                        player.position.x = player.position.x - Xstep
                        player.position.xstep = player.position.xstep - Xstep
                        let oldY = player.position.y;
                        player.position.y = Math.ceil(player.position.y);
                        player.position.ystep += player.position.y - oldY;

                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-left",
                            playerNumber: player.playerNumber
                        })



                    }

                }
            }
            break
        case "ArrowUp":
            cellul = map[Math.floor(player.position.y - Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {


                player.position.y = player.position.y - Ystep
                player.position.ystep = player.position.ystep - Ystep

                BrodcastMove(room.players, {
                    type: "canMove",
                    y: Ystep,
                    player: getSafePlayer(player),
                    direction: "up",
                    newCLass: GenerateNewClass(player) + " player-top",
                    playerNumber: player.playerNumber
                })

            } else {
                if ((player.position.x % 1) < 0.2) {
                    map[Math.floor(player.position.y - Ystep)][Math.floor(player.position.x) - 1]
                    cellul = map[Math.floor(player.position.y - Ystep)][Math.floor(player.position.x) - 1]

                    if (canMove(cellul)) {
                        player.position.y = player.position.y - Ystep
                        player.position.ystep = player.position.ystep - Ystep
                        let oldx = player.position.x;
                        player.position.x = Math.floor(player.position.x);
                        player.position.xstep -= player.position.x - oldx;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-top",
                            playerNumber: player.playerNumber
                        })



                    }

                } else if ((player.position.x % 1) > 0.8) {


                    cellul = map[Math.floor(player.position.y - Ystep)][Math.ceil(player.position.x)]
                    if (canMove(cellul)) {
                        player.position.y = player.position.y - Ystep
                        player.position.ystep = player.position.ystep - Ystep
                        let oldx = player.position.x;
                        player.position.x = Math.floor(player.position.x);
                        player.position.xstep += player.position.x - oldx;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-top",
                            playerNumber: player.playerNumber
                        })



                    }

                }
            }
            break
        case "ArrowDown":
            cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x)]
            if (canMove(cellul)) {
                player.position.y = player.position.y + Ystep
                player.position.ystep = player.position.ystep + Ystep



                BrodcastMove(room.players, {
                    type: "canMove",
                    y: Ystep,
                    player: getSafePlayer(player),
                    direction: "down",
                    newCLass: GenerateNewClass(player) + " player-bottom",
                    playerNumber: player.playerNumber
                })
            } else {
                if ((player.position.x % 1) < 0.2) {

                    cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x) - 1]
                    if (canMove(cellul)) {
                        player.position.y = player.position.y + Ystep
                        player.position.ystep = player.position.ystep + Ystep
                        let oldx = player.position.x;
                        player.position.x = Math.floor(player.position.x);
                        player.position.xstep -= player.position.x - oldx;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-bottom",
                            playerNumber: player.playerNumber
                        })



                    }

                } else if ((player.position.x % 1) > 0.8) {
                    cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x)]
                    cellul = map[Math.floor(player.position.y + Ystep)][Math.floor(player.position.x)]
                    if (canMove(cellul)) {
                        player.position.y = player.position.y + Ystep
                        player.position.ystep = player.position.ystep + Ystep
                        let oldx = player.position.x;
                        player.position.x = Math.floor(player.position.x);
                        player.position.xstep += player.position.x - oldx;


                        BrodcastMove(room.players, {
                            type: "canMove",
                            x: Xstep,
                            player: getSafePlayer(player),
                            direction: "left",
                            newCLass: GenerateNewClass(player) + " player-bottom",
                            playerNumber: player.playerNumber
                        })



                    }

                }
            }
            break
        default:
            break;
    }
}

export function stopMoving(data = {}, rooms) {
    let room = rooms.find((element) => element.id == data.room.id)
    const player = room.players.find((player) => player.username == data.username)
    switch (data.action) {
        case "ArrowRight":
            BrodcastMove(room.players, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break;
        case "ArrowLeft":
            BrodcastMove(room.players, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break
        case "ArrowUp":
            BrodcastMove(room.players, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break
        case "ArrowDown":

            BrodcastMove(room.players, {
                type: "stopMove",
                player,
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