const http = require('http');
const { WebSocketServer } = require('ws');
const { RemovePlayer } = require('./services/RemovePlayer');
const { broadCastWaittingRoom } = require('./services/broadCast');
const { HandleChat } = require('./services/handleChating');
const { HandleRooms } = require('./services/availableRoom');
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
                broadCastWaittingRoom(room)
                break
            case "chating":
                HandleChat(data, rooms)
                break
            case "close-room":
                const c_room = rooms.find((element) => {
                    return element.id == data.id
                })
                if (c_room.available) {
                    c_room.available = false
                }
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

