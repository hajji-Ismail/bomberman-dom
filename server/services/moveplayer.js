import { HandleBomb } from "./handleBomb.js";
import { broadCastRoom } from "./broadCast.js"
import { getPlayer, getRoom } from "./getData.js"


export function movePlayer(data = {}) {
    let room = getRoom(data.room.id)
    const map = room.map

    const player = getPlayer(room.id, data.username)
    if (!player) {
        return
    }
    let Xstep = 0.075 * player.Speed
    let Ystep = 0.075 * player.Speed
    const walkableCells = [0, 7, 8, 9, 11, 12, 13, 14, 6]

    const earnAbility = (cellValue, y, x) => {
        switch (cellValue) {
            case 7:
                room.map[y][x] = 0;
                player.Bombs++;
                break;
            case 8:
                room.map[y][x] = 0;
                player.Speed++;
                break;
            case 9:
                room.map[y][x] = 0;
                player.Flames++;
                break;
            default:
                break;
        }
    };


    const canMove = (cellul) => {
        return walkableCells.includes(Array.isArray(cellul) ? cellul[0] : cellul);

    };
    const tryMove = (player, axis, step, direction, room, map) => {
        let targetX = axis === "x" ? Math.floor(player.position.x + step) : Math.floor(player.position.x);
        let targetY = axis === "y" ? Math.floor(player.position.y + step) : Math.floor(player.position.y);

        let checkCell = map[targetY][targetX];

        if (canMove(checkCell)) {
            earnAbility(checkCell, targetY, targetX);

            player.position[axis] += step;
            player.position[axis + "step"] += step;

            broadCastRoom(room, {
                type: "canMove",
                player: getSafePlayer(player),
                direction,
                newCLass: GenerateNewClass(player) + " player-" + direction,
                playerNumber: player.playerNumber,
                room: room
            });
            return;
        }
    }



    let cellul;



    switch (data.action) {
        case " ": {
            if (player.Bombstries > 0) {
                player.Bombstries--
                cellul = map[Math.floor(player.position.y)][Math.floor(player.position.x)]
                Array.isArray(cellul) ? cellul.push(6) : map[Math.floor(player.position.y)][Math.floor(player.position.x)] = 6
                broadCastRoom(room, {
                    type: "placeBomb",
                    player: getSafePlayer(player),
                    room: room
                })
                HandleBomb(player, room)
            }

            break
        }
        case "ArrowRight":
            tryMove(player, "x", Xstep, "right", room, map);

            break;
        case "ArrowLeft":
            tryMove(player, "x", -Xstep, "left", room, map);
            break;


        case "ArrowUp":
            tryMove(player, "y", -Ystep, "top", room, map);


            break;
        case "ArrowDown":
            tryMove(player, "y", Ystep, "bottom", room, map);
            break

        default:
            break;
    }
}



export function stopMoving(data = {}) {
    const room = getRoom(data.room.id)
    const player = getPlayer(room.id, data.username)
    switch (data.action) {
        case "ArrowRight":
            broadCastRoom(room, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break;
        case "ArrowLeft":
            broadCastRoom(room, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break
        case "ArrowUp":
            broadCastRoom(room, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })
            break
        case "ArrowDown":

            broadCastRoom(room, {
                type: "stopMove",
                player,
                newCLass: GenerateNewClass(player)
            })

            break;
        default:
            break;
    }
}

function GenerateNewClass(player) {
    if (!player) {
        return
    }
    let newCLass;
    switch (player.playerNumber) {
        case "player1":
            newCLass = "player char1";
            break;
        case "player2":
            newCLass = "player char2";
            break;
        case "player3":
            newCLass = "player char3";
            break;
        case "player4":
            newCLass = "player char4";
            break;
        default:
            break;
    }
    return newCLass;
}


function BrodcastMove(players, data) {
    for (let player of players) {
        if (player.stream) {
            sendMessages(player.stream, data);
        }
    }
}

function getSafePlayer(player) {
    return {
        Bombs: player.Bombs,
        Flames: player.Flames,
        Speed: player.Speed,
        playerNumber: player.playerNumber,
        position: player.position,
        username: player.username,
    }
}
