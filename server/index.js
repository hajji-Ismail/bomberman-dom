const http = require('http');
const { WebSocketServer } = require('ws');
const { HandleRooms } = require('./services/availableRoom');
const { RemovePlayer } = require('./services/RemovePlayer');
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
                room.players.forEach(element => {
                    element.stream.send(JSON.stringify({ 'type': "waitting_room", room }))
                });
                break

        }
    })
    stream.on('close', () => {
        RemovePlayer(rooms, stream)
    })



    console.log("🔌 Client connected!");
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

