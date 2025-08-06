const http = require('http');
const { WebSocketServer } = require('ws')
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
        console.log(data);

        switch (data.type) {
            case "join":
                

                break
        }


    })

    console.log("🔌 Client connected!");
})




server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

