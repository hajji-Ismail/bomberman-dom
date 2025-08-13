import http from 'http';
import { WebSocketServer } from 'ws';

import { RemovePlayer } from './services/RemovePlayer.js';
import { broadCastWaittingRoom, brodCastMap } from './services/broadCast.js';
import { HandleChat } from './services/handleChating.js';
import { HandleRooms } from './services/availableRoom.js';
import { GenerateMap } from './services/genrateMap.js';
import { setPlayerNumbers } from './services/setPlayerNumbers.js';
import { movePlayer, stopMoving } from './services/moveplayer.js';
import { PlayerInitialPosition } from './services/playerintialposition.js';

const PORT = 8080;

const rooms = []

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
                const room = HandleRooms(rooms, stream, data.username)
                setPlayerNumbers(data ,room)
                broadCastWaittingRoom(room)
                break
            case "chating":
                HandleChat(data, rooms)
                break
            case "close-room":
                const c_room = rooms.find((element) => {
                    return element.id == data.id
                })
                

                    c_room.available = false
                    brodCastMap(c_room, GenerateMap(13))
                

                break
            case "move":
                movePlayer(data, rooms, stream)
                break
            case "stop-move":
                stopMoving(data, rooms)
                break
            case "start":
                PlayerInitialPosition(data, rooms, stream)
                break
        }
    })

    stream.on('close', () => {
        let room = RemovePlayer(rooms, stream)
        broadCastWaittingRoom(room)
    })
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

