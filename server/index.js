import http from 'http';
import { WebSocketServer } from 'ws';

import { RemovePlayer } from './services/RemovePlayer.js';
import { broadCastRoom } from './services/broadCast.js';
import { HandleChat } from './services/handleChating.js';
import { HandleRooms } from './services/availableRoom.js';
import { setUpPlayers } from './services/setUpPlayers.js';

import { movePlayer, stopMoving } from './services/moveplayer.js';
import { getRoom } from './services/getData.js';
import { CheckVictory } from './services/checkVictory.js';

const PORT = 8080;

export const rooms = []

const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end("WebSocket Server is running")
})
const ws = new WebSocketServer({ server, path: '/ws' })


ws.on('connection', (stream) => {
    stream.on('message', (message) => {
        const data = JSON.parse(message.toString())

        switch (data.type) {
            case "join":
                const room = HandleRooms(stream, data.username)
                setUpPlayers(room)
                broadCastRoom(room, {
                    type: "waitting_room",
                    room: room
                })
                break
            case "chating":
                HandleChat(data)
                break
            case "close-room":
                const c_room = getRoom(data.id)
                c_room.available = false
                break
            case "move":
                movePlayer(data)
                break
            case "stop-move":
                stopMoving(data, rooms)
                break

        }
    })

    stream.on('close', () => {
        const room = RemovePlayer(stream)
        const win = CheckVictory(room)
        if (!win) {
            return
        }
        if (win.length == 1) {
            win[0].send(JSON.stringify({
                type: "result",
                result: "win"
            }))
            room.players = []
            room.available = true
            stream.close()
            return
        }

        broadCastRoom(room, {
            type: "newRoom",
            room
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

