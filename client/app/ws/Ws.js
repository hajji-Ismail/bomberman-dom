export const CreateWs = (state) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket("ws://localhost:8080/ws");
        ws.onopen = () => {
            console.log("🔗 WebSocket connection opened");
            state.set("ws", ws);
            resolve(true);
        };

        ws.onclose = () => {
            console.log("❌ WebSocket error");
            reject(false);
        };

        ws.onmessage = (data) => {
            const message = JSON.parse(data.data)
            switch (message.type) {
                case "waitting_room":
                    console.log(message, "on message");
                    state.set('current_room',message.room)
                    break;

                default:
                    break;
            }


        }
    });
}


